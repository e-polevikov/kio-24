export const STAGE_WIDTH = 1600;

const LEVEL1_POINTS = [
  {x: 2, y: 1},
  {x: 5, y: 1},
  {x: 7, y: 6},
  {x: 3, y: 7},
  {x: 8, y: 3},
  {x: 12, y: 5},
  {x: 14, y: 3},
  {x: 10, y: 2},
  {x: 2, y: 5},
  {x: 16, y: 2},
  {x: 16, y: 7},
  {x: 5, y: 5}
];

const LEVEL2_POINTS = [
  {x: 2, y: 5},
  {x: 4, y: 7},
  {x: 5, y: 3},
  {x: 8, y: 5},
  {x: 11, y: 2},
  {x: 11, y: 6},
  {x: 13, y: 5},
  {x: 13, y: 9},
  {x: 14, y: 6},
  {x: 17, y: 8},
  {x: 15, y: 1},
  {x: 16, y: 4},
  {x: 19, y: 1},
  {x: 21, y: 2},
  {x: 21, y: 5},
  {x: 23, y: 3},
];

const LEVEL3_POINTS = [
  {x: 1, y: 3},
  {x: 2, y: 5},
  {x: 2, y: 7},
  {x: 3, y: 6},
  {x: 4, y: 1},
  {x: 4, y: 3},
  {x: 5, y: 7},
  {x: 5, y: 9},
  {x: 8, y: 4},
  {x: 9, y: 6},
  {x: 11, y: 8},
  {x: 11, y: 10},
  {x: 12, y: 3},
  {x: 15, y: 6},
  {x: 15, y: 11},
  {x: 17, y: 4},
  {x: 18, y: 7},
  {x: 18, y: 10},
  {x: 22, y: 4},
  {x: 22, y: 8},
  {x: 23, y: 1},
  {x: 23, y: 10},
  {x: 25, y: 2},
  {x: 25, y: 8},
  {x: 27, y: 8},
  {x: 28, y: 6},
  {x: 29, y: 9},
];

const LEVEL1_TREE = {
  points: LEVEL1_POINTS.map((point) => {
    return {...point, predefined: true};
  }),
  segments: [],
};

const LEVEL2_TREE = {
  points: LEVEL2_POINTS.map((point) => {
    return {...point, predefined: true};
  }),
  segments: [],
};

const LEVEL3_TREE = {
  points: LEVEL3_POINTS.map((point) => {
    return {...point, predefined: true};
  }),
  segments: [],
};

export const LEVEL1_SETTINGS = {
  initialTree: LEVEL1_TREE,
  gridSize: {
    width: 18,
    height: 8
  }
};

export const LEVEL2_SETTINGS = {
  initialTree: LEVEL2_TREE,
  gridSize: {
    width: 24,
    height: 10
  }
};

export const LEVEL3_SETTINGS = {
  initialTree: LEVEL3_TREE,
  gridSize: {
    width: 30,
    height: 12
  }
};
