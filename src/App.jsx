import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Analysis from './components/Analysis';

function App() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      return JSON.parse(savedExpenses).map(expense => ({
        ...expense,
        date: new Date(expense.date)
      }));
    }
    return [];
  });
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const editExpense = (id, updatedExpense) => {
    setExpenses(expenses.map(expense => 
      expense.id === id ? { ...updatedExpense, id } : expense
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto mt-8 p-4">
        <div className="card">
          {activeTab === 'dashboard' && <Dashboard expenses={expenses} />}
          {activeTab === 'addExpense' && <ExpenseForm onAddExpense={addExpense} />}
          {activeTab === 'analysis' && <Analysis expenses={expenses} />}
          {activeTab !== 'addExpense' && (
            <ExpenseList 
              expenses={expenses} 
              onDeleteExpense={deleteExpense}
              onEditExpense={editExpense}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;