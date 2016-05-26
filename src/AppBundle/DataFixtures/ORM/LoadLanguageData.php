<?php

namespace AppBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use AppBundle\Entity\Language;

class LoadLanguageData implements FixtureInterface
{
	public function load(ObjectManager $manager)
	{
		$table = array(
			array("deu", "Allemand"),
			array("gsw", "Alsacien"),
			array("eng", "Anglais"),
			array("bre", "Breton"),
			array("fra", "Français"),
			array("swe", "Suédois"),
			array("oci", "Occitan"),
			array("frk", "Francique")
		);

		foreach ($table as $item) {
			$lang = new Language();
			$lang->setCode($item[0]);
			$lang->setTitle($item[1]);
			$manager->persist($lang);
			$manager->flush();
		}
	}
}
