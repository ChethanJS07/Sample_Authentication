import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login';
import Register from './register';
import Home from './homepage';
import Error from './errorpage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />}/>
        <Route path='/error' element={<Error />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;