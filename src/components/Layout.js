import React from 'react';
import Player from './../pages/Player';
import { PlayerProvider } from '../Context/PlayerContext';

function Layout({ children }) {
  return (
    <PlayerProvider>
      <Player />
      {children}
    </PlayerProvider>
  );
}

export default Layout;
