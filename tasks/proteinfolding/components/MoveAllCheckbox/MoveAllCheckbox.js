import React from 'react';
import styles from './MoveAllCheckbox.module.css';

export function MoveAllCheckbox({ setMoveAll }) {
  return (
    <div className={styles['checkbox-container']}>
      <label style={{fontFamily: "\"Raleway\", sans-serif"}}>Перемещать обе цепочки: </label>
      <input
        type='checkbox'
        onChange={(event) => setMoveAll(event.target.checked)}
      />
    </div>
  );
}
