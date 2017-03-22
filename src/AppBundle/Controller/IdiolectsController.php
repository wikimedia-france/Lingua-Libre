<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Idiolect;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\CountryType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;

class IdiolectsController extends Controller
{
	/**
	* @Route("/idiolects/{id}/show", name="idiolectsShow")
	*/
	public function showAction($id)
	{

		$idiolect = $this->getDoctrine()->getRepository('AppBundle:Idiolect')->find($id);

		if (!$idiolect) {
			throw $this->createNotFoundException('No idiolect found for id '.$id);
		}

		return $this->render('idiolects/show.html.twig', array("idiolect" => $idiolect));

	}

	/**
	* @Route("/idiolects/{id}/update", name="idiolectsUpdate")
	*/
	public function updateAction(Request $request, $id)
	{
		$em = $this->getDoctrine()->getManager();

		$sl = $em->getRepository('AppBundle:Idiolect')->find($id);
		if (!$sl) throw $this->createNotFoundException('No idiolect found for id '.$id);
		if (!$sl->getSpeaker()->getUser()->editableBy($this->getUser())) throw $this->createAccessDeniedException('Forbidden');

		$form = $this->createFormBuilder($sl)
			->add('language', EntityType::class, array('class' => 'AppBundle:Language', 'choice_label' => 'title'))
			->add('profileType', ChoiceType::class, array("required" => false, "choices" => Idiolect::profileTypeChoices()))
			->add('description', TextType::class, array("required" => false))
			->add('dialect', TextType::class, array("required" => false))
			->add('town', TextType::class, array("required" => false))
			->add('country', CountryType::class, array("required" => false))
			->add('save', SubmitType::class, array('label' => 'Ok'))
			->getForm();

		//Enregistrement 
		$form->handleRequest($request);
		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($sl);
			$em->flush();
			return $this->redirectToRoute('speakersShow', array("id" => $sl->getSpeaker()->getId()));
		}

		$token = $this->get('security.token_storage')->getToken();
		return $this->render('idiolects/update.html.twig', array(
			"form" => $form->createView(),
			"token" => $token
		));
	}

	/**
	* @Route("/speaker/{id}/idiolects/add", name="idiolectsAdd")
	*/
	public function addAction(Request $request, $id)
	{
		$em = $this->getDoctrine()->getManager();

		$speaker = $em->getRepository('AppBundle:Speaker')->find($id);
		if (!$speaker) throw $this->createNotFoundException('No speaker found for id '.$id);
		if (!$speaker->getUser()->editableBy($this->getUser())) throw $this->createAccessDeniedException('Forbidden');

		$sl = new Idiolect();
		$form = $this->createFormBuilder($sl)
			->add('language', EntityType::class, array('class' => 'AppBundle:Language', 'choice_label' => 'title'))
			->add('profileType', ChoiceType::class, array("required" => false, "choices" => Idiolect::profileTypeChoices()))
			->add('description', TextType::class, array("required" => false))
			->add('town', TextType::class, array("required" => false))
			->add('country', CountryType::class, array("required" => false))
			->add('dialect', TextType::class, array("required" => false))
			->add('save', SubmitType::class, array('label' => 'Ok'))
			->getForm();

		//Enregistrement 
		$form->handleRequest($request);
		if ($form->isSubmitted() && $form->isValid()) {
			$sl->setSpeaker($speaker);
			$em = $this->getDoctrine()->getManager();
			$em->persist($sl);
			$em->flush();
			return $this->redirectToRoute('speakersShow', array("id" => $speaker->getId()));
		}

		$token = $this->get('security.token_storage')->getToken();
		return $this->render('idiolects/update.html.twig', array(
			"form" => $form->createView(),
			"token" => $token
		));
	}

	/**
	* @Route("/idiolects/{id}/delete", name="idiolectsDelete")
	*/
	public function deleteAction(Request $request, $id)
	{
		$em = $this->getDoctrine()->getManager();
		$repository = $this->getDoctrine()->getRepository('AppBundle:Idiolect');
		$sl = $repository->find($id);
		if (!$sl->getSpeaker()->getUser()->editableBy($this->getUser())) throw $this->createAccessDeniedException('Forbidden');

		if (!$sl) {
			throw $this->createNotFoundException('No idiolect found for id '.$id);
		}
		$speaker_id = $sl->getSpeaker()->getId();

		$em->remove($sl);
		$em->flush();
		return $this->redirectToRoute('speakersShow', array("id" => $speaker_id));
	}
}
