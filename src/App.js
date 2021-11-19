import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChangePassword from './components/ChangePassword';
import Dashboard from './components/Dashboard';
import Signin from './components/Signin';
import AcademicRegistration from './components/NavItems/AcademicRegistration';
import FeePayment from './components/NavItems/FeePayment';
import AttendanceRegister from './components/NavItems/AttendanceRegister';
import Home from './components/NavItems/Home';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="/" element={<Home />} />
            <Route path="/academic-registration" element={<AcademicRegistration />} />
            <Route path="/fee-payment" element={<FeePayment />} />
            <Route path="/attendance-register" element={<AttendanceRegister />} />
          </Route>
          <Route exact path="/signin" element={<Signin />} />
          <Route exact path="/changePassword/:collegeid" element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
