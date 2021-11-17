import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChangePassword from './components/ChangePassword';
import Home from './components/Home';
import Signin from './components/Signin';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signin" element={<Signin />} />
          <Route exact path="/changePassword/:collegeid" element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
