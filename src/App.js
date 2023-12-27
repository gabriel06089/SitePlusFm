import React, { useState, useEffect, useRef } from 'react';
import AudioVisualizer from './Audiovisualizer';
import './App.css';
import {ReactComponent as Map} from './mapa.svg';

function App() {
  const [hover, setHover] = useState(false);
  const [currentSong, setCurrentSong] = useState({});
 
  useEffect(() => {
    const fetchSong = () => {
      fetch('https://webradio.amsolution.com.br/api/nowplaying/plus', {
        headers: {
          'Authorization': 'ec1e12625c87f3fd:3522595694202dccc04b294711eb85cd'
        }
      })
      .then(response => response.json())
      .then(data => {
        setCurrentSong(data.now_playing.song);
      })
      .catch(error => {
        console.error('Erro:', error);
      });
    }

    // Chamar a função imediatamente para obter a música atual
    fetchSong();

    // Configurar um intervalo para chamar a função a cada 10 segundos
    const intervalId = setInterval(fetchSong, 10000);

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Map 
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
          style={{ width: '100%', height: 200,}}
        />
        <div>
          <h2>Música atual:</h2>
          <p>Titulo: {currentSong.title}</p>
          <p>Artista {currentSong.artist}</p>
      
        </div>

      </header>
    </div>
  );
}

export default App;