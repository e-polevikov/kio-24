import React from 'react';
import ReactDOM from 'react-dom/client';

import { FoldingStage } from './components/FoldingStage/FoldingStage';

import { LEVEL1_SETTINGS } from './constants/Levels/Level1';
import { LEVEL2_SETTINGS } from './constants/Levels/Level2';
import { LEVEL3_SETTINGS } from './constants/Levels/Level3';

import { initializeParticles } from './services/ParticlesGenerator';

function getInitializedParticles(level) {
  let settings;

  if (level === 0) {
    settings = LEVEL1_SETTINGS;
  }

  if (level === 1) {
    settings = LEVEL2_SETTINGS;
  }

  if (level === 2) {
    settings = LEVEL3_SETTINGS;
  }

  return initializeParticles(
    settings.particlesColors,
    settings.particleRadius,
    settings.angles,
    settings.isSplitted
  );
}

function particlesMatchLevel(particles, level) {
  if (!particles) {
    return false;
  }

  if (
    level === 0 &&
    particles.length === LEVEL1_SETTINGS.particlesColors.length
  ) {
    return true;
  }

  if (
    level === 1 &&
    particles.length === LEVEL2_SETTINGS.particlesColors.length &&
    particles[particles.length - 1].color ===
    LEVEL2_SETTINGS.particlesColors[
      LEVEL2_SETTINGS.particlesColors.length - 1
    ]
  ) {
    return true;
  }

  if (
    level === 2 &&
    particles.length === LEVEL3_SETTINGS.particlesColors.length &&
    particles[particles.length - 1].color ===
    LEVEL3_SETTINGS.particlesColors[
      LEVEL3_SETTINGS.particlesColors.length - 1
    ]
  ) {
    return true;
  }

  return false;
}

export class Proteinfolding {
  constructor(settings) {
    this.settings = settings;

    if ("level" in settings) {
      const level = +settings.level;
      switch (level) {
        case 0:
          this.levelSettings = JSON.parse(JSON.stringify(LEVEL1_SETTINGS));
          break;
        case 1:
          this.levelSettings = JSON.parse(JSON.stringify(LEVEL2_SETTINGS));
          break;
        case 2:
          this.levelSettings = JSON.parse(JSON.stringify(LEVEL3_SETTINGS));
          break;
      }
    } else {
      console.warn("Уровень не выбран");
      this.levelSettings = JSON.parse(JSON.stringify(LEVEL1_SETTINGS));
    }
  }

  id = function () {
    return "proteinfolding";
  };

  initialize = function (domNode, kioapi) {
    try {
      this.kioapi = kioapi;
      this.domNode = domNode;
      this.stateRef = React.createRef();
      this.updateRootAndRender();
    } catch (e) {
      console.error(e);
    }
  };

  parameters = function () {
    return [{
      name: "energy",
      title: "Энергия взаимодействия",
      ordering: "minimize",
      view: function (value) {
        return value.toFixed(3);
      }
    }];
  };

  solution = function () {
    try {
      if (this.stateRef.current) {
        return { particles: this.stateRef.current.particles };
      } else {
        return { particles: this.initializedParticles }
      }
    } catch (e) {
      console.error(e);
    }
  };

  loadSolution = function (solution) {
    try {
      if (!solution) { return; }
      let level = +this.settings.level;
      let particles;

      if (level === undefined) {
        particles = getInitializedParticles(0);
      } else if (particlesMatchLevel(solution.particles, level)) {
        particles = solution.particles;
      } else {
        particles = getInitializedParticles(level);
      }

      this.initializedParticles = particles;
      this.updateRootAndRender();
    } catch (e) {
      console.error(e);
    }
  };

  updateRootAndRender = function() {
    if (this.root) {
      this.root.unmount();
    }

    this.root = ReactDOM.createRoot(this.domNode);
    this.root.render(
      <React.StrictMode>
        <FoldingStage
          settings={this.levelSettings}
          initializedParticles={this.initializedParticles}
          stateRef={this.stateRef}
          kioapi={this.kioapi}
        />
      </React.StrictMode>
    );
  };
}
