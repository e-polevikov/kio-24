import { ACTIONS } from "../constants/Actions";
import { TRANSFORMATIONS } from "../constants/Transformations";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../constants/GeomStage";

import {
  reflectPoints,
  rotatePoints,
  figureIsOutOfStageBoundaries
} from "../services/GeomTransformations";

export function figureImageReducer(figureImage, action) {
  let figure = action.states.figures[action.states.selectedFigureId - 1];
  let points = figure.points[figure.stateIdx];

  if (action.type === ACTIONS.APPLY) {
    points = figureImage.points;

    if (figureIsOutOfStageBoundaries(
      points, 1.0 * STAGE_WIDTH, STAGE_HEIGHT
    )) {
      return figureImage;
    }
  }

  if (action.type === ACTIONS.UNDO) {
    if (figure.stateIdx === 0) {
      return figureImage;
    }

    points = figure.points[figure.stateIdx - 1];
  }

  if (action.type === ACTIONS.REDO) {
    if (figure.stateIdx === figure.points.length - 1) {
      return figureImage;
    }

    points = figure.points[figure.stateIdx + 1];
  }

  if (action.states.transformation === TRANSFORMATIONS.REFLECT) {
    points = reflectPoints(points, action.states.linePoints);
  } else {
    let clockwise = (action.states.transformation === TRANSFORMATIONS.ROTATE_CLOCKWISE);
    points = rotatePoints(points, action.states.anglePoints, clockwise);
  }

  return { points: points };
}
