import { useState } from "react";
import { useTaskDesk } from "../../context/TaskdeskContextApi";

export default function SearchBar() {
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [filters, setFilters] = useState({
    interactionId: [],
    ringGroups: [],
    talkdeskTFN: [],
    customerNumber: [],
    agentName: [],
    // duration: [],
  });
  const [isOpen, setIsOpen] = useState(false);
  const { inputValues, setInputValues } = useTaskDesk();

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value.split(",") }));
    // if (key === "interactionId" && value.length > 0 && value.length < 32) {
    //   return "Provide a valid InteractionId";
    // }
    // return "";
  };


  const handleSearch = () => {
    const values = Object.keys(filters).reduce((acc, key) => {
      if (filters[key].length > 0) {
        acc[key] = filters[key];
      }
      if (dateRange.from && dateRange.to) {
        acc.dateRange = dateRange;
      }
      return acc;
    }, {});

    setInputValues(prev => values);
    console.log(inputValues);
  };

  return (
    <div className="w-full px-4 mb-6">
      <div className="w-full bg-white rounded-lg shadow-md">
        <div 
          className="flex items-center justify-between cursor-pointer p-3 rounded-t-lg transition-colors duration-300 ease-in-out hover:bg-gray-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-sm font-medium text-gray-600">
            {isOpen ? "Hide Search Options" : "Show Search Options"}
          </span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>

        {isOpen && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-b-lg">
            {/* Date Range */}
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-xs text-gray-600 mb-1">From Date</label>
                <input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange((prev) => ({ ...prev, from: e.target.value }))}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-600 mb-1">To Date</label>
                <input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange((prev) => ({ ...prev, to: e.target.value }))}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(filters).map((key) => (
                <div key={key} className="flex flex-col">
                  <label className="text-xs text-gray-600 mb-1 capitalize">{key}</label>
                  <input
                    type="text"
                    placeholder={`Enter ${key}`}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  />
                </div>
              ))}
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="w-full mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-300"
            >
              Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}