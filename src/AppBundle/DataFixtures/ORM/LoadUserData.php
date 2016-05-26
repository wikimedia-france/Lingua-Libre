<?php

namespace AppBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use AppBundle\Entity\User;

class LoadUserData implements FixtureInterface
{
	public function load(ObjectManager $manager)
	{
		$admin = new User();
		$admin->setUsername('admin');
		$admin->setPassword('$2a$08$jHZj/wJfcVKlIwr5AvR78euJxYK7Ku5kURNhNx.7.CSIJ3Pq6LEPC');
		$admin->setEmail('admin@lingualibre.fr');
		$admin->setIsActive(true);
		$admin->setIsAdmin(true);

		$manager->persist($admin);
		$manager->flush();
	}
}
