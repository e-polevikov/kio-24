import React from 'react';
import styles from './Transformations.module.css';

import { TRANSFORMATIONS } from '../../constants/Transformations';
import { ACTIONS } from '../../constants/Actions';

export function Transformations({
  transformation,
  setTransformation,
  handleChange,
  kioapi
}) {
  const basePath = kioapi.basePath || ".";

  return (
    <div className={styles['transformations']}>
      <h2 className={styles['title']}>преобразования</h2>

      <div
        className={`${styles['transformation']}`}
        onClick={() => {
          setTransformation(TRANSFORMATIONS.REFLECT);
          handleChange(
            ACTIONS.SET_TRANSFORMATION,
            {transformation: TRANSFORMATIONS.REFLECT}
          );
        }}
      >
        <img
          style={{
            border: transformation === TRANSFORMATIONS.REFLECT ?
            "5px solid gray" : "5px solid white",
            width: "70px",
            height: "70px"
          }}
          src={`${basePath}/geomtransformations-resources/reflect.svg`}
        />
        <div className={styles['transformation-title']}>
          симметрия относительно прямой DE
        </div>
      </div>

      <div
        className={styles['transformation']}
        onClick={() => {
          setTransformation(TRANSFORMATIONS.ROTATE_CLOCKWISE);
          handleChange(
            ACTIONS.SET_TRANSFORMATION,
            {transformation: TRANSFORMATIONS.ROTATE_CLOCKWISE}
          );
        }}
      >
        <img
          style={{
            all: "revert",
            border: transformation === TRANSFORMATIONS.ROTATE_CLOCKWISE ?
            "5px solid gray" : "5px solid white",
            width: "70px",
            height: "70px"
          }}
          src={`${basePath}/geomtransformations-resources/rotate-clockwise.svg`}
        />
        <div className={styles['transformation-title']}>
          поворот относительно точки B на угол ABC по часовой стрелке
        </div>
      </div>

      <div
        className={styles['transformation']}
        onClick={() => {
          setTransformation(TRANSFORMATIONS.ROTATE_COUNTER_CLOCKWISE);
          handleChange(
            ACTIONS.SET_TRANSFORMATION,
            {transformation: TRANSFORMATIONS.ROTATE_COUNTER_CLOCKWISE}
          );
        }}
      >
        <img
          style={{
            border: transformation === TRANSFORMATIONS.ROTATE_COUNTER_CLOCKWISE ?
            "5px solid gray" : "5px solid white",
            width: "70px",
            height: "70px"
          }}
          src={`${basePath}/geomtransformations-resources/rotate-counterclockwise.svg`}
        />
        <div className={styles['transformation-title']}>
          поворот относительно точки B на угол ABC против часовой стрелки
        </div>
      </div>
    </div>
  );
}

/*
export function Transformations({
  transformation,
  setTransformation,
  handleChange
}) {
  return (
    <div className={styles['transformations']}>
      <h2 style={{textAlign: "center"}}>Преобразования</h2>
      <div className={styles['radio-btn']}>
        <input
          type={"radio"}
          id={TRANSFORMATIONS.REFLECT}
          value={TRANSFORMATIONS.REFLECT}
          checked={transformation === TRANSFORMATIONS.REFLECT}
          onChange={() => {
            setTransformation(TRANSFORMATIONS.REFLECT);
            handleChange(
              ACTIONS.SET_TRANSFORMATION,
              {transformation: TRANSFORMATIONS.REFLECT}
            );
          }}
        />
        <label htmlFor={TRANSFORMATIONS.REFLECT}>
          Симметрия относительно прямой DE
        </label>
      </div>

      <div className={styles['radio-btn']}>
        <input
          type={"radio"}
          id={TRANSFORMATIONS.ROTATE_COUNTER_CLOCKWISE}
          value={TRANSFORMATIONS.ROTATE_COUNTER_CLOCKWISE}
          checked={transformation === TRANSFORMATIONS.ROTATE_COUNTER_CLOCKWISE}
          onChange={() => {
            setTransformation(TRANSFORMATIONS.ROTATE_COUNTER_CLOCKWISE);
            handleChange(
              ACTIONS.SET_TRANSFORMATION,
              {transformation: TRANSFORMATIONS.ROTATE_COUNTER_CLOCKWISE}
            );
          }}
        />
        <label htmlFor={TRANSFORMATIONS.ROTATE_COUNTER_CLOCKWISE}>
          Поворот относительно точки B на угол ABC против часовой стрелки
        </label>
      </div>

      <div className={styles['radio-btn']}>
        <input
          type={"radio"}
          id={TRANSFORMATIONS.ROTATE_CLOCKWISE}
          value={TRANSFORMATIONS.ROTATE_CLOCKWISE}
          checked={transformation === TRANSFORMATIONS.ROTATE_CLOCKWISE}
          onChange={() => {
            setTransformation(TRANSFORMATIONS.ROTATE_CLOCKWISE);
            handleChange(
              ACTIONS.SET_TRANSFORMATION,
              {transformation: TRANSFORMATIONS.ROTATE_CLOCKWISE}
            );
          }}
        />
        <label htmlFor={TRANSFORMATIONS.ROTATE_CLOCKWISE}>
          Поворот относительно точки B на угол ABC по часовой стрелке
        </label>
      </div>
    </div>
  );
}
*/