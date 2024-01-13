import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NoticiaDetalhe from '../NoticiaDetalhe';
import App from '../App';
import Player from '../Player'; // Importe o componente Player
import { PlayerProvider } from '../Context/PlayerContext';
const RoutesComponent = () => {
  return (
    <PlayerProvider>
      {' '}
      <Router>
        <Player /> {/* Adicione o Player aqui */}
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/noticia/:id" element={<NoticiaDetalhe />} />
        </Routes>
      </Router>
    </PlayerProvider>
  );
};

export default RoutesComponent;
