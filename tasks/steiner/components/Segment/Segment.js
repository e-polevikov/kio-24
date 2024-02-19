import React from 'react';

import { Line, Circle } from 'react-konva';

export function Segment({ segment, gridIndent }) {
  if (!segment.visible) {
    return (
      <></>
    );
  }

  return (
    <>
      <Circle
        x={segment.x1}
        y={segment.y1}
        radius={gridIndent / 6}
        fill={'black'}
      />
      <Circle
        x={segment.x2}
        y={segment.y2}
        radius={gridIndent / 6}
        fill={'black'}
      />
      <Line
        points={[segment.x1, segment.y1, segment.x2, segment.y2]}
        stroke={'black'}
        strokeWidth={0.75}
      />
    </>
  );
}
