<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\User;
// use App\Entity\different;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use App\Repository\AuthRepository;

class AuthController extends AbstractController
{
    protected $repository;

    public function __construct(ManagerRegistry $registry, EntityManagerInterface $em)
    {
        $this->repository = new AuthRepository($registry, $em);
    }
    /**
     * @Route("/auth", methods={"GET"}, name="auth")
     */
    public function authLogin(Request $request): JsonResponse
    {
        $data = $request->query->all();
        return new JsonResponse(
            $this->repository->authLogin($data),
            Response::HTTP_OK
        );
    }
}
