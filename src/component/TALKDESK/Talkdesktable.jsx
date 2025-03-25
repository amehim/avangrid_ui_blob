import React, { useEffect, useState } from "react";
import { useTaskDesk } from "../../context/TaskdeskContextApi";
import Papa from "papaparse";

const Talkdesktable = ({selectRow}) => {
  const [data, setData] = useState([]);
  const [tablecsv, setTablecsv] = useState([]);
  const [columns, setColumns] = useState([]);
  const  {inputValues, setInputValues}=useTaskDesk();


  
    // Fetch and parse the CSV file
    const fetchCSV = async () => {
      try {
        const response = await fetch("/talkdeskdata.csv"); // Path to your CSV file
        if (!response.ok) {
          throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`);
        }
        const csvText = await response.text();

        // Parse the CSV file using PapaParse
        Papa.parse(csvText, {
          header: true, // Treat the first row as headers
          skipEmptyLines: true,
          complete: (result) => {
            const rows = result.data;
            if (rows.length > 0) {
              let columnNames = Object.keys(rows[0]);
              columnNames.pop();
  
              // Map through rows and remove the last column dynamically
              const filteredRows = rows.map(row => {
                const newRow = { ...row };
                const lastColumnKey = Object.keys(row).pop(); // Get the last column name
                delete newRow[lastColumnKey]; // Remove last column
                return newRow;
              });
              setColumns(columnNames); // Extract column names
              setData(filteredRows); // Set row data
              // console.log("filteredRows");
              // console.log(filteredRows[0]);
              setTablecsv(filteredRows);
            }
          },
        });
      } 
      catch (error) {
        console.error("Error fetching or parsing the CSV file:", error);
      }
    };
    useEffect(() => {
    fetchCSV();
  }, []);

  useEffect(()=>{
    if(data.length>0)
      {
        // console.log(data);
        
        const newData = tablecsv.filter((vl) => {
          // const hasInteractionFilter = inputValues?.["interactionId"]?.length > 0;
          // const hasRingGroupFilter = inputValues?.["ringGroups"]?.length > 0;
          // const hasTalkdeskTFN = inputValues?.["talkdeskTFN"]?.length > 0;
          // const hasAgentName = inputValues?.["agentName"]?.length > 0;
          // const hasCustomerTFN = inputValues?.["customerNumber"]?.length > 0;
          const hasDateRange = inputValues?.dateRange?.from && inputValues?.dateRange?.to?true:false;
          const hasInteractionFilter = Array.isArray(inputValues?.["interactionId"]) 
  && inputValues["interactionId"].some(value => value?.trim?.() !== "");
  const hasRingGroupFilter = Array.isArray(inputValues?.["ringGroups"]) 
  && inputValues["ringGroups"].some(value => value?.trim?.() !== "");

const hasTalkdeskTFN = Array.isArray(inputValues?.["talkdeskTFN"]) 
  && inputValues["talkdeskTFN"].some(value => value?.trim?.() !== "");

const hasAgentName = Array.isArray(inputValues?.["agentName"]) 
  && inputValues["agentName"].some(value => value?.trim?.() !== "");

const hasCustomerTFN = Array.isArray(inputValues?.["customerNumber"]) 
  && inputValues["customerNumber"].some(value => value?.trim?.() !== "");
      
          const matchesInteraction = hasInteractionFilter 
            ? inputValues["interactionId"].includes(vl["Interaction ID"]) 
            : true;
        
          const matchesRingGroup = hasRingGroupFilter 
            ? inputValues["ringGroups"].some(group => vl["Ring Groups"].toLowerCase().includes(group.toLowerCase()))
            : true;
          const matchesTalkdeskTFN = hasTalkdeskTFN
            ? inputValues["talkdeskTFN"].some(group => vl["Talkdesk Phone Number"].toLowerCase().includes(group.toLowerCase()))
            : true;
          const matchesAgentName = hasAgentName
            ? inputValues["agentName"].some(group => vl["Agent Name"].toLowerCase().includes(group.toLowerCase()))
            : true;
          const matchesCustomerTFN = hasCustomerTFN
            ? inputValues["customerNumber"].some(group => vl["Customer Phone"].toLowerCase().includes(group.toLowerCase()))
            : true;
          const matchesDateRange = hasDateRange
            ? (() => {
                const recordDate = vl["Call Start Time"].split(" ")[0]; // Extracts 'YYYY-MM-DD'
                const fromDate = inputValues.dateRange.from; // Already in 'YYYY-MM-DD' format
                const toDate = inputValues.dateRange.to; // Already in 'YYYY-MM-DD' format
                return (recordDate >= fromDate && recordDate <= toDate);
                
              })()  
            : true;
         
          // If both filters exist, return rows that match both
          // If only one filter exists, return rows that match the single filter
          if (hasInteractionFilter || hasRingGroupFilter || hasTalkdeskTFN || hasAgentName || hasCustomerTFN || hasDateRange) {
            return (
              (!hasInteractionFilter || matchesInteraction) &&
              (!hasRingGroupFilter || matchesRingGroup) &&
              (!hasTalkdeskTFN || matchesTalkdeskTFN) &&
              (!hasAgentName || matchesAgentName) &&
              (!hasCustomerTFN || matchesCustomerTFN) &&
              (!hasDateRange || matchesDateRange)
            );
          }
        
          return true;
        });
      
      // console.log("newData");
      // console.log(newData);
        setData(newData); 
    }
    else
    {
      setData(tablecsv);
    }
  },[inputValues])
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        No Records Found
      </div>
    );
  }

  return (
    <div className="p-0 overflow-x-auto max-w-full table-container mx-4" style={{ maxHeight: "40vh", overflowY: "auto" }}>
      <table className="table min-w-max w-full border border-green-200 custom-table px-4">
        <thead className="sticky top-0 bg-green-50 z-10">
          <tr>
            {Object.keys(data[0]).map((col, index) => (
              <th
                key={index}
                className="border-2 border-green-300 px-4 py-3 font-bold bg-green-100 text-green-800"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              className="transition-colors duration-200 hover:bg-green-50"
            >
              {Object.keys(row).map((col, colIndex) => (
                <td
                  key={colIndex}
                  id={rowIndex}
                  onClick={(e) => {
                    // console.log("ID");
                    // console.log(e.target.id);
                    console.log(data[e.target.id]);
                    selectRow((prev) => data[e.target.id]);
                  }}
                  className="border border-green-200 px-4 py-2 hover:bg-green-100 cursor-pointer"
                >
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Talkdesktable;
