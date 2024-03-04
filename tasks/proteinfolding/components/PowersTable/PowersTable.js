import React from 'react';

import { PARTICLE_COLORS } from '../../constants/ParticlesChain';

import styles from './PowersTable.module.css';

function SignedValue({ value }) {
  if (value >= 0) {
    return (
      <>+{value}</>
    );
  }

  return (
    <>&minus;{-value}</>
  );
}

function PowersTableRow({ particleColor, rowPowers}) {
  const tableDataStyle = {
    all: "revert",
    border: "1px solid black",
    fontSize: "28px",
    fontFamily: "\"Raleway\", sans-serif",
    verticalAlign: "center"
  };

  return (
    <>
      <tr>
        <td style={tableDataStyle}> <span style={{color: particleColor, fontSize: "38px"}}>&#9679;</span> </td>
        <td style={tableDataStyle}> <SignedValue value={rowPowers['red']}/> </td>
        <td style={tableDataStyle}> <SignedValue value={rowPowers['green']}/> </td>
        <td style={tableDataStyle}> <SignedValue value={rowPowers['blue']}/> </td>
      </tr>
    </>
  );
}

export function PowersTable({ powers }) {
  const tableStyle = {
    all: "revert",
    border: "1px solid black",
    padding: "8px",
    margin: "2px",
    width: "100%",
    textAlign: "center",
    borderCollapse: "collapse"
  };

  const tableDataStyle = {
    all: "revert",
    border: "1px solid black",
    fontSize: "28px",
    fontFamily: "\"Raleway\", sans-serif",
    verticalAlign: "center"
  };

  return (
    <>
      <h3 style={{
        textAlign: "center",
        fontSize: "28px",
        fontFamily: "\"Podkova\", serif"
      }}
      >силы притяжения</h3>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <td style={tableDataStyle}></td>
            <td style={tableDataStyle}> <span style={{color: PARTICLE_COLORS['red'], fontSize: '38px'}}>&#9679;</span> </td>
            <td style={tableDataStyle}> <span style={{color: PARTICLE_COLORS['green'], fontSize: '38px'}}>&#9679;</span> </td>
            <td style={tableDataStyle}> <span style={{color: PARTICLE_COLORS['blue'], fontSize: '38px'}}>&#9679;</span> </td>
          </tr>
          <PowersTableRow particleColor={PARTICLE_COLORS['red']} rowPowers={powers['red']}/>
          <PowersTableRow particleColor={PARTICLE_COLORS['green']} rowPowers={powers['green']}/>
          <PowersTableRow particleColor={PARTICLE_COLORS['blue']} rowPowers={powers['blue']}/>
        </tbody>
      </table>
    </>
  );
}
