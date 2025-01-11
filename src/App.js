import './App.css'; // or './App.css' if that's where you're putting it
import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [startDate, setStartDate] = useState("2021-01-14");
  const [endDate, setEndDate] = useState("2024-12-31");
  const [minRevenue, setMinRevenue] = useState(300000000000);
  const [maxRevenue, setMaxRevenue] = useState(400000000000);
  const [minNetIncome, setMinNetIncome] = useState(50000000000);
  const [maxNetIncome, setMaxNetIncome] = useState(100000000000);
  const [filteredData, setFilteredData] = useState([]);
  const [sortColumn, setSortColumn] = useState(""); // State to keep track of which column to sort by
  const [sortDirection, setSortDirection] = useState("asc"); // State to toggle between 'asc' and 'desc'

  const formatDate = (date) => {
    const [day, month, year] = date.split("-");
    return `${year}-${month}-${day}`;
  };

  const handleFilter = async () => {
    try {
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);

      const response = await axios.get(
        `https://sample-fastapi-9xca.onrender.com/filter?start_date=${formattedStartDate}&end_date=${formattedEndDate}&min_revenue=${minRevenue}&max_revenue=${maxRevenue}&min_net_income=${minNetIncome}&max_net_income=${maxNetIncome}`
      );

      if (response.data && Array.isArray(response.data.filtered_data)) {
        setFilteredData(response.data.filtered_data);
      } else {
        setFilteredData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Sort function
  const sortData = (column) => {
    const newSortDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newSortDirection);

    const sortedData = [...filteredData].sort((a, b) => {
      if (column === "date") {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return newSortDirection === "asc" ? dateA - dateB : dateB - dateA;
      }
      const valueA = a[column];
      const valueB = b[column];

      if (newSortDirection === "asc") {
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      } else {
        return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
      }
    });

    setFilteredData(sortedData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Data Filter</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
        <div>
          <label className="block">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
        <div>
          <label className="block">Min Revenue:</label>
          <input
            type="number"
            value={minRevenue}
            onChange={(e) => setMinRevenue(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
        <div>
          <label className="block">Max Revenue:</label>
          <input
            type="number"
            value={maxRevenue}
            onChange={(e) => setMaxRevenue(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
        <div>
          <label className="block">Min Net Income:</label>
          <input
            type="number"
            value={minNetIncome}
            onChange={(e) => setMinNetIncome(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
        <div>
          <label className="block">Max Net Income:</label>
          <input
            type="number"
            value={maxNetIncome}
            onChange={(e) => setMaxNetIncome(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>

        <div className="col-span-full text-center">
          <button
            onClick={handleFilter}
            className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full sm:w-auto"
          >
            Filter
          </button>
        </div>
      </div>

      {filteredData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th
                  className="px-4 py-2 text-left cursor-pointer"
                  onClick={() => sortData("date")}
                >
                  Date {sortColumn === "date" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="px-4 py-2 text-left cursor-pointer"
                  onClick={() => sortData("revenue")}
                >
                  Revenue {sortColumn === "revenue" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="px-4 py-2 text-left cursor-pointer"
                  onClick={() => sortData("netIncome")}
                >
                  Net Income {sortColumn === "netIncome" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="px-4 py-2 text-left cursor-pointer"
                  onClick={() => sortData("eps")}
                >
                  EPS {sortColumn === "eps" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="px-4 py-2 text-left cursor-pointer"
                  onClick={() => sortData("operatingIncome")}
                >
                  Operating Income{" "}
                  {sortColumn === "operatingIncome" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{item.date}</td>
                  <td className="px-4 py-2">{item.revenue}</td>
                  <td className="px-4 py-2">{item.netIncome}</td>
                  <td className="px-4 py-2">{item.eps}</td>
                  <td className="px-4 py-2">{item.operatingIncome}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Sorting Instruction Note */}
          <p className="text-center text-gray-500 mt-4">
            Note: Click on the column headers to sort the data.
          </p>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No data available for the selected filters.</p>
      )}
    </div>
  );
};

export default App;
