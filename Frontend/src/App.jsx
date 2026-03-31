import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Validation from "./pages/Validation";
import Cars from "./pages/Cars";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/validation" element={<Validation />} />
        <Route path="/cars" element={<Cars />} />
      </Routes>
    </Router>
  )
}

export default App
