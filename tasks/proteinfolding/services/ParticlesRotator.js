import { ROTATION_ANGLE, ROTATION_DIRECTIONS } from '../constants/RotationControl';

export function rotatePoint(x, y, originX, originY, angle) {
  let angleRadians = angle * Math.PI / 180;

  let xRotated =
      (x - originX) * Math.cos(angleRadians)
    - (y - originY) * Math.sin(angleRadians);
  let yRotated =
      (x - originX) * Math.sin(angleRadians)
    + (y - originY) * Math.cos(angleRadians);

  xRotated += originX;
  yRotated += originY;

  return [xRotated, yRotated]
}

export function rotateParticles(
  particles,
  pivotParticleId,
  rotationDirection,
  isSplitted,
) {
  let rotatedParticles = JSON.parse(JSON.stringify(particles));
  let IdsToRotate = [];

  if (
    rotationDirection == ROTATION_DIRECTIONS[1].key ||
    rotationDirection == ROTATION_DIRECTIONS[3].key
  ) {
    let upperBound = rotatedParticles.length;

    if (isSplitted) {
      let splitIdx = Math.floor(rotatedParticles.length / 2);
      if (pivotParticleId < splitIdx) {
        upperBound = splitIdx;
      }
    }

    for (let i = pivotParticleId + 1; i < upperBound; i++) {
      IdsToRotate.push(i);
    }
  } else {
    let lowerBound = 0;

    if (isSplitted) {
      let splitIdx = Math.floor(rotatedParticles.length / 2);
      if (pivotParticleId >= splitIdx) {
        lowerBound = splitIdx;
      }
    }

    for (let i = lowerBound; i < pivotParticleId; i++) {
      IdsToRotate.push(i);
    }
  }

  let pivotX = particles[pivotParticleId].x;
  let pivotY = particles[pivotParticleId].y;

  IdsToRotate.forEach((i) => {
    let currentX = rotatedParticles[i].x;
    let currentY = rotatedParticles[i].y;

    let alpha = ROTATION_ANGLE;

    if (
      rotationDirection == ROTATION_DIRECTIONS[1].key ||
      rotationDirection == ROTATION_DIRECTIONS[2].key
    ) {
      alpha *= -1;
    }

    let [nextX, nextY] = rotatePoint(currentX, currentY, pivotX, pivotY, alpha);

    rotatedParticles[i].x = nextX;
    rotatedParticles[i].y = nextY;
  });

  return rotatedParticles;
}
