import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#a4de6c', '#d0ed57'];

const Chart = ({ data, category }) => {
  // Filter data to only show expenses and exclude the selected category
  const getFilteredData = () => {
    const filtered = data.filter(
      (entry) => entry.type === 'expense' && entry.category !== category
    );

    const grouped = {};

    filtered.forEach((item) => {
      const amount = parseFloat(item.amount); // Ensure amount is a number
      if (!grouped[item.category]) {
        grouped[item.category] = 0;
      }
      grouped[item.category] += amount; // Sum the amounts by category
    });

    return Object.entries(grouped).map(([cat, amt]) => ({
      category: cat,
      amount: amt,
    }));
  };

  const chartData = getFilteredData();

  if (chartData.length === 0) return <p>No expense data available.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 capitalize">Expenses by Category</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={chartData}
          dataKey="amount"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={100}
          innerRadius={60}
          paddingAngle={3}
          label
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default Chart;
