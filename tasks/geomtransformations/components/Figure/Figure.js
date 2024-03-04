import React from 'react';
import { Line, Circle } from 'react-konva';

import { ACTIONS } from '../../constants/Actions';

import { getCentroidCoordinates } from '../../services/GeomMetrics';

export function Figure({
  figureId,
  selectedFigureId,
  setSelectedFigureId,
  points,
  gridIndent,
  fillColor,
  handleClick,
}) {
  let centroids = points.flatMap((pts) => {
    return getCentroidCoordinates(pts);
  });

  return (
    <>
      <Line
        points={points[points.length - 1]}
        stroke={'black'}
        fill={fillColor}
        opacity={0.5}
        strokeWidth={figureId === selectedFigureId ? 5.0 : 2.5}
        closed={true}
        onClick={() => {
          setSelectedFigureId(figureId);
          handleClick(ACTIONS.SELECT_FIGURE, {selectedFigureId: figureId});
        }}
      />
      <Line
        points={centroids}
        stroke={fillColor}
        dash={[6, 3]}
        strokeWidth={1.0}
      />
      <Circle
        x={centroids[0]}
        y={centroids[1]}
        radius={gridIndent / 10}
        fill={'white'}
        stroke={'black'}
      />
      <Circle
        x={centroids[centroids.length - 2]}
        y={centroids[centroids.length - 1]}
        radius={gridIndent / 10}
        fill={'white'}
        stroke={'black'}
      />
    </>
  );
}
