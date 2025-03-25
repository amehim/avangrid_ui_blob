import React from 'react'
function VPI_TABLE({ setAudio,data }) {
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Start Time</th>
                            <th>Duration</th>
                            <th>Agent Name</th>
                            <th>Extension Number</th>
                            <th>Alini Number</th>
                            <th>Agent Id</th>
                            <th>Direction</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody onClick={(e) => {
                        console.log(e.target.parentElement.parentElement); // Logs the parent element
                        if (e.target.parentElement.parentElement?.id) {
                            console.log(e.target.parentElement.parentElement.id)
                            // setAudio(e.target.parentElement.parentElement.id)
                            setAudio(parseInt(e.target.parentElement.parentElement.id))

                        }
                        else {
                            window.alert("please click on text !!");
                        }



                    }}>
                        {/* row 1 */}

                        {
                            data && data.map((vl, index) => {
                                const {
                                    agentID,
                                    aniAliDigits,
                                    channelName,
                                    channelNum,
                                    direction,
                                    duration,
                                    extensionNum,
                                    resourceID,
                                    startTime,
                                    userID,
                                    fullName,
                                    Type,
                                    FileName,
                                    Result
                                } = vl
                                return <>
                                    <tr id={index}>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">

                                                <div>
                                                    <div className="font-bold">{startTime}</div>








                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="text-sm opacity-50">{duration}</div>

                                        </td>
                                        <td>
                                            <div className="text-sm opacity-50">{fullName}</div>

                                        </td>
                                        <td>
                                            <div className="text-sm opacity-50">{extensionNum}</div>

                                        </td>
                                        <td>
                                            <div className="text-sm opacity-50">{aniAliDigits}</div>

                                        </td>
                                        <td>
                                            <div className="text-sm opacity-50">{agentID}</div>

                                        </td>
                                        <th>
                                            <div className="text-sm opacity-50">{direction}</div>
                                        </th>
                                    </tr>
                                </>
                            })
                        }



                    </tbody>
                    {/* foot */}
                    {/* <tfoot>
                        <tr>
                            <th></th>
                            <th>Start Time</th>
                            <th>Duration</th>
                            <th>Agent Name</th>
                            <th>Extension Number</th>
                            <th>Alini Number</th>
                            <th>Agent Id</th>
                            <th>Direction</th>
                            <th></th>
                        </tr>
                    </tfoot> */}
                </table>
            </div>
        </div>
    )
}

export default VPI_TABLE