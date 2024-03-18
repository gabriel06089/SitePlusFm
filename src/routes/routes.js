import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NoticiaDetalhe from '../pages/NoticiaDetalhe';
import PromoDetalhe from '../pages/PromoDetalhe';

import Programas from '../pages/Programas';
import Promocao from '../pages/Promocao';
import App from '../pages/App';
import Player from '../pages/Player';
import Drops from '../pages/Drops';
import Sobre from '../pages/Sobre';
import OndeEstamos from '../pages/OndeEstamos';
import PrincipiosEditoriais from '../pages/PrincipiosEditoriais';
import Contato from '../pages/Contato';
import Manutencao from '../pages/Manutencao';
import Programacao from '../pages/Programacao';
import { PlayerProvider } from '../Context/PlayerContext';
import PlusNews from '../pages/PlusNews';

const RoutesComponent = () => {
  return (
    <PlayerProvider>
      <Router>
        <Routes>
          <Route
            path="/programacao"
            element={
              <>
                <Player />
                <Programacao />
              </>
            }
          />
          <Route
            path="/manutencao"
            element={
              <>
                <Player />
                <Manutencao />
              </>
            }
          />
          <Route
            path="/onde-estamos"
            element={
              <>
                <Player />
                <OndeEstamos />
              </>
            }
          />
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
            path="/drops/:page?"
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
            path="/programas/:page?"
            element={
              <>
                <Player />
                <Programas />
              </>
            }
          />
          <Route
            path="/programas/page/:page"
            element={
              <>
                <Player />
                <Programas />
              </>
            }
          />
          <Route
            path="/promocao/:page?"
            element={
              <>
                <Player />
                <Promocao />
              </>
            }
          />
          <Route
            path="/plusnews/:page?"
            element={
              <>
                <Player />
                <PlusNews />
              </>
            }
          />
          <Route
            path="/promocao/page/:page"
            element={
              <>
                <Player />
                <Promocao />
              </>
            }
          />

          <Route
            path="/noticia/:id/:slug"
            element={
              <>
                <Player />
                <NoticiaDetalhe />
              </>
            }
          />
          <Route
            path="/sobre"
            element={
              <>
                {' '}
                <Player />
                <Sobre />{' '}
              </>
            }
          />
          <Route
            path="/principios-editoriais"
            element={
              <>
                {' '}
                <Player />
                <PrincipiosEditoriais />{' '}
              </>
            }
          />
          <Route
            path="/contato"
            element={
              <>
                {' '}
                <Player />
                <Contato />{' '}
              </>
            }
          />
          <Route
            path="/promocao-detalhes/:id/:slug"
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
