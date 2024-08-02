import React from 'react';

function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'addExpense', label: 'Add Expense' },
    { id: 'analysis', label: 'Analysis' },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-primary">Expense Tracker</h1>
          <ul className="flex space-x-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`btn ${
                    activeTab === item.id
                      ? 'btn-primary'
                      : 'text-text hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;