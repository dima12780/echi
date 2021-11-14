<?php

namespace App\Repository;

use App\Entity\Hash;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;
use App\DoctrineRepository;

/**
 * @method Hash|null find($id, $lockMode = null, $lockVersion = null)
 * @method Hash|null findOneBy(array $criteria, array $orderBy = null)
 * @method Hash[]    findAll()
 * @method Hash[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class HashRepository extends DoctrineRepository
{
    public function __construct(ManagerRegistry $registry, EntityManagerInterface $em)
    {
        parent::__construct($registry, $em, Hash::class);
    }

    public function search($options = [])
    {
        $entity = $this->entityManager
        ->getRepository($this->class)
        ->findAll();
        return $entity;
    }

    public function searchOne($options = [])
    {
        $entity = $this->entityManager
        ->getRepository($this->class)
        ->findBy(array_merge(
            [ 'hash' => $options]
        ));
        return $entity;
    }

    public function upgrade($entity)
    {
        $entity->update();
        $this->entityManager->persist($entity);
        $this->entityManager->flush($entity);
    }
}
