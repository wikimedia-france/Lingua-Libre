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

class MessagesController extends Controller
{
	/**
	* @Route("/messages", name="messages")
	*/
	public function indexAction(Request $request)
	{
		$message = new Message();
		$form = $this->createFormBuilder($message)
			->add('title', TextType::class)
			->add('body', TextareaType::class)
			->add('save', SubmitType::class, array('label' => 'Envoyer'))
			->getForm();

		//Enregistrement du message si envoyé
		$form->handleRequest($request);
		if ($form->isSubmitted() && $form->isValid()) {
			$message->setDate(new \DateTime('now'));
			$message->setUser($this->getUser());

			$em = $this->getDoctrine()->getManager();
			$em->persist($message);
			$em->flush();
			return $this->redirectToRoute('messages');
		}

		$repository = $this->getDoctrine()->getRepository('AppBundle:Message');
		$messages = $repository->findAll();

		$token = $this->get('security.token_storage')->getToken();

		return $this->render('messages/index.html.twig', array(
			"messages" => $messages,
			"form" => $form->createView(),
			"token" => $token
		));
	}

	/**
	* @Route("/messages/{id}")
	*/
	public function showAction($id)
	{
		$repository = $this->getDoctrine()->getRepository('AppBundle:Message');
		$message = $repository->find($id);

		if (!$message) {
			throw $this->createNotFoundException('No message found for id '.$id);
		}

		return $this->render('messages/show.html.twig', array("message" => $message));
	}

	/**
	* @Route("/messages/delete/{id}")
	*/
	public function deleteAction($id)
	{
		$em = $this->getDoctrine()->getManager();
		$repository = $this->getDoctrine()->getRepository('AppBundle:Message');
		$message = $repository->find($id);

		if (!$message) {
			throw $this->createNotFoundException('No message found for id '.$id);
		}

		$em->remove($message);
		$em->flush();
		return $this->redirectToRoute('messages');
	}

}
