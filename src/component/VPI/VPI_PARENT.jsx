import React, { useEffect, useState } from 'react'
import VPI_PART_ONE from './VPI_PART_ONE'
import TABLE from './VPI_TABLE'
import Audio from "./Audio";
import data from "../../Json/data";
import * as XLSX from "xlsx";
import AudioConverter from './AudioConverter';


function VPI_PARENT() {
    const [audio, setAudio] = useState(null);
    const [tableData, setTableData] = useState([...data]);
    const [dataFilter, setDateFilter] = useState({ start: '', end: '' });

function getDateWithoutTime(dateString) {
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  
  function isGreaterThanTargetDate(startTime, targetDate) {
    const startDate = getDateWithoutTime(startTime);
    const target = getDateWithoutTime(targetDate);
    console.log("DATE");
    console.log(startDate);
    console.log(target);
    return startDate < target;
  }
  

  function isLesserThanTargetDate(startTime, targetDate) {
    const startDate = getDateWithoutTime(startTime);
    const target = getDateWithoutTime(targetDate);
    return startDate > target;
  }


    function Search(){
        console.log("SEARCH");
        console.log(dataFilter["end"]);
        if (dataFilter["start"].length > 0 && dataFilter["end"].length > 0) {
            const arr=tableData.filter((vl) => {
                
                if (isGreaterThanTargetDate(dataFilter["start"],vl["startTime"]) && isLesserThanTargetDate( dataFilter["end"],vl["startTime"]) ) {
                    return true
                }
                return false
            })
            setTableData([...arr]);


        }
        else{
            setTableData([]);
        }
    }


    return (
        <div className='container  p-5 flex flex-col gap-4'>
            <VPI_PART_ONE
                setDateFilter={setDateFilter}
                dataFilter={dataFilter}
                Search={Search}

            />
            <TABLE
                setAudio={setAudio}
                data={tableData}

            />
            <div className='grid grid-cols-[80%_20%]  gap-3 item-center w-[80%] mx-auto'>
                {audio != null && <Audio
                    id={audio}
                />}

                {audio != null && <button className='btn btn-success text-white text-lg w-[50%] ml-[auto]'
                    onClick={() => {

                        if (audio != null) {
                            
                            const worksheet = XLSX.utils.json_to_sheet([data[audio]]);                          
                            const workbook = XLSX.utils.book_new();
                            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
                            XLSX.writeFile(workbook, `${"MetaData"}.xlsx`);
                        }
                    }}
                >Download</button>
                }       </div>
        {/* <AudioConverter/> */}
        </div>
    )
}

export default VPI_PARENT