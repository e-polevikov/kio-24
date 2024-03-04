import React from 'react';
import { useState, useReducer, useEffect } from 'react';
import { Stage, Layer } from 'react-konva';

import {
  STAGE_WIDTH,
  STAGE_HEIGHT,
  GRID_INDENT,
  LINE_POINTS,
  ANGLE_POINTS,
} from '../../constants/GeomStage';

import { TRANSFORMATIONS } from '../../constants/Transformations';

import { StageGrid } from '../StageGrid/StageGrid';
import { Line } from '../Line/Line';
import { Angle } from '../Angle/Angle';
import { ActionControl } from '../ActionControl/ActionControl';
import { Transformations } from '../Transformations/Transformations';
import { Figure } from '../Figure/Figure';
import { FigureImage } from '../Figure/FigureImage';

import { figuresReducer } from '../../hooks/FiguresReducer';
import { figureImageReducer } from '../../hooks/FigureImageReducer';

import { reflectPoints } from '../../services/GeomTransformations';
import { calcMetrics } from '../../services/GeomMetrics';

import styles from './GeomStage.module.css';

export function GeomStage({ settings, stateRef, kioapi }) {
  const [linePoints, setLinePoints] = useState(LINE_POINTS);
  const [anglePoints, setAnglePoints] = useState(ANGLE_POINTS);
  const [transformation, setTransformation] = useState(TRANSFORMATIONS.REFLECT);

  const [figures, figuresDispatch] = useReducer(figuresReducer, settings.figures);
  const [selectedFigureId, setSelectedFigureId] = useState(settings.figures[0].id);

  const [figureImage, figureImageDispatch] = useReducer(figureImageReducer, {
    points: reflectPoints(settings.figures[0].points[0], linePoints)
  });

  function handleAction(type, states) {
    let action = {
      type: type,
      states: {
        figures: figures,
        selectedFigureId: selectedFigureId,
        transformation: transformation,
        linePoints: linePoints,
        anglePoints: anglePoints
      }
    };

    if (states.transformation) {
      action.states.transformation = states.transformation;
    }

    if (states.linePoints) {
      action.states.linePoints = states.linePoints;
    }

    if (states.selectedFigureId) {
      action.states.selectedFigureId = states.selectedFigureId;
    }

    if (states.anglePoints) {
      action.states.anglePoints = states.anglePoints;
    }

    figuresDispatch(action);
    figureImageDispatch(action);
  }

  useEffect(() => {
    const states = {
      figures: figures,
      metrics: calcMetrics(
        figures, GRID_INDENT,
        settings.figuresArea,
        settings.minFiguresPerimeter
      )
    };

    stateRef.current = states;
    kioapi.submitResult(states.metrics);
  }, figures.map((figure) => figure.stateIdx));

  return (
    <div className={styles['geom-stage']}>
      <div className={styles['panel']}>
        <Transformations
          transformation={transformation}
          setTransformation={setTransformation}
          handleChange={handleAction}
          kioapi={kioapi}
        />
        <ActionControl
          handleClick={handleAction}
          kioapi={kioapi}
        />
      </div>

      <div className={styles['stage']}>
        <Stage width={STAGE_WIDTH} height={STAGE_HEIGHT}>
          <Layer>
            <StageGrid
              stageWidth={STAGE_WIDTH}
              stageHeight={STAGE_HEIGHT}
              gridIndent={GRID_INDENT}
            />
            <FigureImage
              points={figureImage.points}
            />
            {figures.map((figure) => (
              <Figure
                id={figure.id}
                key={figure.id}
                figureId={figure.id}
                selectedFigureId={selectedFigureId}
                setSelectedFigureId={setSelectedFigureId}
                points={figure.points.slice(0, figure.stateIdx + 1)}
                gridIndent={GRID_INDENT}
                fillColor={figure.color}
                handleClick={handleAction}
              />
            ))}
            <Angle
              anglePoints={anglePoints}
              setAnglePoints={setAnglePoints}
              isSelected={transformation !== TRANSFORMATIONS.REFLECT}
              handlePointMove={handleAction}
              stageWidth={STAGE_WIDTH}
              stageHeight={STAGE_HEIGHT}
              gridIndent={GRID_INDENT}
            />
            <Line
              linePoints={linePoints}
              setLinePoints={setLinePoints}
              isSelected={transformation === TRANSFORMATIONS.REFLECT}
              handlePointMove={handleAction}
              stageWidth={STAGE_WIDTH}
              stageHeight={STAGE_HEIGHT}
              gridIndent={GRID_INDENT}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
