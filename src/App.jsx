import { useState, useEffect } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Charts from "./components/Charts";
import ThemeToggle from "./components/ThemeToggle";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [transactions, setTransactions] = useLocalStorage("transactions", []);
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
  const [filter, setFilter] = useState("all");
  const [balance, setBalance] = useState(0);

  // Calculate balance whenever transactions change
  useEffect(() => {
    const newBalance = transactions.reduce(
      (total, t) => (t.type === "income" ? total + t.amount : total - t.amount),
      0
    );
    setBalance(newBalance);
  }, [transactions]);

  // Filter transactions based on selected filter
  const filteredTransactions = transactions
    .filter((t) => {
      if (filter === "all") return true;
      return t.type === filter;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const addTransaction = (transaction) => {
    setTransactions([
      ...transactions,
      {
        ...transaction,
        id: Date.now(),
        date: new Date().toISOString(),
      },
    ]);
  };

  const deleteTransaction = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      setTransactions(transactions.filter((t) => t.id !== id));
    }
  };

  const editTransaction = (id, updatedTransaction) => {
    setTransactions(
      transactions.map((t) =>
        t.id === id ? { ...updatedTransaction, id, date: t.date } : t
      )
    );
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

        <h1 className="text-3xl font-bold mb-6">Budget Tracker</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div
              className={`p-6 rounded-lg shadow-md mb-6 ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Current Balance</h2>
                <span
                  className={`text-2xl font-bold ${
                    balance >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  ${balance.toFixed(2)}
                </span>
              </div>

              <TransactionForm onSubmit={addTransaction} />
            </div>

            <div
              className={`p-6 rounded-lg shadow-md ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Transactions</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setFilter("all")}
                    className={`px-3 py-1 rounded ${
                      filter === "all"
                        ? "bg-blue-500 text-white"
                        : darkMode
                        ? "bg-gray-700"
                        : "bg-gray-200"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter("income")}
                    className={`px-3 py-1 rounded ${
                      filter === "income"
                        ? "bg-green-500 text-white"
                        : darkMode
                        ? "bg-gray-700"
                        : "bg-gray-200"
                    }`}
                  >
                    Income
                  </button>
                  <button
                    onClick={() => setFilter("expense")}
                    className={`px-3 py-1 rounded ${
                      filter === "expense"
                        ? "bg-red-500 text-white"
                        : darkMode
                        ? "bg-gray-700"
                        : "bg-gray-200"
                    }`}
                  >
                    Expenses
                  </button>
                </div>
              </div>

              <TransactionList
                transactions={filteredTransactions}
                onDelete={deleteTransaction}
                onEdit={editTransaction}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div
              className={`p-6 rounded-lg shadow-md ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <Charts transactions={transactions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
