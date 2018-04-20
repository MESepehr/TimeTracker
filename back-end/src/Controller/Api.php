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
     * @Route("/api/insertNewDuration")
     * @Method({"POST"})
     */
    public function insertNewDuration(Request $request) {
        try
        {
            $parsedRequest = json_decode($request->getContent());
            
            $newDuration = new Trackedtime();
            $newDuration->setDuration($parsedRequest->duration) ;
            
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($newDuration);
            $entityManager->flush();

            return new Response($newDuration->getId());
        }
        catch(Exception $e)
        {
            return new Response("0");
        }
    }

    /**
     * @Route("/api/getLastOpenedDuration")
     * @Method({"GET"})
     */
    public function getLastOpenedDuration()
    {
        $trackedTime = $this->getDoctrine()
            ->getRepository(Trackedtime::class)
            ->findBy(['submitdone' => '0']);

        if (!$trackedTime) {
            $response = new Response('null');
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }

        $response = new Response(json_encode($trackedTime[0]));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}