<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use AppBundle\Entity\Speaker;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\EventDispatcher\EventDispatcher;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;

class UsersController extends Controller
{
	/**
	* @Route("/users", name="users")
	*/
	public function indexAction()
	{
		$users = $this->getDoctrine()->getRepository('AppBundle:User')->findAll();

		return $this->render('users/index.html.twig', array(
			"auth" => $this->getUser(),
			"users" => $users,
		));
	}

	/**
	* @Route("/users/add", name="usersAdd")
	*/
	public function addAction(Request $request)
	{
		$user = new User();

		$form = $this->createFormBuilder($user)
			->add('username', TextType::class, array('attr' => array("autocomplete" => "off")))
			->add('plainPassword', RepeatedType::class, array(
				'type' => PasswordType::class,
				'first_options'  => array('label' => 'Password'),
				'second_options' => array('label' => 'Repeat Password'),
			))
			->add('email', EmailType::class)
			->add('save', SubmitType::class, array('label' => 'Ok'))
			->getForm();

		//Enregistrement
		$form->handleRequest($request);
		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();

			$user->encodePassword($this->get('security.password_encoder'));
			$em->persist($user);
			$em->flush();

			$token = new UsernamePasswordToken($user, $user->getPassword(), "main", $user->getRoles());
			$this->get("security.token_storage")->setToken($token);

			return $this->redirectToRoute('usersShow', array("id" => $user->getId()));
		}

		$token = $this->get('security.token_storage')->getToken();
		return $this->render('users/add.html.twig', array(
			"form" => $form->createView(),
			"token" => $token
		));
	}

	/**
	* @Route("/users/{id}", name="usersShow")
	*/
	public function showAction(Request $request, $id)
	{
		$em = $this->getDoctrine()->getManager();

		$user = $em->getRepository('AppBundle:User')->find($id);
		if (!$user) throw $this->createNotFoundException('No user found for id '.$id);

		return $this->render('users/show.html.twig', array(
			"auth" => $this->getUser(),
			"user" => $user,
		));
	}

	/**
	* @Route("/users/{id}/speakers", name="usersSpeakers")
	*/
	public function speakersAction(Request $request, $id)
	{
		$em = $this->getDoctrine()->getManager();

		$user = $em->getRepository('AppBundle:User')->find($id);
		if (!$user) throw $this->createNotFoundException('No user found for id '.$id);

		return $this->render('users/speakers.html.twig', array(
			"auth" => $this->getUser(),
			"user" => $user,
		));
	}

	/**
	* @Route("/users/{id}/sounds", name="usersSounds")
	*/
	public function soundsAction(Request $request, $id)
	{
		$em = $this->getDoctrine()->getManager();

		$user = $em->getRepository('AppBundle:User')->find($id);
		if (!$user) throw $this->createNotFoundException('No user found for id '.$id);

		$sounds = $em->getRepository('AppBundle:Sound')->findByUser($user);

		return $this->render('users/sounds.html.twig', array(
			"auth" => $this->getUser(),
			"user" => $user,
			"sounds" => $sounds,
		));
	}

	/**
	* @Route("/users/{id}/updatePassword", name="usersUpdatePassword")
	*/
	public function updatePasswordAction(Request $request, $id)
	{
		$em = $this->getDoctrine()->getManager();

		$user = $em->getRepository('AppBundle:User')->find($id);
		if (!$user) throw $this->createNotFoundException('No user found for id '.$id);
		if (!$user->editableBy($this->getUser())) throw $this->createAccessDeniedException('Forbidden');

		$builder = $this->createFormBuilder($user)
			->add('oldPlainPassword', PasswordType::class, array("mapped" => false))
			->add('plainPassword', RepeatedType::class, array(
				'type' => PasswordType::class,
			))
			->add('save', SubmitType::class, array('label' => 'Ok'));

		$form = $builder->getForm();

		//Enregistrement 
		$form->handleRequest($request);
		if ($form->isSubmitted() && $form->isValid()) {
			$encoder = $this->get('security.password_encoder');
			$oldPlainPassword = $form->get("oldPlainPassword")->getData();

			if ($encoder->isPasswordValid($user, $oldPlainPassword)) {
				$user->encodePassword($encoder);
				$em->persist($user);
				$em->flush();
				return $this->redirectToRoute('usersShow', array("id" => $user->getId()));
			}
			else {
				//Définir message d’erreur
			}
		}

		$token = $this->get('security.token_storage')->getToken();
		return $this->render('users/update_password.html.twig', array(
			"form" => $form->createView(),
			"token" => $token
		));
	}

	/**
	* @Route("/users/{id}/record", name="usersRecord")
	*/
	public function recordAction($id)
	{
		$em = $this->getDoctrine()->getManager();

		$user = $em->getRepository('AppBundle:User')->find($id);
		if (!$user) throw $this->createNotFoundException('No user found for id '.$id);
		if (!$user->editableBy($this->getUser())) throw $this->createAccessDeniedException('Forbidden');

		$speakers = $this->getDoctrine()->getRepository('AppBundle:Speaker')->findByUser($user);
		return $this->render('users/record.html.twig', array(
			"user" => $user,
			"speakers" => $speakers
		));
	}

	/**
	* @Route("/users/{id}/update", name="usersUpdate")
	*/
	public function updateAction(Request $request, $id)
	{
		$em = $this->getDoctrine()->getManager();

		$user = $em->getRepository('AppBundle:User')->find($id);
		if (!$user) throw $this->createNotFoundException('No user found for id '.$id);
		if (!$user->editableBy($this->getUser())) throw $this->createAccessDeniedException('Forbidden');


		$builder = $this->createFormBuilder($user)
			->add('email', TextType::class)
			->add('save', SubmitType::class, array('label' => 'Ok'));
		if ($this->getUser()->getIsAdmin()) $builder->add('isAdmin', ChoiceType::class, array("choices" => array("Oui" => true, "Non" => false)));

		$form = $builder->getForm();

		//Enregistrement 
		$form->handleRequest($request);
		if ($form->isSubmitted() && $form->isValid()) {
			$em->persist($user);
			$em->flush();
			return $this->redirectToRoute('usersShow', array("id" => $user->getId()));
		}

		$token = $this->get('security.token_storage')->getToken();
		return $this->render('users/update.html.twig', array(
			"form" => $form->createView(),
			"token" => $token
		));
	}

}
