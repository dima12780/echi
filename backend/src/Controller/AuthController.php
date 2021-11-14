<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\User;
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
     * @Route("/auth/login", methods={"GET"}, name="auth_login")
     */
    public function login(Request $request): JsonResponse
    {
        $data = $request->headers->all();
        return new JsonResponse(
            $this->repository->login($data),
            Response::HTTP_OK
        );
    }

    /**
     * @Route("/auth/logout", methods={"GET"}, name="auth_logout")
     */
    public function logout(Request $request): Response
    {
        $data = $request->headers->all();
        $this->repository->logout($data);
        return new Response(
            Response::HTTP_NO_CONTENT
        );
    }
}
