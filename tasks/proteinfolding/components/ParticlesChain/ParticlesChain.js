import React from 'react';
import { Circle, Line } from 'react-konva';

import {
  PARTICLE_COLORS,
  PARTICLE_SHADOW_MIDDLE,
  PARTICLE_SHADOW_SMALL
} from '../../constants/ParticlesChain';

function joinLinePoints(particles) {
  let points = [];

  particles.forEach(particle => {
    points.push(particle.x);
    points.push(particle.y);
  });

  return points;
}

function JoinLine({ particles, particleRadius, pivotParticleId }) {
  function getCircleRadius(particleId) {
    return particleId === pivotParticleId ?
      Math.floor(particleRadius / 5) :
      Math.floor(particleRadius / 8) ;
  }

  return (
    <>
      <Line
        points={joinLinePoints(particles)}
        stroke={'black'}
        strokeWidth={2}
      />
      {particles.map((particle) => (
        <Circle
          key={particle.id}
          id={particle.id}
          x={particle.x}
          y={particle.y}
          radius={getCircleRadius(Number(particle.id))}
          fill={'black'}
        />
      ))}
    </>
  );
}

export function ParticlesChain({
  particles,
  setParticles,
  pivotParticleId,
  setPivotParticleId,
  isSplitted,
  particleRadius,
  setEnergies,
  powers
}) {
  function handleParticleClick(particleId) {
    setPivotParticleId(Number(particleId));
  }

  const particlesChain =
    <>
      {particles.map((particle) => (
        <Circle
          key={particle.id}
          id={particle.id}
          x={particle.x}
          y={particle.y}
          radius={particleRadius}
          fill={PARTICLE_COLORS[particle.color]}
          stroke={'black'}
          strokeWidth={particle.id == pivotParticleId ? 5 : 2}
          onClick={() => handleParticleClick(particle.id)}
      />))}
      {particles.map((particle) => (
        <Circle
          key={particle.id}
          id={particle.id}
          x={particle.x + particleRadius * 0.15}
          y={particle.y - particleRadius * 0.15}
          radius={particleRadius * 0.75}
          fill={PARTICLE_SHADOW_MIDDLE[particle.color]}
          onClick={() => handleParticleClick(particle.id)}
      />))}
      {particles.map((particle) => (
        <Circle
          key={particle.id}
          id={particle.id}
          x={particle.x + particleRadius * 0.45}
          y={particle.y - particleRadius * 0.45}
          radius={particleRadius * 0.2}
          fill={PARTICLE_SHADOW_SMALL[particle.color]}
          onClick={() => handleParticleClick(particle.id)}
      />))}
    </>

  let joinLine;

  if (isSplitted) {
    let particles1 = particles.slice(
      0, Math.floor(particles.length / 2)
    );

    let particles2 = particles.slice(
      Math.floor(particles.length / 2), particles.length
    );

    joinLine = <>
      <JoinLine
        particles={particles1}
        particleRadius={particleRadius}
        pivotParticleId={pivotParticleId}
      />
      <JoinLine
        particles={particles2}
        particleRadius={particleRadius}
        pivotParticleId={pivotParticleId}
      />
    </>
  } else {
    joinLine = <JoinLine
      particles={particles}
      particleRadius={particleRadius}
      pivotParticleId={pivotParticleId}
    />
  }

  return (
    <>
      {particlesChain}
      {joinLine}
    </>
  );
}