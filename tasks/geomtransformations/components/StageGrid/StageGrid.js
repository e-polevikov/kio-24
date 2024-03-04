import React from 'react';
import { Line } from 'react-konva';

function generateGridPoints(stageWidth, stageHeight, gridIndent) {
  let gridPoints = [];
  let pointId = 0;

  for (let i = 0; i * gridIndent <= stageWidth; i++) {
    let points = {
      id: pointId,
      x1: i * gridIndent, y1: 0,
      x2: i * gridIndent, y2: stageWidth
    };

    gridPoints.push(points);
    pointId += 1;
  }

  for (let i = 1; i * gridIndent < stageHeight; i++) {
    let points = {
      id: pointId,
      x1: 0, y1: i * gridIndent,
      x2: stageWidth, y2: i * gridIndent
    };

    gridPoints.push(points);
    pointId += 1;
  }
  
  return gridPoints;
}

export function StageGrid({ stageWidth, stageHeight, gridIndent }) {
  const gridPoints = generateGridPoints(stageWidth, stageHeight, gridIndent);

  return (
    <>
      {gridPoints.map((points) => (
        <Line
          id={String(points.id)}
          key={String(points.id)}
          points={[points.x1, points.y1, points.x2, points.y2]}
          stroke={'grey'}
          strokeWidth={0.75}
        />
      ))}
    </>
  );
}
