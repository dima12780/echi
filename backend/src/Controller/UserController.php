<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\User;
use App\Entity\different;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use App\Repository\UserRepository;

class UserController extends AbstractController
{
    protected $repository;

    public function __construct(ManagerRegistry $registry, EntityManagerInterface $em)
    {
        $this->repository = new UserRepository($registry, $em);
    }

    /**
     * @Route("/user", methods={"GET"}, name="user_search")
     */
    public function search(Request $request): JsonResponse
    {
        $data = $request->query->all();
        return new JsonResponse(
            !empty($data) ? $this->repository->findQuery($data) : $this->repository->search(),
            Response::HTTP_OK
        );
    }

    /**
     * @Route("/user/{id}", methods={"GET"}, name="user_searchOne")
     */
    public function searchOne(Request $request, $id): JsonResponse
    {
        $data = $request->headers->all();
        list($type, $hash) = explode(" ", $data['authorization'][0]);
        $entity = $this->repository->searchOne($id);
        $entity[0]->hash = $hash;
        return new JsonResponse(
            $entity,
            Response::HTTP_OK
        );
    }

    /**
     * @Route("/user", methods={"POST"}, name="user_create")
     */
    public function create(Request $request)
    {
        $data = json_decode($request->getContent(), true)[0];
        $User = new User($data);
        $this->repository->save($User);
        return new JsonResponse(
            array('Saved new User with id ' => $User->getId()),
            Response::HTTP_CREATED
        );
    }
    
    /**
     * @Route("/user/{id}", methods={"PUT"}, name="user_update")
     */
    public function update(Request $request, $id)
    {
        $data = json_decode($request->getContent(), true);
        $this->repository->update($id, $data);
        return new JsonResponse(
            null,
            Response::HTTP_NO_CONTENT
        );
    }
    
    /**
     * @Route("/user/{id}", methods={"DELETE"}, name="user_delete")
     */
    public function delete($id)
    {
        $this->repository->delete($id);
        return new JsonResponse(
            null,
            Response::HTTP_NO_CONTENT
        );
    }
    
}
