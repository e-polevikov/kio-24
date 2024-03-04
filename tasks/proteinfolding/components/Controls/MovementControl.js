import React from 'react';
import { useState, useEffect } from 'react';

import {
  MOVEMENT_DIRECTIONS,
  MOVE_TIMEOUT
} from '../../constants/MovementControl';

import {
  haveIntersections,
  chainIsOutOfStageBoundaries
} from '../../services/ParticlesValidator';

import { moveParticles } from '../../services/ParticlesMover';
import { calculateTotalEnergy } from '../../services/EnergyCalculator';

export function MovementControl({
  particles,
  setParticles,
  pivotParticleId,
  particleRadius,
  isSplitted,
  moveAll,
  energies,
  setEnergies,
  powers,
  kioapi,
  stateRef
}) {
  const [movementStarted, setMovementStarted] = useState(false);
  const [movementDirection, setMovementDirection] = useState(null);
  const basePath = kioapi.basePath || ".";

  function handleParticlesMovement() {
    let movedParticles = moveParticles(
      particles, movementDirection,
      pivotParticleId, !moveAll
    );

    if (!haveIntersections(movedParticles, particleRadius, isSplitted) &&
      !chainIsOutOfStageBoundaries(movedParticles, particleRadius)
    ) {
      setParticles(movedParticles);

      let currentEnergy = calculateTotalEnergy(movedParticles, powers);

      setEnergies({
        initial: energies.initial,
        current: currentEnergy,
        minimal: Math.min(currentEnergy, energies.minimal)
      });
    }
  }

  useEffect(() => {
    if (movementStarted) {
      setTimeout(() => {
        handleParticlesMovement();
      }, MOVE_TIMEOUT);
    }
  });

  const buttons = MOVEMENT_DIRECTIONS.map((direction) => (
    <img
      key={direction.key}
      src={`${basePath}/proteinfolding-resources/${direction.imgTitle}`}
      style={{
        all: "revert",
        width: "20%",
        border: movementStarted && direction.key === movementDirection ? "4px solid gray" : "4px solid white",
        margin: "2px"
      }}
      onMouseDown={() => {
        setMovementDirection(direction.key);
        setMovementStarted(true);
      }}
      onMouseUp={() => {
        setMovementStarted(false);
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
