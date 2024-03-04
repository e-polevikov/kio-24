import React from 'react';
import styles from './ActionControl.module.css';

import { ACTIONS } from '../../constants/Actions';

export function ActionControl({ handleClick, kioapi }) {
  const basePath = kioapi.basePath || ".";

  return (
    <div className={styles['action-control']}>
      <div className={styles['apply-btn-container']}>
        <button
          className={styles['apply-btn']}
          onClick={() => handleClick(ACTIONS.APPLY, {})}
        >
          применить
        </button>
      </div>
      <div className={styles['undo-redo-btn-container']}>
        <img
          src={`${basePath}/geomtransformations-resources/undo-arrow-left.svg`}
          style={{
            all: "revert",
            width: "45%",
            margin: "6px"
          }}
          onClick={() => handleClick(ACTIONS.UNDO, {})}
        />
        <img
          src={`${basePath}/geomtransformations-resources/redo-arrow-right.svg`}
          style={{
            all: "revert",
            width: "45%",
            margin: "6px"
          }}
          onClick={() => handleClick(ACTIONS.REDO, {})}
        />
      </div>
    </div>
  );
}
