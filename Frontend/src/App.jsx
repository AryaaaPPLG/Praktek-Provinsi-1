import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Validation from "./pages/Validation";
import Cars from "./pages/Cars";
import CarDetail from "./pages/CarDetail";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/validation" element={<Validation />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/:id" element={<CarDetail />} />
      </Routes>
    </Router>
  )
}

export default App
