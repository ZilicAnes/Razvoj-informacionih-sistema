import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import BarberDetail from './components/BarberDetail';
import AdminReservations from './components/AdminReservation';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/barber/:id" element={<BarberDetail />} />
        <Route path="/admin" element={<AdminReservations />} />

      </Routes>
    </Router>
  );
}

export default App;
