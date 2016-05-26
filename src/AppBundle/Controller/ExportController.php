<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use AppBundle\Entity\Speaker;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class ExportController extends Controller
{
	/**
	* @Route("/export", name="export")
	*/
	public function indexAction()
	{
		$speakers = $this->getDoctrine()->getRepository('AppBundle:Speaker')->findAll();

		$result = array();
		$table = array();
		foreach ($speakers as $speaker) {
			$table[] = $speaker->export();
		}
		$result["speakers"] = $table;

		return new Response(json_encode($result));
	}

	/**
	* @Route("/export/{name}", name="exportSpeaker")
	*/
	public function speakerAction($name)
	{
		$doctrine = $this->getDoctrine();
		$speakers = $doctrine->getRepository('AppBundle:Speaker')->findByName($name);
		if (count($speakers) != 1) throw $this->createNotFoundException('No speaker found with this name');
		$speaker = $speakers[0];

		$sounds = $doctrine->getRepository('AppBundle:Sound')->findBySpeaker($speaker->getId());

		$result = $speaker->export();
		$table = array();
		foreach ($sounds as $sound) {
			$table[] = $sound->export();
		}
		$result["sounds"] = $table;

		return new Response(json_encode($result));
	}	

	public function getOggFor($filename)
	{
		$wav_path = $this->container->getParameter('audio_path');
		$ogg_path = $this->container->getParameter('audio_cache_path');
		$target = $ogg_path.basename($filename, ".wav").".ogg";
		if (!file_exists($target)) 
		{
			exec("oggenc -o \"$target\" ".$wav_path.$filename);
		}
		return $target;
	}

	/**
	* @Route("/export/{name}/{filename}", name="exportSound")
	*/
	public function soundAction($filename)
	{
		if (!preg_match("/LL([0-9]*)\.ogg$/i", $filename, $data))
			throw $this->createNotFoundException('Could not get sound id');

		$id = $data[1];
		$sound = $this->getDoctrine()->getRepository('AppBundle:Sound')->find($id);
		if (!$sound)
			throw $this->createNotFoundException('Could not get sound with this id');

		$ogg = $this->getOggFor($sound->getFilename());

		$response = new Response();
		$response->setContent(file_get_contents($ogg));
		$response->setStatusCode(Response::HTTP_OK);
		$response->headers->set('Content-Type', 'audio/ogg');
		return $response;
	}	

}
