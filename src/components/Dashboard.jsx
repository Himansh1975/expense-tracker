import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard({ expenses }) {
  const currentMonthTotal = expenses.reduce((total, expense) => total + expense.amount, 0);

  const categoryTotals = expenses.reduce((totals, expense) => {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
    return totals;
  }, {});

  const chartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          '#3498db',
          '#2ecc71',
          '#e67e22',
          '#9b59b6',
          '#34495e',
        ],
        borderColor: 'white',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-text mb-6">Dashboard</h2>
      
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-semibold text-text mb-2">This Month&apos;s Expenses</h3>
        <p className="text-4xl font-bold text-primary">${currentMonthTotal.toFixed(2)}</p>
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-semibold text-text mb-4">Expense Distribution</h3>
        <div className="w-full max-w-md mx-auto">
          <Doughnut data={chartData} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-semibold text-text mb-4">Recent Expenses</h3>
        <ul className="space-y-2">
          {expenses.slice(0, 5).map(expense => (
            <li key={expense.id} className="flex justify-between items-center py-2 border-b">
              <span className="text-text">{expense.description}</span>
              <span className="font-semibold text-primary">${expense.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;