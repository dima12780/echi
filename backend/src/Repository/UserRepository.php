<?php

namespace App\Repository;

use App\Entity\User;
use App\Entity\Scores;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\ScoresRepository;
use App\DoctrineRepository;

class UserRepository extends DoctrineRepository
{
    protected $repository;

    public function __construct(ManagerRegistry $registry, EntityManagerInterface $em)
    {
        parent::__construct($registry, $em, user::class);
        $this->repository = new ScoresRepository($registry, $em);
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

    public function search($options = [])
    {
        $entity = $this->entityManager
        ->getRepository($this->class)
        ->findBy(array_merge(
            ['isDeleted' => false],
            $options
        ));
        if($entity[0]->scores)
        {
            foreach ($entity[0]->scores as $key => $value)
            {
                $scores[]  = $this->repository->findOneBy([ "id" => $value]);
            }
            $entity[0]->scores = $scores;
        }

        return $entity;
    }

    public function searchOne($id)
    {
        $entity = $this->search([ "id" => $id]);
        return ($entity && !$entity[0]->isDeleted) ? $entity : null;
    }

    public function update($id, $data)
    {
        var_dump($data);
        // die();
        if($data['scores'])
        {
            $data['scores'][0]["userId"] = $id;
            $scores = new Scores($data['scores'][0]);
            $this->repository->save($scores);
            $data['scores'] = $scores->id;
        }
        $criteria = [ "id" => $id, 'isDeleted' => false];
        $entity = $this->findOneBy($criteria);
        $entity->update($data);
        $this->entityManager->persist($entity);
        $this->entityManager->flush($entity);
    }
}
