<?php

namespace AppBundle\Controller;

use AppBundle\Entity\SoundComment;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;

class SoundCommentsController extends Controller
{
	/**
	* @Route("/sound_comments/{id}/show", name="soundCommentsShow")
	*/
	public function showAction($id)
	{

		$sc = $this->getDoctrine()->getRepository('AppBundle:SoundComment')->find($id);

		if (!$sc) {
			throw $this->createNotFoundException('No sound comment found for id '.$id);
		}

		return $this->render('sound_comments/show.html.twig', array("sc" => $sc, "user" => $this->getUser()));

	}

	/**
	* @Route("/sound_comments/{id}/update", name="soundCommentsUpdate")
	*/
	public function updateAction(Request $request, $id)
	{
		$em = $this->getDoctrine()->getManager();

		$sc = $em->getRepository('AppBundle:SoundComment')->find($id);
		if (!$sc) throw $this->createNotFoundException('No sound comment found for id '.$id);
		if (!$sc->editableBy($this->getUser())) throw $this->createAccessDeniedException('Forbidden');

		$form = $this->createFormBuilder($sc)
			->add('visibility', CheckboxType::class, array("required" => false))
			->add('text', TextareaType::class, array("required" => true))
			->add('save', SubmitType::class, array('label' => 'Ok'))
			->getForm();

		//Enregistrement 
		$form->handleRequest($request);
		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($sc);
			$em->flush();
			return $this->redirectToRoute('soundsShow', array("id" => $sc->getSound()->getId()));
		}

		$token = $this->get('security.token_storage')->getToken();
		return $this->render('sound_comments/update.html.twig', array(
			"form" => $form->createView(),
			"token" => $token
		));
	}

	/**
	* @Route("/sound/{id}/sound_comments/add", name="soundCommentsAdd")
	*/
	public function addAction(Request $request, $id)
	{
		$em = $this->getDoctrine()->getManager();

		$sound = $em->getRepository('AppBundle:Sound')->find($id);
		if (!$sound) throw $this->createNotFoundException('No sound found for id '.$id);

		$sc = new SoundComment();
		$form = $this->createFormBuilder($sc)
			->add('visibility', CheckboxType::class, array("required" => false, "data" => true))
			->add('text', TextareaType::class, array("required" => true))
			->add('save', SubmitType::class, array('label' => 'Ok'))
			->getForm();

		//Enregistrement 
		$form->handleRequest($request);
		if ($form->isSubmitted() && $form->isValid()) {
			$sc->setSound($sound);
			$sc->setUser($this->getUser());
			$em = $this->getDoctrine()->getManager();
			$em->persist($sc);
			$em->flush();
			return $this->redirectToRoute('soundsShow', array("id" => $sound->getId()));
		}

		$token = $this->get('security.token_storage')->getToken();
		return $this->render('sound_comments/update.html.twig', array(
			"form" => $form->createView(),
			"token" => $token
		));
	}

	/**
	* @Route("/sound_comments/{id}/delete", name="soundCommentsDelete")
	*/
	public function deleteAction(Request $request, $id)
	{
		$em = $this->getDoctrine()->getManager();
		$repository = $this->getDoctrine()->getRepository('AppBundle:SoundComment');
		$sc = $repository->find($id);
		
		if (!$sc) {
			throw $this->createNotFoundException('No sound comment found for id '.$id);
		}
		if (!$sc->editableBy($this->getUser())) throw $this->createAccessDeniedException('Forbidden');

		$sound_id = $sc->getSound()->getId();

		$em->remove($sc);
		$em->flush();
		return $this->redirectToRoute('soundsShow', array("id" => $sound_id));
	}
}
