import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router";
import LoginPage from "./pages/LoginPage.jsx"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
          <Router>
              <Routes>
                <Route path="/" element={<LoginPage />} />
              </Routes>
          </Router>
      </div>
    </>
  )
}

export default App
