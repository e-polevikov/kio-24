import React from 'react';

import { useState, useReducer, useEffect } from 'react';
import { Stage, Layer } from 'react-konva';

import { StageGrid } from '../StageGrid/StageGrid';
import { Tree } from '../Tree/Tree';
import { Segment } from '../Segment/Segment';

import { treeReducer } from '../../hooks/TreeReducer';
import { getTotalLength, connected } from '../../services/Segments';

import styles from './GeomStage.module.css';

export function GeomStage({ settings, stateRef, kioapi }) {
  const STAGE_WIDTH = 1920;
  const GRID_INDENT = STAGE_WIDTH / settings.gridSize.width;
  const STAGE_HEIGHT = GRID_INDENT * settings.gridSize.height;

  const [tree, treeDispatch] = useReducer(treeReducer, settings.initialTree);
  const [segment, setSegment] = useState({ visible: false });

  function handleMouseMove(event) {
    if (!segment.visible) { return; }

    const stage = event.target.getStage();
    const pointer = stage.getPointerPosition();

    let x = Math.round(pointer.x / GRID_INDENT) * GRID_INDENT;
    let y = Math.round(pointer.y / GRID_INDENT) * GRID_INDENT;

    let xDist = Math.abs(x - segment.x2);
    let yDist = Math.abs(y - segment.y2);

    if (xDist < yDist) {
      x = segment.x2;
    } else {
      y = segment.y2;
    }

    setSegment({...segment, x1: x, y1: y});
  }

  function handleClick(event) {
    if (!segment.visible) { 
      const stage = event.target.getStage();
      const pointer = stage.getPointerPosition();
  
      let x = Math.round(pointer.x / GRID_INDENT);
      let y = Math.round(pointer.y / GRID_INDENT);

      treeDispatch({
        type: "ADD_POINT",
        point: {x: x, y: y}
      });
    } else {
      treeDispatch({
        type: "ADD_SEGMENT",
        segment: {
          x1: Math.round(segment.x1 / GRID_INDENT),
          y1: Math.round(segment.y1 / GRID_INDENT),
          x2: Math.round(segment.x2 / GRID_INDENT),
          y2: Math.round(segment.y2 / GRID_INDENT)
        }
      });

      setSegment({...segment, visible: false });
    }
  }

  useEffect(() => {
    stateRef.current = tree;

    kioapi.submitResult({
      connected: connected(tree),
      segmentsLength: getTotalLength(tree.segments)
    });
  }, [tree.segments.length]);

  return (
    <div>
      <div className={styles['geom-stage']}>
        <div className={styles['stage']}>
          <Stage
            width={STAGE_WIDTH}
            height={STAGE_HEIGHT}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
          >
            <Layer>
              <StageGrid
                stageWidth={STAGE_WIDTH}
                stageHeight={STAGE_HEIGHT}
                gridIndent={GRID_INDENT}
              />
              <Segment segment={segment} gridIndent={GRID_INDENT} />
              <Tree
                tree={tree}
                treeDispath={treeDispatch}
                setSegment={setSegment}
                gridIndent={GRID_INDENT}
              />
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
}
