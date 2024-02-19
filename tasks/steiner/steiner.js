import React from 'react';
import ReactDOM from 'react-dom/client';

import { GeomStage } from './components/GeomStage/GeomStage';

import { LEVEL1_SETTINGS } from './constants/Levels';
import { LEVEL2_SETTINGS } from './constants/Levels';
import { LEVEL3_SETTINGS } from './constants/Levels';

export class Steiner {
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
    return "steiner";
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
    return [];
    /*
    return [{
      name: "cost",
      title: "Количество преобразований",
      ordering: "minimize",
      view: "",
    }, {
      name: "pathsLength",
      title: "Сумма длин путей",
      ordering: "minimize",
      view: ""
    }]; */
  };

  solution = function () {
    try {
      return this.stateRef.current ?
        { } :
        { };
    } catch (e) {
      console.error(e);
    }
  };

  loadSolution = function (solution) {
    try {  
      if (!solution) { return; }
      /*
      let level = +this.settings.level;
      let figures;

      if (solution.figures.length === level + 2) {
        figures = solution.figures;
      } else if (!level) { // undefined or 0th level
        figures = JSON.parse(JSON.stringify(LEVEL1.figures));
      } else if (level === 1) {
        figures = JSON.parse(JSON.stringify(LEVEL2.figures));
      } else if (level === 2) {
        figures = JSON.parse(JSON.stringify(LEVEL3.figures));
      }
      */

      this.levelSettings.initialTree = JSON.parse(JSON.stringify(LEVEL1_SETTINGS.initialTree));
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
        <GeomStage
          settings={this.levelSettings}
          stateRef={this.stateRef}
          kioapi={this.kioapi}
        />
      </React.StrictMode>
    );
  };
}
