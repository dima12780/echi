<?php

namespace App\Entity;

use App\Repository\HashRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=HashRepository::class)
 */
class Hash
{
    /**
     * @ORM\Id
     * @ORM\Column(type="string")
     */
    public $hash;

    /**
     * @ORM\Column(type="string")
     */
    public $creationTime;
    // private $updateTime;

    public function __construct($data)
    {
        $this->hash = $data;
        $this->update();
    }

    public function update()
    {
        $this->creationTime = date(DATE_ATOM, time());
    }

}
