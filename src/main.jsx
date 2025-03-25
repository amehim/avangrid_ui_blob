import React, { Suspense, lazy, useEffect } from "react";
import { createBrowserRouter, RouterProvider,useNavigate } from "react-router-dom";
import App from "./App";
import Genesys from "./component/Genesys/Genesys";
import Nice from "./component/NICE/Nice";
import VPI from "./component/VPI/VPI_PARENT";
import ReactDOM from 'react-dom/client';
import TALKDESK from "./component/TALKDESK/Talkdesk";
import ErrorPage from "./pages/ErrorPage";


// const SuspenseLoading = () => <div>Loading...</div>;

// //route => vpi,nice,genesys




// const router = createBrowserRouter([
//   {
//     path: "/",
//     errorElement:(<ErrorPage/>),
   
//     element: (
//         <App />
//     ),
//     children:[
//         {
//             path:"",
//             element:(
//                 <VPI/>
        
//             )
//           },{
//             path:"nice",
//             element:(
//                 <Nice/>
//             )
//           },
//           {
//             path:"genesys",
//             element:(
//                 <Genesys/>
//             )
//           },
//           {
//             path:"talkdesk",
//             element:(
//                 <TALKDESK/>
//             )
//           }
//     ]
//   },

// ]);

// ReactDOM.createRoot(document.getElementById('root')).render(

// <RouterProvider router={router} />)

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);