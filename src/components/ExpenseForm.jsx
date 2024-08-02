import React, { useState, useEffect } from 'react';

function ExpenseForm({ onAddExpense, expense = null, onCancel = null }) {
  const [description, setDescription] = useState(expense ? expense.description : '');
  const [amount, setAmount] = useState(expense ? expense.amount.toString() : '');
  const [category, setCategory] = useState(expense ? expense.category : '');
  const [date, setDate] = useState(expense ? expense.date.toISOString().split('T')[0] : '');

  useEffect(() => {
    if (expense) {
      setDescription(expense.description);
      setAmount(expense.amount.toString());
      setCategory(expense.category);
      setDate(expense.date.toISOString().split('T')[0]);
    }
  }, [expense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExpense({ description, amount: parseFloat(amount), category, date: new Date(date) });
    if (!expense) {
      setDescription('');
      setAmount('');
      setCategory('');
      setDate('');
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-text mb-6">{expense ? 'Edit Expense' : 'Add New Expense'}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-text mb-1">Description</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input"
            required
            placeholder="Enter expense description"
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-text mb-1">Amount</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input"
            required
            min="0"
            step="0.01"
            placeholder="Enter amount"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-text mb-1">Category</label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input"
            required
            placeholder="Enter expense category"
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-text mb-1">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="flex justify-between">
          <button type="submit" className="btn btn-primary">
            {expense ? 'Update Expense' : 'Add Expense'}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;