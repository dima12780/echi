<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;

use App\DoctrineRepository;

class UserRepository extends DoctrineRepository
{
    public function __construct(ManagerRegistry $registry, EntityManagerInterface $em)
    {
        parent::__construct($registry, $em, user::class);
    }

    public function findQuery($data)
    {
        $qb = $this->entityManager->createQueryBuilder();
        $name = $data["name"];
        $expr = $qb->expr();
        return $query = $qb->select('u') 
        ->from(user::class, 'u')
        ->where('u.isDeleted = false')
        ->andWhere(
            $expr->like($expr->lower('u.name'), $expr->lower(':name'))
        )
        ->setParameter('name', "%$name%")
        ->getQuery()
        ->execute();
    }
}
