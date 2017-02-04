<?php

namespace AppBundle\Controller;

use DateTime;
use AppBundle\Entity\Speaker;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\BirthdayType;
use Symfony\Component\Form\Extension\Core\Type\CountryType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;

class SpeakersController extends Controller
{
	/**
	* @Route("/speakers", name="speakers")
	*/
	public function indexAction()
	{
		$speakers = $this->getDoctrine()->getRepository('AppBundle:Speaker')->findAll();

		return $this->render('speakers/index.html.twig', array(
			"auth" => $this->getUser(),
			"speakers" => $speakers
		));
	}

	/**
	* @Route("/speakers/{id}/show", name="speakersShow")
	*/
	public function showAction($id)
	{
		$speaker = $this->getDoctrine()->getRepository('AppBundle:Speaker')->find($id);
		if (!$speaker) throw $this->createNotFoundException('No speaker found for id '.$id);

		return $this->render('speakers/show.html.twig', array(
			"speaker" => $speaker,
			"user" => $this->getUser()
		));
	}

	/**
	* @Route("/speakers/{id}/license", name="speakersLicense")
	*/
	public function licenseAction(Request $request, $id)
	{
		$em = $this->getDoctrine()->getManager();

		$speaker = $em->getRepository('AppBundle:Speaker')->find($id);
		if (!$speaker) throw $this->createNotFoundException('No speaker found for id '.$id);

		$form = $this->createFormBuilder()
			->add('signed', CheckboxType::class, array('required' => false, "mapped" => false))
			->add('save', SubmitType::class, array('label' => 'Ok'))
			->getForm();

		//Enregistrement
		$form->handleRequest($request);
		if ($form->isSubmitted() && $form->isValid()) {
			if ($form->get("signed")->getData()) {
				$speaker->setSignedDate(new DateTime());
				$em->persist($speaker);
				$em->flush();
			}
			return $this->redirectToRoute('speakersShow', array("id" => $speaker->getId()));
		}

		$token = $this->get('security.token_storage')->getToken();
		return $this->render('speakers/license.html.twig', array(
			"speaker" => $speaker,
			"form" => $form->createView(),
			"token" => $token
		));
	}

	/**
	* @Route("/users/{id}/addSpeaker", name="usersAddSpeaker")
	*/
	public function addAction(Request $request, $id)
	{
		$em = $this->getDoctrine()->getManager();

		$user = $em->getRepository('AppBundle:User')->find($id);
		if (!$user) throw $this->createNotFoundException('No user found for id '.$id);
		if (!$user->editableBy($this->getUser())) throw $this->createAccessDeniedException('Forbidden');
		
		$speaker = new Speaker();
		$form = $this->createFormBuilder($speaker)
			->add('name', TextType::class)
			->add('sex', ChoiceType::class, array(
				"choices" => Speaker::sexChoices()
			))
			->add('livingCity', TextType::class, array("required" => false))
			->add('livingCountry', CountryType::class, array("required" => false))
			->add('birth', BirthdayType::class, array("format" => "dd/MM/yyyy"))
			->add('description', TextareaType::class, array("required" => false))
			->add('signed', CheckboxType::class, array('required' => false, "mapped" => false))
			->add('save', SubmitType::class, array('label' => 'Ok'))
			->getForm();

		//Enregistrement
		$form->handleRequest($request);
		if ($form->isSubmitted() && $form->isValid()) {
			if($form->get("signed")->getData() == true){
				$speaker->setSignedDate(new DateTime());
			}
			$speaker->setUser($user);
			$em->persist($speaker);
			$em->flush();
			return $this->redirectToRoute('speakersShow', array("id" => $speaker->getId()));
		}

		$token = $this->get('security.token_storage')->getToken();
		return $this->render('speakers/add.html.twig', array(
			"form" => $form->createView(),
			"token" => $token
		));
	}

	/**
	* @Route("/speakers/{id}/update", name="speakersUpdate")
	*/
	public function updateAction(Request $request, $id)
	{
		$em = $this->getDoctrine()->getManager();

		$speaker = $em->getRepository('AppBundle:Speaker')->find($id);
		if (!$speaker) throw $this->createNotFoundException('No speaker found for id '.$id);
		if (!$speaker->getUser()->editableBy($this->getUser())) throw $this->createNotFoundException('Forbidden');

		$form = $this->createFormBuilder($speaker)
			->add('name', TextType::class)
			->add('sex', ChoiceType::class, array(
				"choices" => Speaker::sexChoices()
			))
			->add('livingCity', TextType::class, array("required" => false))
			->add('livingCountry', CountryType::class, array("required" => false))
			->add('birth', BirthdayType::class, array("format" => "dd/MM/yyyy"))
			->add('description', TextareaType::class, array("required" => false))
			->add('save', SubmitType::class, array('label' => 'Ok'))
			->getForm();

		//Enregistrement 
		$form->handleRequest($request);
		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($speaker);
			$em->flush();
			return $this->redirectToRoute('speakers');
		}

		$token = $this->get('security.token_storage')->getToken();
		return $this->render('speakers/update.html.twig', array(
			"form" => $form->createView(),
			"token" => $token
		));
	}

	/**
	* @Route("/speakers/{id}/delete", name="speakersDelete")
	*/
	public function deleteAction(Request $request, $id)
	{
		$em = $this->getDoctrine()->getManager();
		$repository = $this->getDoctrine()->getRepository('AppBundle:Speaker');
		$speaker = $repository->find($id);
		if (!$speaker) {
			throw $this->createNotFoundException('No speaker found for id '.$id);
		}
		if (!$speaker->getUser()->editableBy($this->getUser())) throw $this->createAccessDeniedException('Forbidden');

		$form = $this->createFormBuilder($speaker)
			->add('save', SubmitType::class, array('label' => 'Confirmer'))
			->getForm();

		$form->handleRequest($request);
		if ($form->isSubmitted() && $form->isValid()) {
			$user_id = $speaker->getUser()->getId();
			$em->remove($speaker);
			$em->flush();
			return $this->redirectToRoute('usersShow', array("id" => $user_id));
		}

		$token = $this->get('security.token_storage')->getToken();
		return $this->render('speakers/delete.html.twig', array(
			"speaker" => $speaker,
			"form" => $form->createView(),
			"token" => $token
		));
	}
}
