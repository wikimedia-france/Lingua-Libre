<?php
namespace AppBundle\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="sounds")
 */

class Sound
{
	/**
	 * @ORM\Column(type="integer")
	 * @ORM\Id
	 * @ORM\GeneratedValue(strategy="AUTO")
	 */
	protected $id;

	/**
	 * @ORM\ManyToOne(targetEntity="User")
	 * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
	 */
	protected $user;

	/**
	 * @ORM\ManyToOne(targetEntity="Speaker")
	 * @ORM\JoinColumn(name="speaker_id", referencedColumnName="id")
	 */
	protected $speaker;

	/**
	 * @ORM\Column(type="string", length=100)
	 */
	protected $filename;

	/**
	 * @ORM\Column(type="string", length=100)
	 */
	protected $text;

	/**
	 * @ORM\ManyToOne(targetEntity="Language")
	 * @ORM\JoinColumn(name="lang_id", referencedColumnName="id")
	 */
	protected $lang;

	/**
	 * @ORM\Column(type="text")
	 */
	protected $description;

	/** 
	 * @ORM\Column(type="datetime")
	 */
	protected $created;

	public function __construct()
	{
		$this->description = "";
		$this->created = new DateTime(); 
	}

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
	 * Set text
	 *
	 * @param string $text
	 *
	 * @return Sound
	 */
	public function setText($text)
	{
		$this->text = $text;

		return $this;
	}

	/**
	 * Get text
	 *
	 * @return string
	 */
	public function getText()
	{
		return $this->text;
	}

	/**
	 * Set user
	 *
	 * @param \AppBundle\Entity\User $user
	 *
	 * @return Sound
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

	/**
	 * Set description
	 *
	 * @param string $description
	 *
	 * @return Sound
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
	 * Set filename
	 *
	 * @param string $filename
	 *
	 * @return Sound
	 */
	public function setFilename($filename)
	{
		$this->filename = $filename;

		return $this;
	}

	/**
	 * Get filename
	 *
	 * @return string
	 */
	public function getFilename()
	{
		return $this->filename;
	}


	public function getVirtualFilename()
	{
		$text = $this->getText();
		$maxsize = 16;
		if (strlen($text) > $maxsize) {
			$text = substr($text, 0, $maxsize)."…";
		}
		return $this->getLang()->getCode()."-".$this->getSpeaker()->getName()."-".$text."-LL".$this->getId().".ogg";
	}

	/**
	 * Set lang
	 *
	 * @param string $lang
	 *
	 * @return Sound
	 */
	public function setLang($lang)
	{
		$this->lang = $lang;

		return $this;
	}

	/**
	 * Get lang
	 *
	 * @return string
	 */
	public function getLang()
	{
		return $this->lang;
	}

	/**
	 * Set created
	 *
	 * @param \DateTime $created
	 *
	 * @return Sound
	 */
	public function setCreated($created)
	{
		$this->created = $created;

		return $this;
	}

	/**
	 * Get created
	 *
	 * @return \DateTime
	 */
	public function getCreated()
	{
		return $this->created;
	}

	/**
	 * Set speaker
	 *
	 * @param \AppBundle\Entity\Speaker $speaker
	 *
	 * @return Sound
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

	public function editableBy($user)
	{
		return !$this->getUser() || $user && ($this->getUser()->getId() == $user->getId() || $user->getIsAdmin());
	}

	public function export()
	{
		return array(
			"text" => $this->getText(),
			"lang" => $this->getLang()->getCode(),
			"path" => $this->getVirtualFilename()
		);
	}
}
