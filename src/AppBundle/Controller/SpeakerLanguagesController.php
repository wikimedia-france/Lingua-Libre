<?php

namespace AppBundle\Controller;

use AppBundle\Entity\SpeakerLanguage;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\CountryType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;

class SpeakerLanguagesController extends Controller
{
	/**
	* @Route("/speaker_languages/{id}/show", name="speakerLanguagesShow")
	*/
	public function showAction($id)
	{

		$sl = $this->getDoctrine()->getRepository('AppBundle:SpeakerLanguage')->find($id);

		if (!$sl) {
			throw $this->createNotFoundException('No speaker language found for id '.$id);
		}

		return $this->render('speaker_languages/show.html.twig', array("sl" => $sl));

	}

	/**
	* @Route("/speaker_languages/{id}/update", name="speakerLanguagesUpdate")
	*/
	public function updateAction(Request $request, $id)
	{
		$em = $this->getDoctrine()->getManager();

		$sl = $em->getRepository('AppBundle:SpeakerLanguage')->find($id);
		if (!$sl) throw $this->createNotFoundException('No speaker language found for id '.$id);
		if (!$sl->getSpeaker()->getUser()->editableBy($this->getUser())) throw $this->createAccessDeniedException('Forbidden');

		$form = $this->createFormBuilder($sl)
			->add('language', EntityType::class, array('class' => 'AppBundle:Language', 'choice_label' => 'title'))
			->add('level', ChoiceType::class, array("required" => false, "choices" => SpeakerLanguage::levelChoices()))
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
		return $this->render('speaker_languages/update.html.twig', array(
			"form" => $form->createView(),
			"token" => $token
		));
	}

	/**
	* @Route("/speaker/{id}/languages/add", name="speakerLanguagesAdd")
	*/
	public function addAction(Request $request, $id)
	{
		$em = $this->getDoctrine()->getManager();

		$speaker = $em->getRepository('AppBundle:Speaker')->find($id);
		if (!$speaker) throw $this->createNotFoundException('No speaker found for id '.$id);
		if (!$speaker->getUser()->editableBy($this->getUser())) throw $this->createAccessDeniedException('Forbidden');

		$sl = new SpeakerLanguage();
		$form = $this->createFormBuilder($sl)
			->add('language', EntityType::class, array('class' => 'AppBundle:Language', 'choice_label' => 'title'))
			->add('level', ChoiceType::class, array("required" => false, "choices" => SpeakerLanguage::levelChoices()))
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
		return $this->render('speaker_languages/update.html.twig', array(
			"form" => $form->createView(),
			"token" => $token
		));
	}

	/**
	* @Route("/speaker_languages/{id}/delete", name="speakerLanguagesDelete")
	*/
	public function deleteAction(Request $request, $id)
	{
		$em = $this->getDoctrine()->getManager();
		$repository = $this->getDoctrine()->getRepository('AppBundle:SpeakerLanguage');
		$sl = $repository->find($id);
		if (!$sl->getSpeaker()->getUser()->editableBy($this->getUser())) throw $this->createAccessDeniedException('Forbidden');

		if (!$sl) {
			throw $this->createNotFoundException('No speaker language found for id '.$id);
		}
		$speaker_id = $sl->getSpeaker()->getId();

		$em->remove($sl);
		$em->flush();
		return $this->redirectToRoute('speakersShow', array("id" => $speaker_id));
	}
}
