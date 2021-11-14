<?php

namespace App\Entity;

use App\Repository\ScoresRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ScoresRepository::class)
 */
class Scores
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    public $id;

    /**
     * @ORM\Column(type="integer")
     */
    public $userId;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    public $money;

    /**
     * @ORM\Column(type="string", length=255)
     */
    public $number;

    public function __construct($data)
    {
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

}
