<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Trackedtime
 *
 * @ORM\Table(name="trackedtime")
 * @ORM\Entity
 */
class Trackedtime
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description", type="text", length=65535, nullable=true)
     */
    private $description;

    /**
     * @var int
     *
     * @ORM\Column(name="duration", type="bigint", nullable=false)
     */
    private $duration = '0';

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="submitdate", type="date", nullable=true)
     */
    private $submitdate;


}
