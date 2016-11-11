<?php
namespace AppBundle\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Table(name="users")
 * @ORM\Entity(repositoryClass="AppBundle\Entity\UserRepository")
 * @UniqueEntity(fields={"username"}, message="This username is already used.")
 */

class User implements UserInterface
{
	/**
	 * @ORM\Column(type="integer")
	 * @ORM\Id
	 * @ORM\GeneratedValue(strategy="AUTO")
	 */
	private $id;

	/**
	 * @ORM\Column(type="string", length=25, unique=true)
	 * @Assert\NotBlank()
	 */
	private $username;

	/**
	 * @ORM\Column(type="string", length=64)
	 */
	private $password;

	/**
	 * @Assert\Length(max=4096)
	 */
	private $plainPassword;

	/**
	 * @ORM\Column(type="string", length=60)
	 * @Assert\NotBlank()
	 * @Assert\Email()
	 */
	private $email;

	/**
	 * @ORM\Column(name="is_active", type="boolean")
	 */
	private $isActive;

	/**
	 * @ORM\Column(name="is_admin", type="boolean")
	 */
	private $isAdmin;

	/**
	 * @ORM\Column(name="created", type="datetime")
	 */
	private $created;

	//----------

	/**
	 * @ORM\OneToMany(targetEntity="Speaker", mappedBy="user")
	 */
	private $speakers;

	/**
	 * @ORM\OneToMany(targetEntity="Sound", mappedBy="user")
	 */
	private $sounds;

	public function __construct()
	{
		$this->isActive = false;
		$this->isAdmin = false;
		$this->created = new DateTime();
	}

	public function getUsername()
	{
		return $this->username;
	}

	public function getSalt()
	{
		// you *may* need a real salt depending on your encoder
		// see section on salt below
		return null;
	}

	public function getPlainPassword()
	{
		return $this->plainPassword;
	}

	public function getPassword()
	{
		return $this->password;
	}

	public function getRoles()
	{
		$result = array('ROLE_USER');
		if ($this->getIsAdmin()) $result[] = "ROLE_ADMIN";
		return $result;
	}

	public function eraseCredentials()
	{
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
	 * Set username
	 *
	 * @param string $username
	 *
	 * @return User
	 */
	public function setUsername($username)
	{
		$this->username = $username;

		return $this;
	}

	/**
	 * Set plainPassword
	 *
	 * @param string $password
	 *
	 * @return User
	 */
	public function setPlainPassword($password)
	{
		$this->plainPassword = $password;

		return $this;
	}

	/**
	 * Set password
	 *
	 * @param string $password
	 *
	 * @return User
	 */
	public function setPassword($password)
	{
		$this->password = $password;

		return $this;
	}

	public function encodePassword($encoder)
	{
		$password = $encoder->encodePassword($this, $this->getPlainPassword());
		$this->setPassword($password);
	}

	/**
	 * Set email
	 *
	 * @param string $email
	 *
	 * @return User
	 */
	public function setEmail($email)
	{
		$this->email = $email;

		return $this;
	}

	/**
	 * Get email
	 *
	 * @return string
	 */
	public function getEmail()
	{
		return $this->email;
	}

	/**
	 * Set isActive
	 *
	 * @param boolean $isActive
	 *
	 * @return User
	 */
	public function setIsActive($isActive)
	{
		$this->isActive = $isActive;

		return $this;
	}

	/**
	 * Get isActive
	 *
	 * @return boolean
	 */
	public function getIsActive()
	{
		return $this->isActive;
	}

	/**
	 * Set isAdmin
	 *
	 * @param boolean $isAdmin
	 *
	 * @return User
	 */
	public function setIsAdmin($isAdmin)
	{
		$this->isAdmin = $isAdmin;

		return $this;
	}

	/**
	 * Get isAdmin
	 *
	 * @return boolean
	 */
	public function getIsAdmin()
	{
		return $this->isAdmin;
	}

	/**
	 * Set created
	 *
	 * @param \DateTime $created
	 *
	 * @return User
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
		return $user && ($user->getId() == $this->getId() || $user->getIsAdmin());
	}

    /**
     * Add speaker
     *
     * @param \AppBundle\Entity\Speaker $speaker
     *
     * @return User
     */
    public function addSpeaker(\AppBundle\Entity\Speaker $speaker)
    {
        $this->speakers[] = $speaker;

        return $this;
    }

    /**
     * Remove speaker
     *
     * @param \AppBundle\Entity\Speaker $speaker
     */
    public function removeSpeaker(\AppBundle\Entity\Speaker $speaker)
    {
        $this->speakers->removeElement($speaker);
    }

    /**
     * Get speakers
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSpeakers()
    {
        return $this->speakers;
    }

    /**
     * Add sound
     *
     * @param \AppBundle\Entity\Sound $sound
     *
     * @return User
     */
    public function addSound(\AppBundle\Entity\Sound $sound)
    {
        $this->sounds[] = $sound;

        return $this;
    }

    /**
     * Remove sound
     *
     * @param \AppBundle\Entity\Sound $sound
     */
    public function removeSound(\AppBundle\Entity\Sound $sound)
    {
        $this->sounds->removeElement($sound);
    }

    /**
     * Get sounds
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSounds()
    {
        return $this->sounds;
    }
}
