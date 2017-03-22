<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Sound;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Config\Definition\Exception\Exception; 
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class SoundsController extends Controller
{
	/**
	* @Route("/sounds", name="sounds")
	*/
	public function indexAction()
	{
		$repository = $this->getDoctrine()->getRepository('AppBundle:Sound');
		$sounds = $repository->findBy(array(), array('id' => 'DESC'));

		return $this->render('sounds/index.html.twig', array(
			"sounds" => $sounds,
			"user" => $this->getUser()
		));
	}

	/**
	* @Route("/sounds/{id}/show", name="soundsShow")
	*/
	public function showAction($id)
	{
		$repository = $this->getDoctrine()->getRepository('AppBundle:Sound');
		$sound = $repository->find($id);
		if (!$sound) throw $this->createNotFoundException('No sound found for id '.$id);
		
		$comments = $sound->getComments();
		
		foreach ($comments as $key => $comment) {
			if((!$comment->getVisibility() ) and (!$comment->editableBy($this->getUser()))) {
				unset ($comments[$key]);
			}		
		}

		return $this->render('sounds/show.html.twig', array(
			"sound" => $sound,
			"comments" => $comments,
			"user" => $this->getUser()
		));
	}

	/**
	* @Route("/api/sounds", name="soundsApi")
	*/
	public function postAction(Request $request)
	{
		try {
			$em = $this->getDoctrine();

			//Get vars
			$id = $request->request->get("id");

			$text = $request->request->get("text");
			if (!$text) throw new Exception('No transcription');
			
			$userId = $request->request->get("user");
			$user = $em->getRepository('AppBundle:User')->find($userId);
			if (!$user) throw new Exception('No user #".$userId." found');

			$idiolectId = $request->request->get("idiolect");
			$idiolect = $em->getRepository('AppBundle:Idiolect')->find($idiolectId);
			if (!$idiolect) throw new Exception('No idiolect #'.$idiolectId.' found');
			
			//Copy file
			$filename = $idiolect->getId()."-".dechex(crc32($text))."-".dechex(rand(0, 32000)).".wav";
			$file = $request->files->get("sound");
			if ($file == null) throw new Exception("no file sent");
			if ($file->getMimeType() != "audio/x-wav") throw new Exception("this is not a wave file");
			$path = $this->container->getParameter('audio_path');
			if (file_exists($path."/".$filename)) throw new Exception("Filename already used!");
			$file->move($path, $filename);

			//Create sound object
			$sound = false;
			if ($id) {
				$sound = $em->getRepository('AppBundle:Sound')->find($id);
				if ($sound && !$sound->getUser()->editableBy($this->getUser())) throw new Exception('Forbidden');
			}
			if (!$sound) $sound = new Sound();

			$sound->setText($text);
			
			$description = $request->request->get("description");
			if ($description) $sound->setDescription($description);

			$sound->setUser($user);
			$sound->setFilename($filename);
			$sound->setIdiolect($idiolect);
			$em = $this->getDoctrine()->getManager();
			$em->persist($sound);
			$em->flush();
		}
		catch (Exception $e) {
			return new Response(json_encode(array(
				"success" => false,
				"msg" => $e->getMessage()
			)));
		}
		return new Response(json_encode(array(
			"success" => true,
			"sound" => $sound
		)));
	}

	/**
	* @Route("/sounds/{id}/update", name="soundsUpdate")
	*/
	public function updateAction(Request $request, $id)
	{
		$em = $this->getDoctrine()->getManager();

		$sound = $em->getRepository('AppBundle:Sound')->find($id);
		if (!$sound) throw $this->createNotFoundException('No sound found for id '.$id);
		if (!$sound->getUser()->editableBy($this->getUser())) throw $this->createAccessDeniedException('Forbidden');

		$form = $this->createFormBuilder($sound)
			->add('idiolect', EntityType::class, array('class' => 'AppBundle:Idiolect', 'choice_label' => 'title'))
			->add('text', TextType::class)
			->add('description', TextareaType::class, array("required" => false))
			->add('save', SubmitType::class, array('label' => 'Ok'))
			->getForm();

		//Enregistrement 
		$form->handleRequest($request);
		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($sound);
			$em->flush();
			if ($request->get("redirect")) return $this->redirect($request->get("redirect"));
			return $this->redirectToRoute("soundsShow", array("id" => $id));
		}

		$token = $this->get('security.token_storage')->getToken();
		return $this->render('sounds/update.html.twig', array(
			"sound" => $sound,
			"form" => $form->createView(),
			"token" => $token
		));
	}

	/**
	* @Route("/sounds/{id}/delete", name="soundsDelete")
	*/
	public function deleteAction(Request $request, $id)
	{
		$em = $this->getDoctrine()->getManager();
		$repository = $this->getDoctrine()->getRepository('AppBundle:Sound');
		$sound = $repository->find($id);

		if (!$sound) {
			throw $this->createNotFoundException('No message found for id '.$id);
		}
		if (!$sound->getUser()->editableBy($this->getUser())) throw $this->createAccessDeniedException('Forbidden');

		$form = $this->createFormBuilder($sound)
			->add('save', SubmitType::class, array('label' => 'Confirmer'))
			->getForm();

		$form->handleRequest($request);
		if ($form->isSubmitted() && $form->isValid()) {
			$user_id = $sound->getUser()->getId();
			$em->remove($sound);
			$em->flush();
			if ($request->get("redirect")) return $this->redirect($request->get("redirect"));
			return $this->redirectToRoute('usersSounds', array("id" => $user_id));
		}

		$token = $this->get('security.token_storage')->getToken();
		return $this->render('sounds/delete.html.twig', array(
			"sound" => $sound,
			"form" => $form->createView(),
			"token" => $token
		));
	}
}
