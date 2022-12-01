import { Box } from '@mui/material';
import React, { useState } from 'react';

const style = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    'td:first-child': {
      width: 200,
    },
  },
};

export default function EfficiencyScore() {
  const [score, setScore] = useState({
    locscore: 24,
    halsted: 96,
    dataflow_complexity: 25,
    controlflow_complexity: 25,
  });

  return (
    <Box sx={style.container}>
      <table>
        <tr>
          <td>Line of Codes</td>
          <td>
            {score.locscore}
            점
          </td>
        </tr>
        <tr>
          <td>Halstead</td>
          <td>
            {score.halsted}
            점
          </td>
        </tr>
        <tr>
          <td>Data Flow Complexity</td>
          <td>
            {score.dataflow_complexity}
            점
          </td>
        </tr>
        <tr>
          <td>Control Flow Complexity</td>
          <td>
            {score.controlflow_complexity}
            점
          </td>
        </tr>
      </table>
    </Box>
  );
}
