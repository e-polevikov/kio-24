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
      <Line
        points={[segment.x1, segment.y1, segment.x2, segment.y2]}
        dash={[12, 2]}
        stroke={'black'}
        strokeWidth={3}
      />
      <Circle
        x={segment.x1}
        y={segment.y1}
        radius={gridIndent / 5}
        fill={'#6D6D6D'}
        stroke={'black'}
        strokeWidth={4}
      />
      <Circle
        x={segment.x2}
        y={segment.y2}
        radius={gridIndent / 5}
        fill={'#6D6D6D'}
        stroke={'black'}
        strokeWidth={4}
      />
      <Circle
        x={segment.x1}
        y={segment.y1}
        radius={gridIndent / 10}
        fill={'#ADADAD'}
        stroke={'black'}
        strokeWidth={2}
      />
      <Circle
        x={segment.x2}
        y={segment.y2}
        radius={gridIndent / 10}
        fill={'#ADADAD'}
        stroke={'black'}
        strokeWidth={2}
      />
    </>
  );
}
