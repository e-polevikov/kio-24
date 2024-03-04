import React from 'react';

export function EnergiesTable({ energies }) {
  const tableStyle = {
    border: "1px solid black",
    padding: "8px",
    margin: "2px",
    width: "90%",
    textAlign: "center",
    borderCollapse: "collapse"
  };

  const tableDataStyle = {
    border: "1px solid black",
    fontSize: "20px"
  };

  return (
    <div style={{paddingBottom: "6px"}}>
      <h3 style={{textAlign: "center", fontSize: "28px"}}> Энергия </h3>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <td style={tableDataStyle}>Текущая</td>
            <td style={tableDataStyle}>{energies.current.toFixed(3)}</td>
          </tr>
          <tr>
            <td style={tableDataStyle}>Минимальная</td>
            <td style={tableDataStyle}>{energies.minimal.toFixed(3)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
