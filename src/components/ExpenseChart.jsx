import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

  export const ExpenseChart = ({ income, expense }) => {
  const data = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ['#2ecc71', '#c0392b'], // Green & Red
        hoverBackgroundColor: ['#27ae60', '#e74c3c'],
      },
    ],
  };

  return (
    <div style={{ width: '300px', margin: '20px auto' }}>
      <Pie data={data} />
    </div>
  );
};

