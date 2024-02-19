import React from 'react';
import ReactDOM from 'react-dom/client';

import { GeomStage } from './components/GeomStage/GeomStage';

import { LEVEL1_SETTINGS } from './constants/Levels';
import { LEVEL2_SETTINGS } from './constants/Levels';
import { LEVEL3_SETTINGS } from './constants/Levels';

function getTree(level) {
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

  return JSON.parse(JSON.stringify(settings.initialTree));
}

function treeMatchLevel(tree, level) {
  if (!tree) {
    return false;
  }

  let numPredefinedPoints = tree.points.filter(
    (point) => point.predefined
  ).length

  if (
    level === 0 &&
    numPredefinedPoints === LEVEL1_SETTINGS.initialTree.points.length
  ) {
    return true;
  }

  if (
    level === 1 &&
    numPredefinedPoints === LEVEL2_SETTINGS.initialTree.points.length
  ) {
    return true;
  }

  if (
    level === 2 &&
    numPredefinedPoints === LEVEL3_SETTINGS.initialTree.points.length
  ) {
    return true;
  }

  return false;
}

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
    return [{
      name: "connected",
      title: "Соединены ли точки",
      ordering: "maximize",
      view: function (value) {
        return value ? "Да" : "Нет";
      },
    }, {
      name: "segmentsLength",
      title: "Сумма длин отрезков",
      ordering: "minimize",
      view: ""
    }];
  };

  solution = function () {
    try {
      console.log("solution()");
      return this.stateRef.current ?
        { tree: this.stateRef.current } :
        { tree: this.levelSettings.initialTree };
    } catch (e) {
      console.error(e);
    }
  };

  loadSolution = function (solution) {
    try {
      if (!solution) { return; }

      console.log("loadSolution()");
      
      let level = +this.settings.level;
      let tree;

      console.log(solution.tree);

      if (level === undefined) {
        tree = getTree(0);
      } else if (treeMatchLevel(solution.tree, level)) {
        tree = solution.tree;
      } else {
        tree = getTree(level);
      }

      console.log(level);
      console.log(tree);

      this.levelSettings.initialTree = tree;
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
