<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ORM\Table(name="`user`")
 */
class User
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    public $id;

    /**
     * @ORM\Column(type="string")
     */
    public $name;

    /**
     * @ORM\Column(type="string")
     */
    public $email;

    /**
     * @ORM\Column(type="string")
     */
    public $password;

    /**
     * @ORM\Column(type="array", nullable=true)
     */
    public $scores;

    /**
     * @ORM\Column(type="array", nullable=true)
     */
    public $friends;

    /**
     * @ORM\Column(type="array", nullable=true)
     */
    public $history;

    /**
     * @ORM\Column(type="boolean")
     */
    public $isDeleted;

    public $hash;

    public function __construct(array $data = array())
    {
        $this->isDeleted = false;
        $this->update($data);
    }

    public function update($data)
    {
        foreach ($data as $property => $value)
        {
            if($property === 'scores') $this->$property[] = $value;
            else $this->$property = $value;
        }
    }

    public function delete() {
        $this->isDeleted = true;
    }

}
