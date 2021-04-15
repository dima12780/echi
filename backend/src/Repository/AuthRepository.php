<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;

use App\DoctrineRepository;

class AuthRepository extends DoctrineRepository
{
    public function __construct(ManagerRegistry $registry, EntityManagerInterface $em)
    {
        parent::__construct($registry, $em, user::class);
    }

    public function authLogin($data)
    {
        if($data)
        { 
            $qb = $this->entityManager->createQueryBuilder();
            $query = $qb->select('u')
                ->from( user::class, 'u')
                ->where('u.isDeleted = false')
                ->andWhere('u.name = ?1')
                ->andWhere('u.password = ?2')
                ->setParameters(array(
                    1 => $data["name"],
                    2 => $data["pass"]
                ));
            return $query->getQuery()->execute();
        }else return [];
    }

}
