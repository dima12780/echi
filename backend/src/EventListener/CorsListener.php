<?php

namespace App\EventListener;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\Event\ControllerEvent;
use Symfony\Component\HttpKernel\KernelEvents;

use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;
use App\Controller\HashController;

final class CorsListener implements EventSubscriberInterface
{
    public $HashController;

    public function __construct(ManagerRegistry $registry, EntityManagerInterface $em)
    {
        $this->HashController = new HashController($registry, $em);
    }

    public static function getSubscribedEvents(): array
    {
        // Вызывается при новом подключении
        return [
            KernelEvents::REQUEST => 'onKernelRequest',
            KernelEvents::RESPONSE => 'onKernelResponse',
            // KernelEvents::CONTROLLER => 'onKernelController',
            KernelEvents::EXCEPTION => 'onKernelException',
        ];
    }

    public $result;

    public function onKernelController(ControllerEvent $event)
    {
        $this->result = new JsonResponse( 
            $event->getRequest()->attributes->all(),
            Response::HTTP_OK
        );
    }

    public function onKernelRequest(RequestEvent $event): void // Запрос
    {
        $auth = $event->getRequest()->headers->all();
        $route = $event->getRequest()->attributes->all();
        if (isset($route["_route"]))
        {
            list($entity, $action) = explode("_", $route['_route']);
            if (!($action === 'create') && !isset($auth['authorization']))
            {
                $this->onAuthorized($event, 1);
            } 
            if(isset($auth['authorization']))
            {
                list($type, $data) = explode(" ", $auth['authorization'][0]);
                if($type === "Bearer" && !$this->HashController->searchOne($data))
                {
                    $this->onAuthorized($event, 2);
                }
                elseif($type === "Basic" && $entity !== "auth")
                {
                    $this->onAuthorized($event, 3);
                }
            }
        }
    }

    public function onAuthorized(RequestEvent $event, $code): void
    {
        switch ($code) {
            case 1:
                $message = "Not authorized";
                break;
            case 2:
                $message = "Wrong hash";
                break;
            case 3:
                $message = "Wrong authorized";
                break;
            default:
                $message = "unknown";
                break;
        }
        $error = "Error code: $message";

        $event->setResponse(new JsonResponse( 
            $error,
            Response::HTTP_UNAUTHORIZED
            ));
    }

    public function onKernelResponse(ResponseEvent $event): void // Ответ
    {
        if(isset($this->result)){
            $event->setResponse($this->result);
        }
    }

    public function onKernelException(ExceptionEvent $event): void // Ошибка|Исключение
    {
        // $event->setResponse(new JsonResponse( 
        //     "your actions caused an error!",
        //     Response::HTTP_BAD_REQUEST
        //     ));
    }
}