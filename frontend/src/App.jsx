import { Route, Routes } from "react-router-dom";

//User Management System
import SignUp from "./components/User/SignUp";
import Login from "./components/User/Login";
import GetStart from "./components/Predication/GetStart";
import About from "./components/Predication/About"

function App() {

  return (
    <div>
      <Routes>

        {/* Prediction */}
        <Route path="/getstart" element={<GetStart />} />
        <Route path="/about" element={<About />} />


        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
