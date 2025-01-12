import React, { useEffect, useState } from 'react';


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
    <div className="bg-gray-50 min-h-screen p-6 sm:p-12 font-sans">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Financial Data Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Start Year', name: 'startDate' },
            { label: 'End Year', name: 'endDate' },
            { label: 'Min Revenue', name: 'minRevenue' },
            { label: 'Max Revenue', name: 'maxRevenue' },
            { label: 'Min Net Income', name: 'minNetIncome' },
            { label: 'Max Net Income', name: 'maxNetIncome' },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                type="number"
                name={name}
                value={filters[name]}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          ))}
        </div>

        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full table-auto border-collapse border border-gray-200 text-left text-sm sm:text-base">
            <thead className="bg-indigo-600 text-white">
              <tr>
                {[
                  { label: 'Date', key: 'date' },
                  { label: 'Revenue', key: 'revenue' },
                  { label: 'Net Income', key: 'netIncome' },
                  { label: 'Gross Profit' },
                  { label: 'EPS' },
                  { label: 'Operating Income' },
                ].map((column, idx) => (
                  <th
                    key={idx}
                    className={`p-4 border-b border-indigo-700 ${
                      column.key ? 'cursor-pointer' : ''
                    }`}
                    onClick={column.key ? () => handleSort(column.key) : undefined}
                  >
                    {column.label}{' '}
                    {sortConfig.key === column.key &&
                      (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } hover:bg-gray-100`}
                >
                  <td className="p-4 border-b border-gray-200">{item.date}</td>
                  <td className="p-4 border-b border-gray-200">
                    ${item.revenue.toLocaleString()}
                  </td>
                  <td className="p-4 border-b border-gray-200">
                    ${item.netIncome.toLocaleString()}
                  </td>
                  <td className="p-4 border-b border-gray-200">
                    ${item.grossProfit.toLocaleString()}
                  </td>
                  <td className="p-4 border-b border-gray-200">{item.eps}</td>
                  <td className="p-4 border-b border-gray-200">
                    ${item.operatingIncome.toLocaleString()}
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center text-gray-500 p-6 border-t border-gray-200"
                  >
                    No data found. Adjust your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
