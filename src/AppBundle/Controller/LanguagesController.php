<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Sound;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Config\Definition\Exception\Exception; 

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
		$repository = $this->getDoctrine()->getRepository('AppBundle:Language');
		$langs = $repository->findAll();

		return $this->render('languages/index.html.twig', array(
			"languages" => $langs,
			"user" => $this->getUser()
		));
	}

	/**
	* @Route("/languages/{id}", name="languagesShow")
	*/
	public function showAction(Request $request, $id)
	{
		$repository = $this->getDoctrine()->getRepository('AppBundle:Language');
		$langs = $repository->findAll();

		return $this->render('languages/index.html.twig', array(
			"languages" => $langs,
			"user" => $this->getUser()
		));
	}
}
