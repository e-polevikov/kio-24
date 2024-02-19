import React from 'react';
import ReactDOM from 'react-dom/client';

import { GeomStage } from './components/GeomStage/GeomStage';

import { LEVEL1 } from './constants/Level1';
import { LEVEL2 } from './constants/Level2';
import { LEVEL3 } from './constants/Level3';

export class Geomtransformations {
  constructor(settings) {
    this.settings = settings;

    if ("level" in settings) {
      const level = +settings.level;
      switch (level) {
        case 0:
          this.levelSettings = JSON.parse(JSON.stringify(LEVEL1));
          break;
        case 1:
          this.levelSettings = JSON.parse(JSON.stringify(LEVEL2));
          break;
        case 2:
          this.levelSettings = JSON.parse(JSON.stringify(LEVEL3));
          break;
      }
    } else {
      console.warn("Уровень не выбран");
      this.levelSettings = JSON.parse(JSON.stringify(LEVEL1));
    }
  }

  id = function () {
    return "geomtransformations";
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
      name: "similarity",
      title: "Похожесть",
      ordering: "maximize",
      view: ""
    }, {
      name: "cost",
      title: "Количество преобразований",
      ordering: "minimize",
      view: "",
    }, {
      name: "pathsLength",
      title: "Сумма длин путей",
      ordering: "minimize",
      view: ""
    }];
  };

  solution = function () {
    try {
      return this.stateRef.current ?
        { figures: this.stateRef.current.figures } :
        { figures: this.levelSettings.figures };
    } catch (e) {
      console.error(e);
    }
  };

  loadSolution = function (solution) {
    try {  
      if (!solution) { return; }
      this.levelSettings.figures = solution.figures;
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
