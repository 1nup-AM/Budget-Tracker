import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = ({ transactions }) => {
  // Calculate expenses by category
  const expenses = transactions.filter(t => t.type === 'expense');
  
  const categories = ['Food', 'Bills', 'Entertainment'];
  const categoryTotals = categories.map(cat => 
    expenses
      .filter(t => t.category === cat)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const data = {
    labels: categories,
    datasets: [
      {
        data: categoryTotals,
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#555752',
          font: {
            size: 14
          }
        }
      }
    },
    maintainAspectRatio: false
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Expense Breakdown</h2>
      <div className="h-64">
        <Doughnut data={data} options={options} />
      </div>
      <div className="mt-4">
        <h3 className="font-medium mb-2">Category Totals</h3>
        <ul className="space-y-1">
          {categories.map((cat, index) => (
            <li key={cat} className="flex justify-between">
              <span>{cat}:</span>
              <span>${categoryTotals[index].toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Charts;