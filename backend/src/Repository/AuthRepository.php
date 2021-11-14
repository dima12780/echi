<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;
use App\Controller\HashController;
use App\DoctrineRepository;

class AuthRepository extends DoctrineRepository
{
    public $HashController;

    public function __construct(ManagerRegistry $registry, EntityManagerInterface $em)
    {
        $this->HashController = new HashController($registry, $em);
        parent::__construct($registry, $em, user::class);
    }

    public function login($data)
    {
        try
        {
            $auth = $data['authorization'][0];
            $name = $data["php-auth-user"][0];
            $pass = $data["php-auth-pw"][0];

            if($data)
            { 
                $qb = $this->entityManager->createQueryBuilder();
                $query = $qb->select('u')
                    ->from( user::class, 'u')
                    ->where('u.isDeleted = false')
                    ->andWhere('u.name = ?1')
                    ->andWhere('u.password = ?2')
                    ->setParameters(array(
                        1 => $name,
                        2 => $pass
                    ));
                    $result = $query->getQuery()->execute();
                    if($result)
                    { 
                        $result[0]->hash = $this->HashController->create( md5($auth) );
                    }
                return $result;
            }else return [];
        } catch (\Throwable $th) {
            return "Invalid login attempt";
        }
    }

    public function logout($data)
    {
        list($type, $hash) = explode(" ", $data['authorization'][0]);
        $entity = $this->HashController->searchOne($hash);
        $this->entityManager->remove($entity[0]);
        $this->entityManager->flush();
    }

}
