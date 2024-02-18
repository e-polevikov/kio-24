import { ACTIONS } from "../constants/Actions";
import { TRANSFORMATIONS } from "../constants/Transformations";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../constants/GeomStage";

import {
  reflectPoints,
  rotatePoints,
  figureIsOutOfStageBoundaries
} from "../services/GeomTransformations";

function updateFigures(figures, updatedFigure) {
  let updatedFigures = figures.map((figure) => {
    if (figure.id === updatedFigure.id) {
      return updatedFigure;
    }

    return figure;
  });

  return updatedFigures;
}

export function figuresReducer(figures, action) {
  let updatedFigure = JSON.parse(JSON.stringify(
    figures[action.states.selectedFigureId - 1]
  ));

  if (action.type === ACTIONS.UNDO) {
    if (updatedFigure.stateIdx > 0) {
      updatedFigure.stateIdx -= 1;
    }

    return updateFigures(figures, updatedFigure);
  }

  if (action.type === ACTIONS.REDO) {
    if (updatedFigure.stateIdx < updatedFigure.points.length - 1) {
      updatedFigure.stateIdx += 1;
    }

    return updateFigures(figures, updatedFigure);
  }

  if (action.type !== ACTIONS.APPLY) {
    return updateFigures(figures, updatedFigure);
  }

  if (action.states.transformation === TRANSFORMATIONS.REFLECT) {
    let reflectedPoints = reflectPoints(
      updatedFigure.points[updatedFigure.stateIdx],
      action.states.linePoints
    );

    if (figureIsOutOfStageBoundaries(
      reflectedPoints, 1.5 * STAGE_WIDTH, STAGE_HEIGHT
    )) {
      return figures;
    }

    updatedFigure.points = updatedFigure.points.slice(
      0, updatedFigure.stateIdx + 1
    );

    updatedFigure.transformations = updatedFigure.transformations.slice(
      0, updatedFigure.stateIdx + 1
    );

    updatedFigure.points.push(reflectedPoints);
    updatedFigure.transformations.push(TRANSFORMATIONS.REFLECT);
    updatedFigure.stateIdx += 1;

    return updateFigures(figures, updatedFigure);
  }

  let clockwise = (action.states.transformation === TRANSFORMATIONS.ROTATE_CLOCKWISE);

  let rotatedPoints = rotatePoints(
    updatedFigure.points[updatedFigure.stateIdx],
    action.states.anglePoints,
    clockwise
  );

  if (figureIsOutOfStageBoundaries(
    rotatedPoints, 1.5 * STAGE_WIDTH, STAGE_HEIGHT
  )) {
    return figures;
  }

  updatedFigure.points = updatedFigure.points.slice(
    0, updatedFigure.stateIdx + 1
  );

  updatedFigure.transformations = updatedFigure.transformations.slice(
    0, updatedFigure.stateIdx + 1
  );

  updatedFigure.points.push(rotatedPoints);
  updatedFigure.transformations.push(TRANSFORMATIONS.ROTATE_CLOCKWISE);
  updatedFigure.stateIdx += 1;

  return updateFigures(figures, updatedFigure);
}
