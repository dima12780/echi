<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

class different
{
    public $score;

    public function __construct($variable){
        $this->score = [
            "money" => rand(0, 10000),
            "number" => "9601-".$this->random(4)."-".$this->random(4)
        ];
    }

    public function random($num)
    {
        if($num > 0)
        {
            return rand(0, 9).$this->random($num-1);
        }
    }


}