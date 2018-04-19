<?php
// src/Controller/Api.php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use App\Entity\Trackedtime;

class Api extends Controller
{
    /**
     * @Route("/api/saveOrUpdateLastDuration")
     * @Method({"POST"})
     */
    public function index(Request $request) {
        try
        {
            $parsedRequest = json_decode($request->getContent());

            $entityManager = $this->getDoctrine()->getManager();
            $newDuration = new Trackedtime();
            $newDuration->setDuration($parsedRequest->duration) ;

            $entityManager->persist($newDuration);
            $entityManager->flush();

            return new Response("Hi ".json_encode($parsedRequest->duration));
        }
        catch(Exception $e)
        {
            return new Response("Error : {$e->getMessage()}");
        }
    }
}