<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="comments")
 */

class Comment
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
	 * @ORM\ManyToOne(targetEntity="Sound")
	 * @ORM\JoinColumn(name="sound_id", referencedColumnName="id")
	 */
	protected $sound;

	/**
	 * @ORM\Column(type="text")
	 */
	protected $text;

	/** 
	 * @ORM\Column(type="datetime")
	 */
	protected $date;

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
	 * @return Comment
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
	 * Set date
	 *
	 * @param \DateTime $date
	 *
	 * @return Comment
	 */
	public function setDate($date)
	{
		$this->date = $date;

		return $this;
	}

	/**
	 * Get date
	 *
	 * @return \DateTime
	 */
	public function getDate()
	{
		return $this->date;
	}

	/**
	 * Set user
	 *
	 * @param \AppBundle\Entity\User $user
	 *
	 * @return Comment
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
	 * Set sound
	 *
	 * @param \AppBundle\Entity\Sound $sound
	 *
	 * @return Comment
	 */
	public function setSound(\AppBundle\Entity\Sound $sound = null)
	{
		$this->sound = $sound;

		return $this;
	}

	/**
	 * Get sound
	 *
	 * @return \AppBundle\Entity\Sound
	 */
	public function getSound()
	{
		return $this->sound;
	}
}
