import React from 'react';
import { Line } from 'react-konva';

export function FigureImage({ points }) {
  return (
    <>
      <Line
        points={points}
        stroke={'black'}
        dash={[6, 3]}
        strokeWidth={1.5}
        closed={true}
      />
    </>
  );
}
