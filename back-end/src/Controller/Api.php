<?php
// src/Controller/Api.php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class Api
{
    /**
     * @Route("/api/saveOrUpdateLastDuration")
     */
    public function index(Request $request) {
        return new Response("Hi");
    }
}