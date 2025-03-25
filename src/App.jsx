import React, { useState } from 'react';
import "./index.css";
import Header from './component/Header';
import VPI from "./component/VPI/VPI_PARENT";
import Nice from "./component/NICE/Nice";
import Genesys from "./component/Genesys/Genesys";
import TALKDESK from "./component/TALKDESK/Talkdesk";
import LogoHeader from './component/LogoHeader';
import TaskDeskProvider from "./context/TaskdeskContextApi";

function App() {
  const [activePage, setActivePage] = useState("TALKDESK");
  
  const renderCurrentPage = () => {
    switch(activePage) {
      case "VPI":
        return <VPI />;
      case "NICE":
        return <Nice />;
      case "GENESYS":
        return <Genesys />;
      case "TALKDESK":
        return <TALKDESK />;
      default:
        return <TALKDESK />;
    }
  };

  return (
    <>
      <LogoHeader />
      <Header activePage={activePage} setActivePage={setActivePage} />
      {renderCurrentPage()}
    </>
  );
}

export default App;