import React from 'react';
import { Circle, Text, Line as KonvaLine } from 'react-konva';
import { useState } from 'react';

import { ACTIONS } from '../../constants/Actions';

function getKonvaLinePoints(linePoints, stageWidth, stageHeight) {
  let x1 = linePoints[0].x;
  let y1 = linePoints[0].y;
  let x2 = linePoints[1].x;
  let y2 = linePoints[1].y;

  if (y2 === y1) {
    return [0, y1, stageWidth, y2];
  }

  let k = (x2 - x1) / (y2 - y1);
  
  return [
    (0 - y1) * k + x1, 0,
    (stageHeight - y1) * k + x1, stageHeight,
  ];
}

export function Line({
  linePoints,
  setLinePoints,
  isSelected,
  handlePointMove,
  stageWidth,
  stageHeight,
  gridIndent
}) {
  const [konvaLinePoints, setKonvaLinePoints] = useState(
    getKonvaLinePoints(linePoints, stageWidth, stageHeight)
  );

  const [labelPoints, setLabelPoints] = useState([{
    x: linePoints[0].x,
    y: linePoints[0].y
  }, {
    x: linePoints[1].x,
    y: linePoints[1].y
  }]);

  function handleDragStart(event) {
    let newLinePoints = linePoints.map((point) => {
      if (point.id === event.target.id()) {
        return {
          ...point,
          isDragging: true
        }
      }

      return point;
    });

    setLinePoints(newLinePoints);
  }

  function handleDragEnd(event) {
    let dragEndX = event.target.x();
    let dragEndY = event.target.y();
    let pointId = Number(event.target.id());

    let finalX = linePoints[pointId].x;
    let finalY = linePoints[pointId].y;

    if (dragEndX >= 0 && dragEndX <= stageWidth &&
        dragEndY >= 0 && dragEndY <= stageHeight
    ) {
      finalX = Math.round(dragEndX / gridIndent) * gridIndent;
      finalY = Math.round(dragEndY / gridIndent) * gridIndent;

      let sndPointId = (pointId + 1) % 2;

      if (finalX === linePoints[sndPointId].x && finalY === linePoints[sndPointId].y) {
        finalX = linePoints[pointId].x;
        finalY = linePoints[pointId].y;
      }
    }

    event.target.x(finalX);
    event.target.y(finalY);

    let newLinePoints = linePoints.map((point) => {
      if (point.id === event.target.id()) {
        return {
          id: point.id,
          x: finalX,
          y: finalY,
          isDragging: false
        }
      }

      return point;
    });

    setLinePoints(newLinePoints);

    setKonvaLinePoints(
      getKonvaLinePoints(newLinePoints, stageWidth, stageHeight)
    );

    setLabelPoints(newLinePoints);

    handlePointMove(ACTIONS.MOVE_LINE_POINT, {linePoints: newLinePoints});
  }

  function handleDragMove(event) {
    let x = event.target.x();
    let y = event.target.y();
    let pointId = Number(event.target.id());

    x = Math.round(x / gridIndent) * gridIndent;
    y = Math.round(y / gridIndent) * gridIndent;

    let sndPointId = (pointId + 1) % 2;

    if (x === linePoints[sndPointId].x && y === linePoints[sndPointId].y) {
      x = linePoints[pointId].x;
      y = linePoints[pointId].y;
    }

    event.target.x(x);
    event.target.y(y);

    let updatedLinePoints = JSON.parse(JSON.stringify(linePoints));

    updatedLinePoints[pointId].x = x;
    updatedLinePoints[pointId].y = y;

    setKonvaLinePoints(
      getKonvaLinePoints(updatedLinePoints, stageWidth, stageHeight)
    );

    setLabelPoints(updatedLinePoints);

    handlePointMove(ACTIONS.MOVE_LINE_POINT, {linePoints: updatedLinePoints});
  }

  return (
    <>
      <Text
        x={labelPoints[0].x - 0.5 * gridIndent}
        y={labelPoints[0].y - 0.5 * gridIndent}
        text={'D'}
        fontSize={20}
      />
      <Text
        x={labelPoints[1].x - 0.5 * gridIndent}
        y={labelPoints[1].y - 0.5 * gridIndent}
        text={'E'}
        fontSize={20}
      />
      <KonvaLine
        id={"0"}
        key={"0"}
        points={konvaLinePoints}
        stroke={'black'}
        strokeWidth={isSelected ? 4.0 : 2.0}
      />
      {linePoints.map((point) => (
        <Circle
          id={point.id}
          key={point.id}
          x={point.x}
          y={point.y}
          radius={gridIndent / 5}
          fill={'black'}
          stroke={point.isDragging ? 'blue' : null}
          strokeWidth={3}
          draggable
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
        />
      ))}
    </>
  );
}
