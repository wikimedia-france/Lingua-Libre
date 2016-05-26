<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Message;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class HomeController extends Controller
{
	/**
	* @Route("/", name="home")
	*/
	public function indexAction(Request $request)
	{
		return $this->render('index.html.twig', array());
	}

	/**
	* @Route("/contact", name="contact")
	*/
	public function contactAction(Request $request)
	{
		return $this->render('contact.html.twig', array());
	}

	/**
	* @Route("/about", name="about")
	*/
	public function aboutAction(Request $request)
	{
		return $this->render('about.html.twig', array());
	}
}
