<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Sound;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Config\Definition\Exception\Exception; 
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class LanguagesController extends Controller
{
	/**
	* @Route("/languages", name="languages")
	*/
	public function indexAction()
	{
		$repository = $this->getDoctrine()->getRepository('AppBundle:Language');
		$langs = $repository->findAll();

		return $this->render('languages/index.html.twig', array(
			"languages" => $langs,
			"user" => $this->getUser()
		));
	}

	/**
	* @Route("/languages/add", name="languagesAdd")
	*/
	public function addAction()
	{
	}

	/**
	* @Route("/languages/{id}", name="languagesShow")
	*/
	public function showAction(Request $request, $id)
	{
		$repository = $this->getDoctrine()->getRepository('AppBundle:Language');
		$lang = $repository->find($id);

		return $this->render('languages/show.html.twig', array(
			"language" => $lang,
			"user" => $this->getUser()
		));
	}

	/**
	* @Route("/languages/{id}/delete", name="languagesDelete")
	*/
	public function soundsAction(Request $request, $id)
	{
	}
	
	/**
	* @Route("/languages/{id}/update", name="languagesUpdate")
	*/
	public function updateAction(Request $request, $id)
	{
		$em = $this->getDoctrine()->getManager();

		$lang = $em->getRepository('AppBundle:Language')->find($id);
		if (!$lang) throw $this->createNotFoundException('No lang found for id '.$id);
		if (!$lang->editableBy($this->getUser())) throw $this->createAccessDeniedException('Forbidden');

		$builder = $this->createFormBuilder($lang)
			->add('title', TextType::class)
			->add('code', TextType::class)
			->add('save', SubmitType::class, array('label' => 'Ok'));

		$form = $builder->getForm();

		//Enregistrement 
		$form->handleRequest($request);
		if ($form->isSubmitted() && $form->isValid()) {
			$em->persist($lang);
			$em->flush();
			return $this->redirectToRoute('languagesShow', array("id" => $lang->getId()));
		}

		$token = $this->get('security.token_storage')->getToken();
		return $this->render('languages/update.html.twig', array(
			"form" => $form->createView(),
			"token" => $token
		));
	}

	/**
	* @Route("/languages/{id}/delete", name="languagesDelete")
	*/
	public function deleteAction(Request $request, $id)
	{
		$em = $this->getDoctrine()->getManager();
		$repository = $this->getDoctrine()->getRepository('AppBundle:Language');
		$lang = $repository->find($id);

		if (!$lang) {
			throw $this->createNotFoundException('No message found for id '.$id);
		}
		if (!$lang->editableBy($this->getUser())) throw $this->createAccessDeniedException('Forbidden');

		$form = $this->createFormBuilder($lang)
			->add('save', SubmitType::class, array('label' => 'Confirmer'))
			->getForm();

		$form->handleRequest($request);
		if ($form->isSubmitted() && $form->isValid()) {
			$em->remove($lang);
			$em->flush();
			return $this->redirectToRoute('languages');
		}

		$token = $this->get('security.token_storage')->getToken();
		return $this->render('languages/delete.html.twig', array(
			"language" => $lang,
			"form" => $form->createView(),
			"token" => $token
		));
	}

}
