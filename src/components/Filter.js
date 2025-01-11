import React, { useState } from 'react';
import axios from 'axios';

const Filter = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [revenueRange, setRevenueRange] = useState({ min: '', max: '' });
  const [netIncomeRange, setNetIncomeRange] = useState({ min: '', max: '' });

  const handleFilter = async () => {
    const { start, end } = dateRange;
    const { min: minRevenue, max: maxRevenue } = revenueRange;
    const { min: minNetIncome, max: maxNetIncome } = netIncomeRange;

    const response = await axios.get('http://127.0.0.1:8000/filter', {
      params: {
        start_date: start,
        end_date: end,
        min_revenue: minRevenue,
        max_revenue: maxRevenue,
        min_net_income: minNetIncome,
        max_net_income: maxNetIncome,
      },
    });

    setFilteredData(response.data.filtered_data);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            value={dateRange.start}
            onChange={e => setDateRange({ ...dateRange, start: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            value={dateRange.end}
            onChange={e => setDateRange({ ...dateRange, end: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Min Revenue</label>
          <input
            type="number"
            value={revenueRange.min}
            onChange={e => setRevenueRange({ ...revenueRange, min: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Max Revenue</label>
          <input
            type="number"
            value={revenueRange.max}
            onChange={e => setRevenueRange({ ...revenueRange, max: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Min Net Income</label>
          <input
            type="number"
            value={netIncomeRange.min}
            onChange={e => setNetIncomeRange({ ...netIncomeRange, min: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Max Net Income</label>
          <input
            type="number"
            value={netIncomeRange.max}
            onChange={e => setNetIncomeRange({ ...netIncomeRange, max: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <button
        onClick={handleFilter}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Filter
      </button>
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Income</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Profit</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EPS</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operating Income</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{item.Date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.Revenue}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.NetIncome}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.GrossProfit}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.EPS}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.OperatingIncome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Filter;