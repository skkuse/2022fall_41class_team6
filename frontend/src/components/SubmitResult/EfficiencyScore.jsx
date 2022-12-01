import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';

const SCORE_HEADER = {
  line_of_codes: 'Line of Codes',
  halstead_difficulty: 'Halstead Difficulty',
  dataflow_complexity: 'Dataflow Complexity',
  controlflow_complexity: 'Controlflow Complexity',
};

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
  const [score, setScore] = useState({});

  useEffect(() => {
    axios.get('/code_submitted/1/1/efficiency').then(({ data }) => {
      setScore(data);
    });
  }, []);

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
