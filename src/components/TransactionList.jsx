import { useState } from "react";
import { format } from "date-fns";

const TransactionList = ({ transactions, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    amount: "",
    description: "",
    category: "Food",
    type: "expense",
  });

  const handleEditClick = (transaction) => {
    setEditingId(transaction.id);
    setEditForm({
      amount: transaction.amount.toString(),
      description: transaction.description,
      category: transaction.category,
      type: transaction.type,
    });
  };

  const handleEditSubmit = (id) => {
    onEdit(id, {
      amount: parseFloat(editForm.amount),
      description: editForm.description,
      category: editForm.category,
      type: editForm.type,
    });
    setEditingId(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      {transactions.length === 0 ? (
        <p className="text-center py-4">No transactions yet</p>
      ) : (
        <ul className="divide-y dark:divide-gray-700">
          {transactions.map((t) => (
            <li key={t.id} className="py-4">
              {editingId === t.id ? (
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      name="amount"
                      value={editForm.amount}
                      onChange={handleEditChange}
                      className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                    />
                    <select
                      name="type"
                      value={editForm.type}
                      onChange={handleEditChange}
                      className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                  <select
                    name="category"
                    value={editForm.category}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="Food">Food</option>
                    <option value="Bills">Bills</option>
                    <option value="Entertainment">Entertainment</option>
                  </select>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditSubmit(t.id)}
                      className="flex-1 bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex-1 bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">
                      {t.description}
                      <span
                        className={`ml-2 px-2 py-1 text-xs rounded-full ${
                          t.type === "income"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {t.category}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {format(new Date(t.date), "MMM dd, yyyy - h:mm a")}
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-x-2">
                    <div>
                      <span
                        className={`font-semibold ${
                          t.type === "income"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
                      </span>
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEditClick(t)}
                        className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(t.id)}
                        className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
