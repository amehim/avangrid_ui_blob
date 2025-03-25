import React, { useState, useEffect, useRef } from 'react';
import { useTaskDesk } from "../../context/TaskdeskContextApi";

function TalkdesktableApi({selectRow}) {  
    const { metadata, setMetadata } = useTaskDesk();
    const [tableData, setTableData] = useState([]);
    const { inputValues, setInputValues } = useTaskDesk();
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    
    useEffect(() => {
        if(metadata.length > 0) {
          selectRow(() => {});
            const newData = metadata.filter((vl) => {
                const metadata = vl.Metadata || {};
                
                const hasDateRange = inputValues?.dateRange?.from && inputValues?.dateRange?.to ? true : false;
                const hasInteractionFilter = Array.isArray(inputValues?.["interactionId"]) &&
                  inputValues["interactionId"].some(value => value?.trim?.() !== "");
                const hasRingGroupFilter = Array.isArray(inputValues?.["ringGroups"]) &&
                  inputValues["ringGroups"].some(value => value?.trim?.() !== "");
                const hasTalkdeskTFN = Array.isArray(inputValues?.["talkdeskTFN"]) &&
                  inputValues["talkdeskTFN"].some(value => value?.trim?.() !== "");
                const hasAgentName = Array.isArray(inputValues?.["agentName"]) &&
                  inputValues["agentName"].some(value => value?.trim?.() !== "");
                const hasCustomerTFN = Array.isArray(inputValues?.["customerNumber"]) &&
                  inputValues["customerNumber"].some(value => value?.trim?.() !== "");
              
                const matchesInteraction = hasInteractionFilter
                  ? inputValues["interactionId"].includes(metadata["Interaction_ID"])
                  : true;
                
                const matchesRingGroup = hasRingGroupFilter
                  ? inputValues["ringGroups"].some(group => metadata["Tags"]?.toLowerCase().includes(group.toLowerCase()))
                  : true;
                
                const matchesTalkdeskTFN = hasTalkdeskTFN
                  ? inputValues["talkdeskTFN"].some(group => metadata["Talkdesk_Phone_Number"]?.toLowerCase().includes(group.toLowerCase()))
                  : true;
                
                const matchesAgentName = hasAgentName
                  ? inputValues["agentName"].some(group => metadata["Agent_Name"]?.toLowerCase().includes(group.toLowerCase()))
                  : true;
                
                const matchesCustomerTFN = hasCustomerTFN
                  ? inputValues["customerNumber"].some(group => metadata["Customer_Phone_Number"]?.toLowerCase().includes(group.toLowerCase()))
                  : true;
                
                const matchesDateRange = hasDateRange
                  ? (() => {
                      const recordDate = metadata["Start_Time"]?.split(" ")[0]; // Extracts 'MM/DD/YYYY'
                      const fromDate = inputValues.dateRange.from; // Expected in 'YYYY-MM-DD' format
                      const toDate = inputValues.dateRange.to;
                      const [month, day, year] = recordDate.split("/");
                      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`; // Convert to YYYY-MM-DD
                        
                    
              
                      // Convert dates to comparable formats
                      const recordDateObj = new Date(recordDate);
                      const fromDateObj = new Date(fromDate);
                      const toDateObj = new Date(toDate);
                      return formattedDate >= fromDate && formattedDate <= toDate;
                    })()
                  : true;
              
                return (
                  (!hasInteractionFilter || matchesInteraction) &&
                  (!hasRingGroupFilter || matchesRingGroup) &&
                  (!hasTalkdeskTFN || matchesTalkdeskTFN) &&
                  (!hasAgentName || matchesAgentName) &&
                  (!hasCustomerTFN || matchesCustomerTFN) &&
                  (!hasDateRange || matchesDateRange)
                );
            });
              
            setTableData(newData); 
        } else {
            console.log("Error");
        }
    }, [inputValues, metadata])
    
    console.log("new Data");    
    console.log(metadata);
    
    if (!tableData || tableData.length === 0) {
      selectRow(() => {});
        return (
            <div className="text-center text-gray-500 py-4">
                No Records Found
            </div>
        );
    }
    
    // Extract unique metadata keys from all objects
    const metadataKeys = Array.from(
        new Set(metadata.flatMap((item) => Object.keys(item.Metadata)))
    ).filter((key) => key !== "Name" && key !== "URL" && key !== "Record");
    console.log(metadataKeys);
    
    const handleRowClick = (index, item) => {
        setSelectedRowIndex(index);
        selectRow(item);
    };
    
    return (
        <div className="p-0 overflow-x-auto max-w-full table-container mx-4" style={{ maxHeight: "40vh", overflowY: "auto" }}>
            <table className="table min-w-max w-full border border-green-200 custom-table px-4">
                <thead className="sticky top-0 bg-green-50 z-10">
                    <tr>
                        {metadataKeys.map((key) => (
                            <th key={key} className="border-2 border-green-300 px-4 py-3 font-bold bg-green-100 text-green-800">
                                {key}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((item, index) => (
                        <tr 
                            key={index}  
                            className={`transition-colors duration-200 hover:bg-green-50 ${selectedRowIndex === index ? 'bg-green-600 text-white hover:bg-green-700' : ''}`}
                        >
                            {metadataKeys.map((key) => (
                                <td 
                                    key={key} 
                                    onClick={() => handleRowClick(index, item)}
                                    className={`border border-green-200 px-4 py-2 cursor-pointer ${selectedRowIndex === index ? 'text-white' : 'hover:bg-green-100'}`}
                                >
                                    {item.Metadata[key] || "-"}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TalkdesktableApi;