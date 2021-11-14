<?php

namespace App\Repository;

use App\Entity\Scores;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;
use App\DoctrineRepository;

/**
 * @method Scores|null find($id, $lockMode = null, $lockVersion = null)
 * @method Scores|null findOneBy(array $criteria, array $orderBy = null)
 * @method Scores[]    findAll()
 * @method Scores[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ScoresRepository extends DoctrineRepository
{
    public function __construct(ManagerRegistry $registry, EntityManagerInterface $em)
    {
        parent::__construct($registry, $em, Scores::class);
    }

    public function search($options = [])
    {
        $entity = $this->entityManager
        ->getRepository($this->class)
        ->findBy(array_merge(
            $options
        ));
        return $entity;
    }

    public function searchOne($id)
    {
        return $this->search([ "id" => $id]);
    }

}
