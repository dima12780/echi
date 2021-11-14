<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\Scores;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use App\Repository\ScoresRepository;

class ScoresController extends AbstractController
{

    protected $repository;

    public function __construct(ManagerRegistry $registry, EntityManagerInterface $em)
    {
        $this->repository = new ScoresRepository($registry, $em);
    }

    /**
     * @Route("/scores", name="scores_search")
     */
    public function search(Request $request): JsonResponse
    {
        return new JsonResponse(
            $this->repository->search(),
            Response::HTTP_OK
        );
    }

    /**
     * @Route("/scores/{id}", methods={"GET"}, name="scores_searchOne")
     */
    public function searchOne(Request $request, $id): JsonResponse
    {
        return new JsonResponse(
            $this->repository->searchOne($id),
            Response::HTTP_OK
        );
    }

    /**
     * @Route("/scores", methods={"POST"}, name="scores_create")
     */
    public function create(Request $request)
    {
        $data = json_decode($request->getContent(), true)[0];
        $Scores = new Scores($data);
        $this->repository->save($Scores);
        return new JsonResponse(
            array('Saved new User with id ' => $Scores->getId()),
            Response::HTTP_CREATED
        );
    }
    
    // /**
    //  * @Route("/user/{id}", methods={"PUT"}, name="user_update")
    //  */
    // public function update(Request $request, $id)
    // {
    //     $data = json_decode($request->getContent(), true);
    //     $this->repository->update($id, $data);
    //     return new JsonResponse(
    //         null,
    //         Response::HTTP_NO_CONTENT
    //     );
    // }
    
    // /**
    //  * @Route("/user/{id}", methods={"DELETE"}, name="user_delete")
    //  */
    // public function delete($id)
    // {
    //     $this->repository->delete($id);
    //     return new JsonResponse(
    //         null,
    //         Response::HTTP_NO_CONTENT
    //     );
    // }
}
