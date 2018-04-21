<?php
// src/Controller/DefaultController.php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{

    /**
     * @Route("/")
     */
    public function home() {
        $response = new Response();
        $response->headers->set('Access-Control-Allow-Origin', '*');

      
        $response->setContent("Hello home");
        return $response;
    }
}