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
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        try
        {
            $parsedRequest = json_decode($request->getContent());
            
            $newDuration = new Trackedtime();
            $newDuration->setDuration($parsedRequest->duration) ;
            
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($newDuration);
            $entityManager->flush();

            $response->setContent($newDuration->getId());
        }
        catch(Exception $e)
        {
            $response->setContent("0");
        }
        return $response;
    }

    private static $headers ;
    /**
     * @Route("/api/getLastOpenedDuration")
     * @Method({"GET"})
     */
    public function getLastOpenedDuration()
    {
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $trackedTime = $this->getDoctrine()
            ->getRepository(Trackedtime::class)
            ->findBy(['submitdone' => '0']);

        if (!$trackedTime) {
            $response->setContent('null');
            return $response;
        }
        $response->setContent(json_encode($trackedTime[0]));
        return $response;
    }


}