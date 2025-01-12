import React, { useEffect, useState } from 'react';

const financialData = [
  {
    date: "2024-09-28",
    revenue: 391035000000,
    netIncome: 93736000000,
    grossProfit: 180683000000,
    eps: 6.11,
    operatingIncome: 123216000000,
  },
  {
    date: "2023-09-30",
    revenue: 383285000000,
    netIncome: 96995000000,
    grossProfit: 169148000000,
    eps: 6.16,
    operatingIncome: 114301000000,
  },
];



const App = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    minRevenue: '',
    maxRevenue: '',
    minNetIncome: '',
    maxNetIncome: '',
  });

  
    const [financialData, setfinancialData] = useState([])
    const fetchData = async () => {
      const url = 'https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=gB7ouWF6QVCrOtsUYaAinqxUNSXkgyYr'
      const data = await fetch(url)
      const data1 = await data.json()
      setfinancialData(data1)
    }
  
    useEffect(() => {
  
      const res = fetchData()
    }, [])
  
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...financialData].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = sortConfig.key === 'date' ? new Date(a[sortConfig.key]) : a[sortConfig.key];
      const bValue = sortConfig.key === 'date' ? new Date(b[sortConfig.key]) : b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  const filteredData = sortedData.filter((item) => {
    const date = new Date(item.date).getFullYear();
    const startDate = filters.startDate ? parseInt(filters.startDate) : null;
    const endDate = filters.endDate ? parseInt(filters.endDate) : null;
    const minRevenue = filters.minRevenue ? parseFloat(filters.minRevenue) : null;
    const maxRevenue = filters.maxRevenue ? parseFloat(filters.maxRevenue) : null;
    const minNetIncome = filters.minNetIncome ? parseFloat(filters.minNetIncome) : null;
    const maxNetIncome = filters.maxNetIncome ? parseFloat(filters.maxNetIncome) : null;

    return (
      (!startDate || date >= startDate) &&
      (!endDate || date <= endDate) &&
      (!minRevenue || item.revenue >= minRevenue) &&
      (!maxRevenue || item.revenue <= maxRevenue) &&
      (!minNetIncome || item.netIncome >= minNetIncome) &&
      (!maxNetIncome || item.netIncome <= maxNetIncome)
    );
  });



  return (
    <div className="p-4 sm:p-6 lg:p-8 font-sans">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Financial Data</h1>

      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Start Year</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Year</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Min Revenue</label>
          <input
            type="number"
            name="minRevenue"
            value={filters.minRevenue}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Max Revenue</label>
          <input
            type="number"
            name="maxRevenue"
            value={filters.maxRevenue}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Min Net Income</label>
          <input
            type="number"
            name="minNetIncome"
            value={filters.minNetIncome}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Max Net Income</label>
          <input
            type="number"
            name="maxNetIncome"
            value={filters.maxNetIncome}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th
                className="p-3 border border-gray-300 cursor-pointer"
                onClick={() => handleSort('date')}
              >
                Date {sortConfig.key === 'date' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th
                className="p-3 border border-gray-300 cursor-pointer"
                onClick={() => handleSort('revenue')}
              >
                Revenue {sortConfig.key === 'revenue' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th
                className="p-3 border border-gray-300 cursor-pointer"
                onClick={() => handleSort('netIncome')}
              >
                Net Income {sortConfig.key === 'netIncome' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th className="p-3 border border-gray-300">Gross Profit</th>
              <th className="p-3 border border-gray-300">EPS</th>
              <th className="p-3 border border-gray-300">Operating Income</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-50 border-b border-gray-300">
                <td className="p-3 border border-gray-300">{item.date}</td>
                <td className="p-3 border border-gray-300">${item.revenue.toLocaleString()}</td>
                <td className="p-3 border border-gray-300">${item.netIncome.toLocaleString()}</td>
                <td className="p-3 border border-gray-300">${item.grossProfit.toLocaleString()}</td>
                <td className="p-3 border border-gray-300">{item.eps}</td>
                <td className="p-3 border border-gray-300">${item.operatingIncome.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
