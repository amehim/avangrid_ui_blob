
import React, { useEffect, useState } from "react";
import Talkdesktable from './Talkdesktable'
import AudioPlayerTD from './AudioPlayerTD'
import TaskDeskProvider from '../../context/TaskdeskContextApi'
import SearchBar from './Search'
import TaskdeskCard from './TaskdeskCard'
import ApiRecordings from "./ApiRecordings";
import TalkdesktableApi from "./TalkdesktableAPI";
import ApiTalkdesk from "./ApiTalkdesk";


function talkdesk() {

  const [selectedRow, setSelectedRow] = useState({});

  return (
    <TaskDeskProvider>
      <div>
        <SearchBar />
        {/* <Talkdesktable selectRow={setSelectedRow}/> */}
        <TalkdesktableApi selectRow={setSelectedRow} />
        <div className='p-4 grid grid-cols-[40%_60%] w-[100%] mx-auto'>
          <TaskdeskCard selectedTableRow={selectedRow}/>
          <AudioPlayerTD selectedTableRow={selectedRow} />
          <ApiRecordings selectedTableRow={selectedRow} />
        </div>
        {/* <ApiTalkdesk /> */}
      </div>
    </TaskDeskProvider>
  )
}

export default talkdesk