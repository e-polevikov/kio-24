import React from 'react';
import { useState } from 'react';
import { Stage, Layer } from 'react-konva';

import { STAGE_WIDTH, STAGE_HEIGHT } from '../../constants/FoldingStage';

import { ParticlesChain } from '../ParticlesChain/ParticlesChain';
import { RotationControl } from '../Controls/RotationControl';
import { MovementControl } from '../Controls/MovementControl';
import { PowersTable } from '../PowersTable/PowersTable';
import { MoveAllCheckbox } from '../MoveAllCheckbox/MoveAllCheckbox';

import { calculateTotalEnergy } from '../../services/EnergyCalculator';
import { initializeParticles } from '../../services/ParticlesGenerator';

import styles from './FoldingStage.module.css';

export function FoldingStage({
  settings,
  initializedParticles,
  stateRef,
  kioapi
}) {
  const [moveAll, setMoveAll] = useState(!settings.isSplitted);
  const [pivotParticleId, setPivotParticleId] = useState(
    Math.floor(settings.particlesColors.length / (settings.isSplitted ? 4 : 2))
  );

  const [particles, setParticles] = useState(
    initializedParticles ? initializedParticles :
    initializeParticles(
      settings.particlesColors,
      settings.particleRadius,
      settings.angles,
      settings.isSplitted
  ));

  let energy = calculateTotalEnergy(
    particles, settings.powers
  );

  const [energies, setEnergies] = useState(
    { initial: energy, current: energy, minimal: energy }
  );

  stateRef.current = { particles: particles };
  kioapi.submitResult({ energy: energy });

  return (
    <div className={styles['folding-stage']}>
      <div className={styles['params-panel']}>
        <PowersTable powers={settings.powers}/>
        <div className={styles['controls-panel']}>
          <RotationControl
            particles={particles}
            setParticles={setParticles}
            pivotParticleId={pivotParticleId}
            particleRadius={settings.particleRadius}
            isSplitted={settings.isSplitted}
            energies={energies}
            setEnergies={setEnergies}
            powers={settings.powers}
            kioapi={kioapi}
            stateRef={stateRef}
          />
          <br></br>
          <MovementControl
            particles={particles}
            setParticles={setParticles}
            pivotParticleId={pivotParticleId}
            particleRadius={settings.particleRadius}
            isSplitted={settings.isSplitted}
            moveAll={moveAll}
            energies={energies}
            setEnergies={setEnergies}
            powers={settings.powers}
            kioapi={kioapi}
            stateRef={stateRef}
          />
        </div>
        { settings.isSplitted ?
          <MoveAllCheckbox setMoveAll={setMoveAll} /> :
          <></>
        }
      </div>

      <div className={styles['stage']}>
        <Stage width={STAGE_WIDTH} height={STAGE_HEIGHT}>
          <Layer>
            <ParticlesChain
              particles={particles}
              setParticles={setParticles}
              pivotParticleId={pivotParticleId}
              setPivotParticleId={setPivotParticleId}
              isSplitted={settings.isSplitted}
              particleRadius={settings.particleRadius}
              setEnergies={setEnergies}
              powers={settings.powers}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
