import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router";
import LoginPage from "./pages/LoginPage.jsx"
import FirstPage from "./pages/dashboard/FirstPage.jsx"
import Navbar from "./components/admin/Navbar.jsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
          <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboardsone" element={<FirstPage/>} />
              </Routes>
          </Router>
      </div>
    </>
  )
}

export default App
