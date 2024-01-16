import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NoticiaDetalhe from '../NoticiaDetalhe';
import PromoDetalhe from '../PromoDetalhe';
import App from '../App';
import Player from '../Player';
import Drops from '../Drops';
import { PlayerProvider } from '../Context/PlayerContext';

const RoutesComponent = () => {
  return (
    <PlayerProvider>
      <Router>
        <Player />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Player />
                <App />
              </>
            }
          />
          <Route
            path="/drops"
            element={
              <>
                <Player />
                <Drops />
              </>
            }
          />
          <Route
            path="/drops/page/:page"
            element={
              <>
                <Player />
                <Drops />
              </>
            }
          />
          <Route
            path="/noticia/:id"
            element={
              <>
                <Player />
                <NoticiaDetalhe />
              </>
            }
          />
          <Route
            path="/promocao/:id"
            element={
              <>
                <Player />
                <PromoDetalhe />
              </>
            }
          />
        </Routes>
      </Router>
    </PlayerProvider>
  );
};

export default RoutesComponent;
