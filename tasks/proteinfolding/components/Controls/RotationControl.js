import React from 'react';
import { useState, useEffect } from 'react';

import {
  ROTATION_DIRECTIONS,
  ROTATION_TIMEOUT
} from '../../constants/RotationControl';

import {
  haveIntersections,
  chainIsOutOfStageBoundaries
} from '../../services/ParticlesValidator';

import { rotateParticles } from '../../services/ParticlesRotator';
import { calculateTotalEnergy } from '../../services/EnergyCalculator';

export function RotationControl({
  particles,
  setParticles,
  pivotParticleId,
  particleRadius,
  isSplitted,
  energies,
  setEnergies,
  powers,
  kioapi,
  stateRef
}) {
  const [rotationStarted, setRotationStarted] = useState(false);
  const [rotationDirection, setRotationDirection] = useState(null);
  const basePath = kioapi.basePath || ".";

  function handleParticlesRotation() {
    let rotatedParticles = rotateParticles(
      particles, pivotParticleId,
      rotationDirection, isSplitted
    );

    if (
      !haveIntersections(rotatedParticles, particleRadius, isSplitted) &&
      !chainIsOutOfStageBoundaries(rotatedParticles, particleRadius)
    ) {
      setParticles(rotatedParticles);

      let currentEnergy = calculateTotalEnergy(rotatedParticles, powers);

      setEnergies({
        initial: energies.initial,
        current: currentEnergy,
        minimal: Math.min(currentEnergy, energies.minimal)
      });
    }
  }

  useEffect(() => {
    if (rotationStarted) {
      setTimeout(() => {
        handleParticlesRotation();
      }, ROTATION_TIMEOUT);
    }
  });

  const buttons = ROTATION_DIRECTIONS.map((direction) => (
    <img
      key={direction.key}
      src={`${basePath}/proteinfolding-resources/${direction.imgTitle}`}
      style={{
        all: "revert",
        width: "45%",
        border: rotationStarted && direction.key === rotationDirection ? "4px solid gray" : "4px solid white",
      }}
      onMouseDown={() => {
        setRotationDirection(direction.key);
        setRotationStarted(true);
      }}
      onMouseUp={() => {
        setRotationStarted(false);
        stateRef.current = { particles: particles };
        kioapi.submitResult({ energy: energies.current });
      }}
    />
  ));

  return (
    <>
      {buttons}
    </>
  );
}
