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

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getDuration(): ?int
    {
        return $this->duration;
    }

    public function setDuration(int $duration): self
    {
        $this->duration = $duration;

        return $this;
    }

    public function getSubmitdate(): ?\DateTimeInterface
    {
        return $this->submitdate;
    }

    public function setSubmitdate(?\DateTimeInterface $submitdate): self
    {
        $this->submitdate = $submitdate;

        return $this;
    }


}
