import React from 'react';

import { Circle, Line } from 'react-konva';

export function Tree({ tree, treeDispath, setSegment, gridIndent }) {
  function handleCircleClick(event) {
    let x = event.target.x();
    let y = event.target.y();

    setSegment({
      x1: x, y1: y,
      x2: x, y2: y,
      visible: true
    });
  }

  function handleCircleDblClick(event) {
    treeDispath({
      type: "REMOVE_POINT",
      pointId: Number(event.target.id())
    });
  }

  function handleLineDblClick(event) {
    treeDispath({
      type: "REMOVE_SEGMENT",
      segmentId: Number(event.target.id())
    });
  }

  return (
    <>
      {tree.segments.map((segment, segmentId) => (
        <Line
          id={String(segmentId)}
          key={String(segmentId)}
          points={[
            segment.x1 * gridIndent, segment.y1 * gridIndent,
            segment.x2 * gridIndent, segment.y2 * gridIndent
          ]}
          stroke={'black'}
          strokeWidth={8}
          opacity={1}
          onDblClick={handleLineDblClick}
        />
      ))}
      {tree.points.map((point, pointId) => (
        <Circle
          id={String(pointId)}
          key={String(pointId)}
          x={point.x * gridIndent}
          y={point.y * gridIndent}
          radius={gridIndent / 3}
          fill={point.predefined ? '#2FD9FF' : '#ADADAD'}
          stroke={'black'}
          strokeWidth={4}
          onClick={handleCircleClick}
          onDblClick={handleCircleDblClick}
        />
      ))}
      {tree.points.map((point, pointId) => (
        <Circle
          id={String(pointId)}
          key={String(pointId)}
          x={point.x * gridIndent}
          y={point.y * gridIndent}
          radius={gridIndent / 5}
          fill={point.predefined ? '#00A4C9' : '#6D6D6D'}
          stroke={'black'}
          strokeWidth={2}
          onClick={handleCircleClick}
          onDblClick={handleCircleDblClick}
        />
      ))}
      {tree.points.map((point, pointId) => (
        <Circle
          id={String(pointId)}
          key={String(pointId)}
          x={point.x * gridIndent}
          y={point.y * gridIndent}
          radius={gridIndent / 10}
          fill={point.predefined ? '#2FD9FF' : '#ADADAD'}
          stroke={'black'}
          strokeWidth={2}
          onClick={handleCircleClick}
          onDblClick={handleCircleDblClick}
        />
      ))}
    </>
  );
}
