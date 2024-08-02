import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Analysis({ expenses }) {
  const categoryTotals = expenses.reduce((totals, expense) => {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
    return totals;
  }, {});

  const chartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: 'Total Expenses',
        data: Object.values(categoryTotals),
        backgroundColor: 'rgba(52, 152, 219, 0.6)',
        borderColor: 'rgba(52, 152, 219, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333333',
        },
      },
      title: {
        display: true,
        text: 'Expenses by Category',
        color: '#333333',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#333333' },
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
      },
      y: {
        ticks: { color: '#333333' },
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
      },
    },
  };

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-text mb-6">Expense Analysis</h2>
      
      <div className="card">
        <h3 className="text-xl font-semibold text-text mb-2">Total Expenses</h3>
        <p className="text-4xl font-bold text-primary">${totalExpenses.toFixed(2)}</p>
      </div>
      
      <div className="card">
        <h3 className="text-xl font-semibold text-text mb-4">Expenses by Category</h3>
        <Bar data={chartData} options={chartOptions} />
      </div>
      
      <div className="card">
        <h3 className="text-xl font-semibold text-text mb-2">Category Breakdown</h3>
        <ul className="space-y-2">
          {Object.entries(categoryTotals).map(([category, total]) => (
            <li key={category} className="flex justify-between items-center">
              <span className="text-text">{category}</span>
              <span className="font-semibold text-primary">${total.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Analysis;