import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter as Router, Routes, Route, Link, Outlet} from "react-router";
import LoginPage from "./pages/LoginPage.jsx"
import FirstPage from "./pages/dashboard/FirstPage.jsx"
import Navbar from "./components/admin/Navbar.jsx"

import AddExchangeDocu from "./pages/exchangedocus/AddExchangeDocu.jsx"
import ExchangeDocusList from './pages/exchangedocus/ExchangeDocusList.jsx';
import EditExchangeDocu from './pages/exchangedocus/EditExchangeDocu.jsx';
import Detail from './pages/exchangerates/Detail.jsx';
import ProtectedRoute from "./ProtectedRoute";

function App() {
  // Layout with Navbar
function MainLayout() {
  return (
    <div>
      <Navbar />
      {/* Start Content Area */}
          <section>
               <div className="container-fluid">
                    <div className="row">
                         <div className="col-lg-10 col-md-9 ms-auto pt-md-5 mt-mt-3">
                         {/* Start Inner Content Area */}
                         <div className="row">
                            <Outlet /> {/* renders child route */}
                         </div>
                         {/* End Inner Content Area */}
                         </div>
                    </div>
               </div>
          </section>
          {/* End Content Area */}
 
    </div>
  );
}

  return (
    <>
      <div className="App">
          <Router>
            <Routes>

                <Route path="/login" element={<LoginPage />} />

                <Route element={<ProtectedRoute><MainLayout/></ProtectedRoute>}>
                  <Route path="/" element={<FirstPage />} />
                  <Route path="/dashboardsone" element={<FirstPage/>} />
                  
                  <Route path="/exchangedocus/create" element={<AddExchangeDocu/>} />
                  <Route path="/exchangedocus" element={<ExchangeDocusList/>} />
                  <Route path="/exchangedocus/:id/edit" element={<EditExchangeDocu/>} />

                  <Route path="/exchangerates/:id" element={< Detail/>} />
                </Route>
            </Routes>
          </Router>
      </div>
    </>
  )
}

export default App;
