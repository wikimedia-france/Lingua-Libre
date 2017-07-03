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
			array("deu", "Allemand",false),
			array("gsw", "Alsacien",false),
			array("eng", "Anglais",false),
			array("bre", "Breton",false),
			array("fra", "Français",false),
			array("swe", "Suédois",false),
			array("oci", "Occitan",false),
			array("frk", "Francique",false),
			array("heb", "Hébreu",true),
		);

		foreach ($table as $item) {
			$lang = new Language();
			$lang->setCode($item[0]);
			$lang->setTitle($item[1]);
			$lang->setIsRtl($item[2]);
			$manager->persist($lang);
			$manager->flush();
		}
	}
}
