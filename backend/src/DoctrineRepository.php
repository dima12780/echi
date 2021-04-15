<?php

namespace App;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;

use App\Entity\User;

class DoctrineRepository extends ServiceEntityRepository
{

    protected $entityManager;
    protected $class;

    function __construct(ManagerRegistry $registry, EntityManagerInterface $entityManager, $EntityName = "")
    {
        parent::__construct($registry, $EntityName);
        $this->class = $EntityName;
        $this->entityManager = $entityManager;
    }

    public function search($options = [])
    {
        $entity = $this->entityManager
        ->getRepository($this->class)
        ->findBy(array_merge(
            ['isDeleted' => false],
            $options
        ));
        return $entity;
    }

    public function searchOne($id)
    {
        $entity = $this->search([ "id" => $id]);
        return ($entity && !$entity[0]->isDeleted) ? $entity : null;
    }

    public function save($entity)
    {
        $this->entityManager->persist($entity);
        $this->entityManager->flush($entity);
    }

    public function update($id, $data)
    {
        $entity = $this->searchOne($id)[0];
        $entity->update($data);
        $this->entityManager->persist($entity);
        $this->entityManager->flush($entity);
        
    }

    public function delete($id)
    {
        $entity = $this->searchOne($id);
        $entity->delete();
        $this->entityManager->flush($entity);
    }

}