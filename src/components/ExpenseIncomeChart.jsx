import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const ExpenseIncomeChart = ({ data }) => {
  const [selectedType, setSelectedType] = useState('expense');
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [chartData, setChartData] = useState(null);

  const expenseCategories = [
    'Housing', 'Transportation', 'Food', 'Health', 'Insurance',
    'Debt Payments', 'Entertainment', 'Personal & Family',
    'Savings & Investments', 'Miscellaneous',
  ];

  const incomeCategories = [
    'Salary/Wages', 'Business Income', 'Investments',
    'Rental Income', 'Government Benefits', 'Gifts & Other',
  ];

  const getCategoryColor = (category) => {
    const colors = {
      // 'Housing': '#FF6384',
      // 'Transportation': '#36A2EB',
      // 'Food': '#FFCE56',
      // 'Health': '#4BC0C0',
      // 'Insurance': '#9966FF',
      // 'Debt Payments': '#FF9F40',
      // 'Entertainment': '#CFCFCF',
      // 'Personal & Family': '#FFCD56',
      // 'Savings & Investments': '#6495ED',
      // 'Miscellaneous': '#9370DB',
      // 'Salary/Wages': '#36A2EB',
      // 'Business Income': '#4BC0C0',
      // 'Investments': '#9966FF',
      // 'Rental Income': '#FF9F40',
      // 'Government Benefits': '#3CB371',
      // 'Gifts & Other': '#CFCFCF',
          'Housing': '#FF6384',                // Soft Red
    'Transportation': '#36A2EB',        // Bright Blue
    'Food': '#FFCE56',                  // Warm Yellow
    'Health': '#4BC0C0',                // Aqua
    'Insurance': '#9966FF',             // Purple
    'Debt Payments': '#FF9F40',         // Orange
    'Entertainment': '#CFCFCF',         // Light Gray
    'Personal & Family': '#FFCD56',     // Light Gold
    'Savings & Investments': '#6495ED', // Cornflower Blue
    'Miscellaneous': '#9370DB',         // Medium Purple

    'Salary/Wages': '#3CB371',          // Medium Sea Green
    'Business Income': '#F08080',       // Light Coral
    'Investments': '#00CED1',           // Dark Turquoise
    'Rental Income': '#ADFF2F',         // Green Yellow
    'Government Benefits': '#DC143C',   // Crimson
    'Gifts & Other': '#20B2AA',
    };
    return colors[category] || '#666';
  };

  const generateChartData = (type, date) => {
    const categories = type === 'expense' ? expenseCategories : incomeCategories;
    const filtered = data.filter(item => item.type === type && item.date === date);

    const totalsByCategory = {};
    categories.forEach(cat => totalsByCategory[cat] = 0);

    filtered.forEach(item => {
      if (categories.includes(item.category)) {
        totalsByCategory[item.category] += item.amount;
      }
    });

    const chartValues = categories.map(cat => totalsByCategory[cat]);
    const chartColors = categories.map(cat => getCategoryColor(cat));

    return {
      labels: categories,
      datasets: [{
        data: chartValues,
        backgroundColor: chartColors,
        borderWidth: 1,
      }]
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '80%',
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          padding: 16,
          color: '#fff',
          font: {
            size: 12,
            family: "'Outfit', sans-serif",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = total ? Math.round((value / total) * 100) : 0;
            return `${label}: ₹${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  useEffect(() => {
    const chartData = generateChartData(selectedType, selectedDate);
    setChartData(chartData);
  }, [selectedType, selectedDate, data]);

  const hasData = chartData?.datasets[0]?.data?.some(value => value > 0);

  return (
    <div className="p-4 bg-[#2f2f2f] rounded-md h-[430px]">
      <p className="text-xl mb-4 text-white">
        {selectedType === 'expense' ? 'Expense' : 'Income'} Summary for {selectedDate}
      </p>

      <div className="grid items-center gap-4 mb-4 sm:flex sm:justify-between sm:gap-4">
        <div className='flex gap-4'>
          <button
            onClick={() => setSelectedType('expense')}
            className={`px-3 py-1 rounded-md text-white ${selectedType === 'expense' ? 'bg-violet-600' : 'bg-[#393939]'}`}
          >
            Expense
          </button>
          <button
            onClick={() => setSelectedType('income')}
            className={`px-3 py-1 rounded-md text-white ${selectedType === 'income' ? 'bg-violet-600' : 'bg-[#393939]'}`}
          >
            Income
          </button>
        </div>

        <div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-2 py-1 border border-gray-300 outline-none rounded ml-auto text-white"
            max={new Date().toISOString().split("T")[0]} 
          />
        </div>
      </div>

      {hasData ? (
        <div className="h-64">
          <Doughnut data={chartData} options={options} />
        </div>
      ) : (
        <p className="text-gray-400 flex items-center justify-center h-[240px]">
          No transactions found for the selected date.
        </p>
      )}
    </div>
  );
};

export default ExpenseIncomeChart;
