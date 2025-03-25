import React from 'react'
import HTMLMetadataDisplay from './HTMLMetadataDisplay';
import Genesys_PART_ONE from './Genesys_PART_ONE';
import AudioGenesys from './AudioGenesys.jsx';

function Genesys() {
  return (
    <div className='container  p-5 flex flex-col gap-4'>
      <Genesys_PART_ONE/>
      <HTMLMetadataDisplay/>
      {/* <AudioGenesys/> */}
    </div>

  )
}

export default Genesys