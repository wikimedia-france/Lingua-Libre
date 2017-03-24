<?php
namespace AppBundle\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="sounds")
 */

class Sound implements \JsonSerializable
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
	 * @ORM\Column(type="string")
	 */
	protected $text;

	/**
	 * @ORM\ManyToOne(targetEntity="Idiolect")
	 * @ORM\JoinColumn(name="idiolect_id", referencedColumnName="id")
	 */
	protected $idiolect;

	/**
	 * @ORM\Column(type="text")
	 */
	protected $description;

	/**
	 * @ORM\OneToMany(targetEntity="SoundComment", mappedBy="sound")
	 */
	protected $comments;

	/** 
	 * @ORM\Column(type="datetime")
	 */
	protected $created;

	public function __construct()
	{
		$this->description = "";
		$this->created = new DateTime(); 
		$this->comments = new \Doctrine\Common\Collections\ArrayCollection();
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
		$maxsize = 32;
		if (strlen($text) > $maxsize) {
			$text = substr($text, 0, $maxsize)."…";
		}
		return $this->getLang()->getCode()."-".$this->getSpeaker()->getName()."-".$text."-LL".$this->getId().".ogg";
	}

	/**
	 * Set idiolect
	 *
	 * @param string $idiolect
	 *
	 * @return Sound
	 */
	public function setIdiolect($idiolect)
	{
		$this->idiolect = $idiolect;

		return $this;
	}

	/**
	 * Get idiolect
	 *
	 * @return string
	 */
	public function getIdiolect()
	{
		return $this->idiolect;
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

	public function editableBy($user)
	{
		return !$this->getUser() || $user && ($this->getUser()->getId() == $user->getId() || $user->getIsAdmin());
	}
	
	/**
	 * Add comment
	 *
	 * @param \AppBundle\Entity\SoundComment $comment
	 *
	 * @return Sound
	 */
	public function addComment(\AppBundle\Entity\SoundComment $comment)
	{
		$this->comments[] = $comment;

		return $this;
	}

	/**
	 * Remove comment
	 *
	 * @param \AppBundle\Entity\SoundComment $comment
	 */
	public function removeComment(\AppBundle\Entity\SoundComment $comment)
	{
		$this->comments->removeElement($comment);
	}

	/**
	 * Get comments
	 *
	 * @return \Doctrine\Common\Collections\Collection
	 */
	public function getComments()
	{
		return $this->comments;
	}

	public function getDefaultComment()
	{
		return count($this->comments) > 0 ? $this->comments[0] : false;
	}
	
	public function export()
	{
		return array(
			"id" => $this->getId(),
			"text" => $this->getText(),
			"idiolect" => $this->getIdiolect(),
			//"ogg" => $this->getVirtualFilename(),
			"filename" => $this->getFilename()
		);
	}
	
	public function jsonSerialize()
	{
		return $this->export();
	}
}
