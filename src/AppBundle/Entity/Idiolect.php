<?php
namespace AppBundle\Entity;

use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="speaker_languages")
 */
class Idiolect implements \JsonSerializable
{
	/**
	 * @ORM\Column(type="integer")
	 * @ORM\Id
	 * @ORM\GeneratedValue(strategy="AUTO")
	 */
	private $id;

	/**
	 * @ORM\ManyToOne(targetEntity="Speaker")
	 * @ORM\JoinColumn(name="speaker_id", referencedColumnName="id")
	 */
	private $speaker;

	/**
	 * @ORM\ManyToOne(targetEntity="Language")
	 * @ORM\JoinColumn(name="language_id", referencedColumnName="id")
	 */
	private $language;

	/**
	 * @ORM\Column(type="string", length=3, nullable=true)
	 */
	private $profileType;

	/**
	 * @ORM\Column(type="string", length=128, nullable=true)
	 */
	private $description;

	/**
	 * @ORM\Column(type="string", length=128, nullable=true)
	 */
	private $dialect;

	/**
	 * @ORM\Column(type="string", length=25, nullable=true)
	 */
	private $town;

	/**
	 * @ORM\Column(type="string", length=2, nullable=true)
	 */
	private $country;

	/**
	 * Get id
	 *
	 * @return integer
	 */
	public function getId()
	{
		return $this->id;
	}

	/**
	 * Set speaker
	 *
	 * @param \AppBundle\Entity\Speaker $speaker
	 *
	 * @return SpeakerLanguage
	 */
	public function setSpeaker(\AppBundle\Entity\Speaker $speaker = null)
	{
		$this->speaker = $speaker;

		return $this;
	}

	/**
	 * Get speaker
	 *
	 * @return \AppBundle\Entity\Speaker
	 */
	public function getSpeaker()
	{
		return $this->speaker;
	}

	/**
	 * Set language
	 *
	 * @param \AppBundle\Entity\Language $language
	 *
	 * @return SpeakerLanguage
	 */
	public function setLanguage(\AppBundle\Entity\Language $language = null)
	{
		$this->language = $language;

		return $this;
	}

	/**
	 * Get language
	 *
	 * @return \AppBundle\Entity\Language
	 */
	public function getLanguage()
	{
		return $this->language;
	}

	/**
	 * Set profileType
	 *
	 * @param string $profileType
	 *
	 * @return SpeakerLanguage
	 */
	public function setProfileType($profileType)
	{
		$this->profileType = $profileType;

		return $this;
	}

	/**
	 * Get profileType
	 *
	 * @return string
	 */
	public function getProfileType()
	{
		return $this->profileType;
	}

	/**
	 * Set description
	 *
	 * @param string $description
	 *
	 * @return SpeakerLanguage
	 */
	public function setDescription($description)
	{
		$this->description = $description;

		return $this;
	}

	/**
	 * Get description
	 *
	 * @return string
	 */
	public function getDescription()
	{
		return $this->description;
	}

	/**
	 * Set dialect
	 *
	 * @param string $dialect
	 *
	 * @return SpeakerLanguage
	 */
	public function setDialect($dialect)
	{
		$this->dialect = $dialect;

		return $this;
	}

	/**
	 * Get dialect
	 *
	 * @return string
	 */
	public function getDialect()
	{
		return $this->dialect;
	}

	/**
	 * Set town
	 *
	 * @param string $town
	 *
	 * @return SpeakerLanguage
	 */
	public function setTown($town)
	{
		$this->town = $town;

		return $this;
	}

	/**
	 * Get town
	 *
	 * @return string
	 */
	public function getTown()
	{
		return $this->town;
	}

	/**
	 * Set country
	 *
	 * @param string $country
	 *
	 * @return SpeakerLanguage
	 */
	public function setCountry($country)
	{
		$this->country = $country;

		return $this;
	}

	/**
	 * Get country
	 *
	 * @return string
	 */
	public function getCountry()
	{
		return $this->country;
	}

	public static function profileTypeValues()
	{
		return array(
			"NAT" => "Natif (langue maternelle)",
			"A" => "Apprenant débutant (A1-A2)",
			"B" => "Niveau moyen (B1-B2)",
			"C" => "Bon niveau (C1-C2)"
		);
	}

	public static function profileTypeChoices()
	{
		return array_flip(self::profileTypeValues());
	}

	public function export()
	{
		$result = array();
		$result["id"] = $this->getId();
		$result["lang"] = $this->getLanguage();
		if ($this->getProfileType()) $result["profileType"] = $this->getProfileType();
		if ($this->getCountry()) $result["country"] = $this->getCountry();
		if ($this->getTown()) $result["town"] = $this->getTown();
		if ($this->getDialect()) $result["dialect"] = $this->getDialect();
		return $result;
	}

	public function jsonSerialize()
	{
		return $this->export();
	}
}
