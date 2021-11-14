<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\Hash;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use App\Repository\HashRepository;

class HashController extends AbstractController
{
    protected $repository;

    public function __construct(ManagerRegistry $registry, EntityManagerInterface $em)
    {
        $this->repository = new HashRepository($registry, $em);
    }

    /**
     * @Route("/hash", methods={"GET"}, name="hash_allfind")
     */
    public function findAll(): JsonResponse
    {
        return new JsonResponse(
            $this->repository->findAll(),
            Response::HTTP_OK
        );
    }

    public function searchOne($hash)
    {
        return $this->repository->searchOne($hash);
    }

    public function create($data)
    {
        if($entity = $this->repository->searchOne($data))
        {
            $entity = $entity[0];
            $this->repository->upgrade($entity);
        }
        else
        {
            $entity = new Hash($data);
            $this->repository->save($entity);
        }
        return $entity->hash;
    }
}
