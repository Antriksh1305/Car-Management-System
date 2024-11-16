import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// styles
import './App.css';

// pages
import Login from './pages/login';
import Register from './pages/register';
import Products from './pages/products';
// import CarDetails from './pages/CarDetails';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/products' element={<Products />} />
        {/* <Route index path='/' element={<Home />} />
        <Route path="/event/:id" element={<Event />} />
        <Route path="/user-register" element={<Register user={true} />} />
        <Route path="/user-login" element={<Login user={true} />} />
        <Route path='/bookmarks' element={<Bookmarks />} />
        <Route path='/registered-events' element={<RegisteredEvents />} />
        <Route path="/organiser-register" element={<Register user={false} />} />
        <Route path="/organiser-login" element={<Login user={false} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/update-event/:id" element={<UpdateEvent />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;