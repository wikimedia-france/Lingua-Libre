<?php
namespace AppBundle\Entity;

use DateTime;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="speakers")
 */
class Speaker
{
	/**
	 * @ORM\Column(type="integer")
	 * @ORM\Id
	 * @ORM\GeneratedValue(strategy="AUTO")
	 */
	private $id;

	/**
	 * @ORM\ManyToOne(targetEntity="User")
	 * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
	 */
	private $user;

	/**
	 * @ORM\Column(type="string", length=25, unique=false)
	 * @Assert\NotBlank()
	 */
	private $name;

	/**
	 * @ORM\Column(type="string", length=50, nullable=true)
	 */
	private $livingCity;

	/**
	 * @ORM\Column(type="string", length=2, nullable=true)
	 */
	private $livingCountry;

	/**
	 * @ORM\Column(type="text", nullable=true)
	 */
	private $description;

	/**
	 * @ORM\Column(type="string", length=1)
	 * @Assert\Choice(choices = {"M", "F", "I", "N", "O"})
	 */
	private $sex;

	/**
	 * @ORM\Column(type="date")
	 * @Assert\NotBlank()
	 */
	private $birth;

	/**
	 * @ORM\OneToMany(targetEntity="SpeakerLanguage", mappedBy="speaker")
	 */
	private $languages;

	/**
	 * @ORM\Column(type="date")
	 */
	private $hasSignedDate;

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
	 * Set name
	 *
	 * @param string $name
	 *
	 * @return Speaker
	 */
	public function setName($name)
	{
		$this->name = $name;

		return $this;
	}

	/**
	 * Get name
	 *
	 * @return string
	 */
	public function getName()
	{
		return $this->name;
	}

	/**
	 * Set description
	 *
	 * @param string $description
	 *
	 * @return Speaker
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
	 * Set livingCity
	 *
	 * @param string $livingCity
	 *
	 * @return Speaker
	 */
	public function setLivingCity($livingCity)
	{
		$this->livingCity = $livingCity;

		return $this;
	}

	/**
	 * Get livingCity
	 *
	 * @return string
	 */
	public function getLivingCity()
	{
		return $this->livingCity;
	}

	/**
	 * Set livingCountry
	 *
	 * @param string $livingCountry
	 *
	 * @return Speaker
	 */
	public function setLivingCountry($livingCountry)
	{
		$this->livingCountry = $livingCountry;

		return $this;
	}

	/**
	 * Get livingCountry
	 *
	 * @return string
	 */
	public function getLivingCountry()
	{
		return $this->livingCountry;
	}

	/**
	/**
	 * Set sex
	 *
	 * @param string $sex
	 *
	 * @return Speaker
	 */
	public function setSex($sex)
	{
		$this->sex = $sex;

		return $this;
	}

	/**
	 * Get sex
	 *
	 * @return string
	 */
	public function getSex()
	{
		return $this->sex;
	}

	public static function sexValues()
	{
		return array(
			"M" => array("symbol" => "♂", "title" => "homme"),
			"F" => array("symbol" => "♀", "title" => "femme"),
//			"T" => array("symbol" => "⚦", "title" => "transgenre"),
			"I" => array("symbol" => "⚥", "title" => "intersexe"),
			"N" => array("symbol" => "⚲", "title" => "neutre"),
//			"A" => array("symbol" => "⚪", "title" => "asexualité")
			"O" => array("symbol" => "-", "title" => "autre")
		);
	}

	public static function sexChoices() {
		$items = self::sexValues();
		$result = array();
		foreach ($items as $key => $value) {
			$result[$value["symbol"]." (".$value["title"].")"] = $key;
		}
		return $result;
	}

	/**
	 * Get sexSymbol
	 *
	 * @return string
	 */
	public static function sexSymbol($sex)
	{
		$values = self::sexValues();
		return isset($values[$sex]) ? $values[$sex]["symbol"] : "-";
	}

	public function getSexSymbol()
	{
		return self::sexSymbol($this->getSex());
	}

	public static function sexTitle($sex)
	{
		$values = self::sexValues();
		return isset($values[$sex]) ? $values[$sex]["title"] : "-";
	}

	public function getSexTitle()
	{
		return self::sexTitle($this->getSex());
	}

	/**
	 * Set birth
	 *
	 * @param \DateTime $birth
	 *
	 * @return Speaker
	 */
	public function setBirth($birth)
	{
		$this->birth = $birth;

		return $this;
	}

	/**
	 * Get birth
	 *
	 * @return \DateTime
	 */
	public function getBirth()
	{
		return $this->birth;
	}

	/**
	 * Set hasSignedDate
	 *
	 * @param \DateTime $hasSignedDate
	 *
	 * @return Speaker
	 */
	public function setHasSignedDate($hasSignedDate)
	{
		$this->hasSignedDate = $hasSignedDate;

		return $this;
	}

	/**
	 * Get hasSignedDate
	 *
	 * @return \DateTime
	 */
	public function getHasSignedDate()
	{
		return $this->hasSignedDate;
	}

	/**
	 * Set user
	 *
	 * @param \AppBundle\Entity\User $user
	 *
	 * @return Speaker
	 */
	public function setUser(\AppBundle\Entity\User $user = null)
	{
		$this->user = $user;

		return $this;
	}

	/**
	 * Get user
	 *
	 * @return \AppBundle\Entity\User
	 */
	public function getUser()
	{
		return $this->user;
	}

	public function editableBy($user)
	{
		return !$this->getUser() || $user && ($this->getUser()->getId() == $user->getId() || $user->getIsAdmin());
	}

	/**
	 * Constructor
	 */
	public function __construct()
	{
		$this->languages = new \Doctrine\Common\Collections\ArrayCollection();
	}

	/**
	 * Add language
	 *
	 * @param \AppBundle\Entity\SpeakerLanguage $language
	 *
	 * @return Speaker
	 */
	public function addLanguage(\AppBundle\Entity\SpeakerLanguage $language)
	{
		$this->languages[] = $language;

		return $this;
	}

	/**
	 * Remove language
	 *
	 * @param \AppBundle\Entity\SpeakerLanguage $language
	 */
	public function removeLanguage(\AppBundle\Entity\SpeakerLanguage $language)
	{
		$this->languages->removeElement($language);
	}

	/**
	 * Get languages
	 *
	 * @return \Doctrine\Common\Collections\Collection
	 */
	public function getLanguages()
	{
		return $this->languages;
	}

	public function getDefaultLanguage()
	{
		return count($this->languages) > 0 ? $this->languages[0] : false;
	}

	public function export()
	{
		$result = array();
		$result["name"] = $this->getName();
		if ($this->getLivingCountry()) $result["country"] = $this->getLivingCountry();
		if ($this->getLivingCity()) $result["city"] = $this->getLivingCity();
		$result["path"] = $this->getName();

		$languages = $this->getLanguages();
		$table = array();
		foreach($languages as $language) 
		{
			$table[] = $language->export();
		}
		$result["languages"] = $table;
		return $result;
	}
}
