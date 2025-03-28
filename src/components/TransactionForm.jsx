import { useState } from 'react';

const TransactionForm = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food');
  const [type, setType] = useState('expense');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) return;
    
    onSubmit({
      amount: parseFloat(amount),
      description,
      category,
      type
    });
    
    // Reset form
    setAmount('');
    setDescription('');
    setCategory('Food');
    setType('expense');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded  dark:bg-gray-700 dark:border-gray-600"
          step="0.01"
          required
        />
      </div>
      
      <div>
        <label className="block mb-1">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      
      <div>
        <label className="block mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="Food">Food</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">Entertainment</option>
        </select>
      </div>
      
      <div>
        <label className="block mb-2">Type</label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              checked={type === 'expense'}
              onChange={() => setType('expense')}
              className="mr-2"
            />
            Expense
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              checked={type === 'income'}
              onChange={() => setType('income')}
              className="mr-2"
            />
            Income
          </label>
        </div>
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;