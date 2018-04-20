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

            return new Response("1");
        }
        catch(Exception $e)
        {
            return new Response("0");
        }
    }
}