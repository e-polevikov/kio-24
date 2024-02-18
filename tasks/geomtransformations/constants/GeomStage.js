export const GRID_SIZE = {
  WIDTH: 20,
  HEIGHT: 14
};

export const STAGE_WIDTH = 1024;
export const GRID_INDENT = STAGE_WIDTH / GRID_SIZE.WIDTH;
export const STAGE_HEIGHT = GRID_INDENT * GRID_SIZE.HEIGHT;

export const ANGLE_POINTS = [{
    id: "0",
    x: 1 * GRID_INDENT,
    y: 6 * GRID_INDENT,
    isDragging: false
  }, {
    id: "1",
    x: 1 * GRID_INDENT,
    y: 9 * GRID_INDENT,
    isDragging: false
  }, {
    id: "2",
    x: 3 * GRID_INDENT,
    y: 9 * GRID_INDENT,
    isDragging: false
  }
];

export const LINE_POINTS = [{
    id: "0",
    x: 8 * GRID_INDENT,
    y: 8 * GRID_INDENT,
    isDragging: false
  }, {
    id: "1",
    x: 8 * GRID_INDENT,
    y: 12 * GRID_INDENT,
    isDragging: false
  }
];
