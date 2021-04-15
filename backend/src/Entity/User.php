<?php

namespace App\Entity;

use App\Repository\UserRepository;
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
     * @ORM\Column(type="array")
     */
    public $scores;

    /**
     * @ORM\Column(type="array")
     */
    public $friends;

    /**
     * @ORM\Column(type="array")
     */
    public $history;

    /**
     * @ORM\Column(type="boolean")
     */
    public $isDeleted;

    public function __construct(array $data = array()){
        $different = new different("scores");
        $this->isDeleted = false;
        $this->password = $different->random(3);
        $this->scores = [$different->score];
        $this->update($data);
    }

    public function update($data) {
        foreach ($data as $property => $value) {
            $this->$property = $value;
        }
    }

    public function delete() {
        $this->isDeleted = true;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }
}
