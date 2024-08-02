import React, { useState } from 'react';
import ExpenseForm from './ExpenseForm';

function ExpenseList({ expenses, onDeleteExpense, onEditExpense }) {
  const [editingId, setEditingId] = useState(null);
  const [dateFilter, setDateFilter] = useState('');

  const filteredExpenses = dateFilter
    ? expenses.filter(expense => expense.date.toISOString().startsWith(dateFilter))
    : expenses;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-text mb-6">Expense List</h2>
      <div className="mb-4">
        <label htmlFor="dateFilter" className="block text-sm font-medium text-text mb-1">Filter by Date:</label>
        <input
          id="dateFilter"
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="input"
        />
      </div>
      {filteredExpenses.length === 0 ? (
        <p className="text-text">No expenses recorded yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-primary bg-opacity-10">
                <th className="p-2 text-left text-text">Date</th>
                <th className="p-2 text-left text-text">Description</th>
                <th className="p-2 text-left text-text">Category</th>
                <th className="p-2 text-right text-text">Amount</th>
                <th className="p-2 text-center text-text">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="border-b border-gray-200">
                  {editingId === expense.id ? (
                    <td colSpan="5">
                      <ExpenseForm
                        expense={expense}
                        onAddExpense={(updatedExpense) => {
                          onEditExpense(expense.id, updatedExpense);
                          setEditingId(null);
                        }}
                        onCancel={() => setEditingId(null)}
                      />
                    </td>
                  ) : (
                    <>
                      <td className="p-2 text-text">{expense.date.toLocaleDateString()}</td>
                      <td className="p-2 text-text">{expense.description}</td>
                      <td className="p-2 text-text">{expense.category}</td>
                      <td className="p-2 text-right text-text">${expense.amount.toFixed(2)}</td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => setEditingId(expense.id)}
                          className="text-primary hover:text-opacity-80 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDeleteExpense(expense.id)}
                          className="text-accent hover:text-opacity-80"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ExpenseList;