import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/dashboard/Dashboard";
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </Router>
  );
}

export default App;
