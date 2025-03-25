import React from 'react'

function VPI_PART_ONE({
    dataFilter,
    setDateFilter,
    Search
}) {




    return (
        <div className='container grid grid-cols-5 items-center gap-3 w-[100%] ' >
            <div className='startdate'>
                <label className='font-bold text-gray-600'>Start Date</label>
                <input type="date" className="input input-bordered w-full max-w-xs" 
                onChange={(e)=>{
                    console.log("Start Date");
                    console.log(e.target);
                    setDateFilter({...dataFilter,start:e.target.value})

                }}
                />

            </div>
            <div className='end_date'>
            <label className='font-bold text-gray-600'
             
            >End Date</label>

                <input type="date" name="endDate" id="endDate" className="input input-bordered w-full max-w-xs" 
                onChange={(e)=>{
                    console.log("END DATE");
                    console.log(e.target);
                    setDateFilter({...dataFilter,end:e.target.value})
    
    
    
                }}
                />

            </div>
            <div className='w-[100%]'>
            <label className='font-bold text-gray-600'>Parameter</label>

               
                <select className="select select-bordered w-full max-w-xs">
                    <option>Agent Id</option>
                    <option>Duration</option>
                    <option>Full Name</option>
                    <option>Extension Number</option>
                    <option>ANI ALI Number</option>
                </select>

            </div>

            <div>
            <label className='font-bold text-gray-600'>value</label>

                <input type="text" className="input input-bordered w-full max-w-xs" />
            </div>

            <div className='w-[100%] flex justify-end'>

                <button className='btn btn-success w-[70%] text-white my-auto' onClick={()=>{
                    Search();
                }}>Search</button>

            </div>

        </div>
    )
}

export default VPI_PART_ONE