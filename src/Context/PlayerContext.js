// PlayerContext.js
import React, { createContext, useState, useEffect, useRef } from 'react';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = useRef(null);

  const [volume, setVolume] = useState(50);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSong, setCurrentSong] = useState({});

  const radios = [
    {
      url: 'https://webradio.amsolution.com.br/radio/8180/aracati',
      title: 'Plus Aracati',
      isPlaying: false,
      frequency: '98.1',
      width: '9vw',
      svgClass: 'aracati',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8020/plus',
      title: 'Plus FM',
      isPlaying: false,
      width: '6vw',
      svgClass: 'fortaleza',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8140/cariri',
      title: 'Plus Cariri',
      isPlaying: false,
      frequency: '97.1',
      width: '8vw',
      svgClass: 'cariri',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8110/catarina',
      title: 'Plus Catarina',
      isPlaying: false,
      frequency: '106.1',
      width: '10vw',
      svgClass: 'catarina',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8120/crateus',
      title: 'Plus Crateús',
      isPlaying: false,
      frequency: '93.3',
      width: '9vw',
      svgClass: 'crateus',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8160/cascavel',
      title: 'Plus Cascavel',
      isPlaying: false,
      frequency: '106.1',
      width: '10vw',
      svgClass: 'cascavel',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8070/iguatu',
      title: 'Plus Iguatu',
      isPlaying: false,
      width: '8.5vw',
      svgClass: 'iguatu',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8130/pacajus',
      title: 'Plus Pacajus',
      isPlaying: false,
      frequency: '99.5',
      width: '9vw',
      svgClass: 'pacajus',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8150/paraipaba',
      title: 'Plus Paraipaba',
      isPlaying: false,
      frequency: '88.7',
      width: '11vw',
      svgClass: 'paraipaba',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8170/santaquiteria',
      title: 'Plus Santa Quitéria',
      isPlaying: false,
      frequency: '106.5',
      width: '14vw',
      svgClass: 'santaquiteira',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8030/sobral',
      title: 'Plus Sobral',
      isPlaying: false,
      frequency: '105.1',
      width: '8.5vw',
      svgClass: 'sobral',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8090/redencao',
      title: 'Plus Redenção',
      isPlaying: false,
      frequency: '98.7',
      width: '11vw',
      svgClass: 'redencao',
    },
  ];
  const [selectedRadio, setSelectedRadio] = useState(
    radios.find((radio) => radio.title === 'Plus FM')
  );
  useEffect(() => {
    const fetchSong = () => {
      fetch('https://webradio.amsolution.com.br/api/nowplaying/plus', {
        headers: {
          Authorization: 'ec1e12625c87f3fd:3522595694202dccc04b294711eb85cd',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCurrentSong(data.now_playing.song);
        })
        .catch((error) => {
          console.error('Erro:', error);
        });
    };

    // Chamar a função imediatamente para obter a música atual
    fetchSong();

    // Configurar um intervalo para chamar a função a cada 10 segundos
    const intervalId = setInterval(fetchSong, 10000);

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    audio.current = new Audio(selectedRadio.url);
  }, []);
  const handlePlayPause = () => {
    if (isPlaying) {
      console.log('Stopping audio...');
      audio.current.pause();
      audio.current.src = '';
      audio.current.load();
    } else {
      console.log('Playing audio...');
      setIsLoading(true); // Defina isLoading como true quando o áudio começar a carregar
      audio.current.src = selectedRadio.url;
      audio.current.load();
      audio.current.play();
      audio.current.onloadeddata = () => setIsLoading(false); // Defina isLoading como false quando os dados de mídia suficientes foram carregados
    }
    setIsPlaying(!isPlaying);
  };
  useEffect(() => {
    const fetchSong = () => {
      fetch('https://webradio.amsolution.com.br/api/nowplaying/plus', {
        headers: {
          Authorization: 'ec1e12625c87f3fd:3522595694202dccc04b294711eb85cd',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCurrentSong(data.now_playing.song);
        })
        .catch((error) => {
          console.error('Erro:', error);
        });
    };

    // Chamar a função imediatamente para obter a música atual
    fetchSong();

    // Configurar um intervalo para chamar a função a cada 10 segundos
    const intervalId = setInterval(fetchSong, 10000);

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, []);
  const radioMap = {
    aracati: 'Plus Aracati',
    fortaleza: 'Plus FM',
    cariri: 'Plus Cariri',
    catarina: 'Plus Catarina',
    crateus: 'Plus Crateús',
    iguatu: 'Plus Iguatu',
    pacajus: 'Plus Pacajus',
    paraipaba: 'Plus Paraipaba',
    santaquiteria: 'Plus Santa Quitéria',
    sobral: 'Plus Sobral',
    redencao: 'Plus Redenção',
    cascavel: 'Plus Cascavel',
    // Adicione todas as outras correspondências de classe para título de rádio aqui
  };
  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        audio,
        selectedRadio,
        setSelectedRadio,
        volume,
        setVolume,
        isLoading,
        setIsLoading,
        currentSong,
        setCurrentSong,
        handlePlayPause,
        radios,
        radioMap,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};