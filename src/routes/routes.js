import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NoticiaDetalhe from '../NoticiaDetalhe';
import App from '../App';

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/noticia/:id" element={<NoticiaDetalhe />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
