import * as disjointSet from 'disjoint-set';

export function horizontal(segment) {
  return segment.y1 === segment.y2;
}

export function vertical(segment) {
  return segment.x1 === segment.x2
}

export function overlapHorizontally(segment1, segment2) {
  if (!(horizontal(segment1) && horizontal(segment2))) {
    return false;
  }

  if (segment1.y1 !== segment2.y1) {
    return false;
  }
  
  if (
    Math.min(segment1.x1, segment1.x2) <= Math.min(segment2.x1, segment2.x2) &&
    Math.max(segment1.x1, segment1.x2) <= Math.min(segment2.x1, segment2.x2)
  ) {
    return false;
  }

  if (
    Math.min(segment1.x1, segment1.x2) >= Math.max(segment2.x1, segment2.x2) &&
    Math.max(segment1.x1, segment1.x2) >= Math.max(segment2.x1, segment2.x2)
  ) {
    return false;
  }

  return true;
}

export function overlapVertically(segment1, segment2) {
  if (!(vertical(segment1) && vertical(segment2))) {
    return false;
  }

  if (segment1.x1 !== segment2.x1) {
    return false;
  }

  if (
    Math.min(segment1.y1, segment1.y2) <= Math.min(segment2.y1, segment2.y2) &&
    Math.max(segment1.y1, segment1.y2) <= Math.min(segment2.y1, segment2.y2)
  ) {
    return false;
  }

  if (
    Math.min(segment1.y1, segment1.y2) >= Math.max(segment2.y1, segment2.y2) &&
    Math.max(segment1.y1, segment1.y2) >= Math.max(segment2.y1, segment2.y2)
  ) {
    return false;
  }

  return true;
}

export function intersectHorizontally(segment1, segment2) {
  if (!(horizontal(segment1) && horizontal(segment2))) {
    return false;
  }

  if (segment1.y1 !== segment2.y1) {
    return false;
  }
  
  if (
    Math.min(segment1.x1, segment1.x2) < Math.min(segment2.x1, segment2.x2) &&
    Math.max(segment1.x1, segment1.x2) < Math.min(segment2.x1, segment2.x2)
  ) {
    return false;
  }

  if (
    Math.min(segment1.x1, segment1.x2) > Math.max(segment2.x1, segment2.x2) &&
    Math.max(segment1.x1, segment1.x2) > Math.max(segment2.x1, segment2.x2)
  ) {
    return false;
  }

  return true;
}

export function intersectVertically(segment1, segment2) {
  if (!(vertical(segment1) && vertical(segment2))) {
    return false;
  }

  if (segment1.x1 !== segment2.x1) {
    return false;
  }

  if (
    Math.min(segment1.y1, segment1.y2) < Math.min(segment2.y1, segment2.y2) &&
    Math.max(segment1.y1, segment1.y2) < Math.min(segment2.y1, segment2.y2)
  ) {
    return false;
  }

  if (
    Math.min(segment1.y1, segment1.y2) > Math.max(segment2.y1, segment2.y2) &&
    Math.max(segment1.y1, segment1.y2) > Math.max(segment2.y1, segment2.y2)
  ) {
    return false;
  }

  return true;
}

export function intersectPerpendicularly(segment1, segment2) {
  let horizontalSegment;
  let verticalSegment;

  if (horizontal(segment1) && vertical(segment2)) {
    horizontalSegment = segment1;
    verticalSegment = segment2;
  } else if (horizontal(segment2) && vertical(segment1)) {
    horizontalSegment = segment2;
    verticalSegment = segment1;
  } else {
    return false;
  }

  if (verticalSegment.x1 < Math.min(horizontalSegment.x1, horizontalSegment.x2)) {
    return false;
  }

  if (verticalSegment.x1 > Math.max(horizontalSegment.x1, horizontalSegment.x2)) {
    return false;
  }

  let minY = Math.min(verticalSegment.y1, verticalSegment.y2);
  let maxY = Math.max(verticalSegment.y1, verticalSegment.y2);

  return minY <= horizontalSegment.y1 && maxY >= horizontalSegment.y1;
}

export function intersect(segment1, segment2) {
  return intersectHorizontally(segment1, segment2) ||
    intersectVertically(segment1, segment2) ||
    intersectPerpendicularly(segment1, segment2);
}

export function insideSegment(point, segment) {
  if (horizontal(segment)) {
    return point.y === segment.y1 &&
      point.x >= Math.min(segment.x1, segment.x2) &&
      point.x <= Math.max(segment.x1, segment.x2);
  } else {
    return point.x === segment.x1 &&
      point.y >= Math.min(segment.y1, segment.y2) &&
      point.y <= Math.max(segment.y1, segment.y2);    
  }
}

export function getLength(segment) {
  let length = 0;

  length += Math.abs(segment.x1 - segment.x2);
  length += Math.abs(segment.y1 - segment.y2);

  return length;
}

export function getTotalLength(segments) {
  let totalLength = 0;

  for (let i = 0; i < segments.length; i++) {
    totalLength += getLength(segments[i]);
  }

  return totalLength;
}

export function connected(tree) {
  let pointToId = new Map();
  let pointsSet = disjointSet();

  for (let i = 0; i < tree.points.length; i++) {
    let x = tree.points[i].x;
    let y = tree.points[i].y;
    let key = String(x) + '-' + String(y);
    let pointId = { pointId: i };

    pointToId.set(key, pointId);
    pointsSet.add(pointId);
  }

  for (let i = 0; i < tree.segments.length; i++) {
    let x1 = tree.segments[i].x1;
    let y1 = tree.segments[i].y1;
    let x2 = tree.segments[i].x2;
    let y2 = tree.segments[i].y2;

    let key1 = String(x1) + '-' + String(y1);
    let key2 = String(x2) + '-' + String(y2);

    let firstId = pointToId.get(key1);
    let secondId = pointToId.get(key2);

    pointsSet.union(firstId, secondId);
  }

  for (let i = 0; i < tree.segments.length - 1; i++) {
    for (let j = i + 1; j < tree.segments.length; j++) {
      let segment1 = tree.segments[i];
      let segment2 = tree.segments[j];

      if (intersect(segment1, segment2)) {
        let x1 = tree.segments[i].x1;
        let y1 = tree.segments[i].y1;
        let x2 = tree.segments[j].x2;
        let y2 = tree.segments[j].y2;
    
        let key1 = String(x1) + '-' + String(y1);
        let key2 = String(x2) + '-' + String(y2);
    
        let firstId = pointToId.get(key1);
        let secondId = pointToId.get(key2);
    
        pointsSet.union(firstId, secondId);
      }
    }
  }

  for (let i = 0; i < tree.points.length; i++) {
    let point = tree.points[i];

    if (!point.predefined) {
      continue;
    }

    for (let j = 0; j < tree.segments.length; j++) {
      let segment = tree.segments[j];

      if (insideSegment(point, segment)) {
        let key1 = String(point.x) + '-' + String(point.y);
        let key2 = String(segment.x1) + '-' + String(segment.y1);

        let firstId = pointToId.get(key1);
        let secondId = pointToId.get(key2);

        pointsSet.union(firstId, secondId);
        break;
      }
    }
  }

  let uniqueId = -1;
  for (let i = 0; i < tree.points.length; i++) {
    let point = tree.points[i];

    if (!point.predefined) {
      continue;
    }

    let key = String(point.x) + '-' + String(point.y);
    let pointId = pointToId.get(key);
    let setId = pointsSet.find(pointId);

    if (uniqueId === -1) {
      uniqueId = setId;
    } else {
      if (setId !== uniqueId) {
        return false;
      }
    }
  }  
  
  return true;
}

export function numConjunctions(tree) {
  let conjunctionPoints = new Set();

  for (let i = 0; i < tree.segments.length; i++) {
    let segment = tree.segments[i];
    let point1 = String(segment.x1) + '-' + String(segment.y1);
    let point2 = String(segment.x2) + '-' + String(segment.y2);
    conjunctionPoints.add(point1);
    conjunctionPoints.add(point2);
  }

  for (let i = 0; i < tree.points.length; i++) {
    let point = tree.points[i];

    if (!point.predefined) {
      continue;
    }

    let pnt = String(point.x) + '-' + String(point.y);
    conjunctionPoints.delete(pnt);
  }

  return conjunctionPoints.size;
}
