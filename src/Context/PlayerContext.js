// PlayerContext.js
import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = useRef(null);

  const [volume, setVolume] = useState(50);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSong, setCurrentSong] = useState({});

  const radios = [
    {
      url: 'https://webradio.amsolution.com.br/radio/8020/plus',
      title: 'Fortaleza',
      isPlaying: false,
      width: '7vw',
      svgClass: 'fortaleza',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8030/sobral',
      title: 'Sobral',
      isPlaying: false,
      frequency: '105.1',
      width: '5vw',
      svgClass: 'sobral',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8140/cariri',
      title: 'Cariri',
      isPlaying: false,
      frequency: '97.1',
      width: '5vw',
      svgClass: 'cariri',
    },

    {
      url: 'https://webradio.amsolution.com.br/radio/8180/aracati',
      title: 'Aracati',
      isPlaying: false,
      frequency: '98.1',
      width: '9vw',
      svgClass: 'aracati',
    },

    {
      url: 'https://webradio.amsolution.com.br/radio/8160/cascavel',
      title: 'Cascavel',
      isPlaying: false,
      frequency: '106.1',
      width: '10vw',
      svgClass: 'cascavel',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8120/crateus',
      title: 'Crateús',
      isPlaying: false,
      frequency: '93.3',
      width: '9vw',
      svgClass: 'crateus',
    },

    {
      url: 'https://webradio.amsolution.com.br/radio/8070/iguatu',
      title: 'Iguatu',
      isPlaying: false,
      width: '8.5vw',
      svgClass: 'iguatu',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8130/pacajus',
      title: 'Pacajus',
      isPlaying: false,
      frequency: '99.5',
      width: '9vw',
      svgClass: 'pacajus',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8150/paraipaba',
      title: 'Paraipaba',
      isPlaying: false,
      frequency: '88.7',
      width: '11vw',
      svgClass: 'paraipaba',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8170/santaquiteria',
      title: 'Santa Quitéria',
      isPlaying: false,
      frequency: '106.5',
      width: '14vw',
      svgClass: 'santaquiteira',
    },

    {
      url: 'https://webradio.amsolution.com.br/radio/8090/redencao',
      title: 'Redenção',
      isPlaying: false,
      frequency: '98.7',
      width: '11vw',
      svgClass: 'redencao',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8110/catarina',
      title: 'Catarina',
      isPlaying: false,
      frequency: '106.1',
      width: '10vw',
      svgClass: 'catarina',
    },
  ];
  const [selectedRadio, setSelectedRadio] = useState(
    radios.find((radio) => radio.title === 'Fortaleza')
  );
  const fetchSong = useCallback(() => {
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
  }, []); // A dependência vazia significa que a função não será recriada a menos que o componente seja desmontado e remontado

  useEffect(() => {
    // Chamar a função imediatamente para obter a música atual
    fetchSong();

    // Configurar um intervalo para chamar a função a cada 10 segundos
    const intervalId = setInterval(fetchSong, 2000);

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, [fetchSong]); // Adicione fetchSong como dependência
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
    aracati: 'Aracati',
    fortaleza: 'Fortaleza',
    cariri: 'Cariri',
    catarina: 'Catarina',
    crateus: 'Crateús',
    iguatu: 'Iguatu',
    pacajus: 'Pacajus',
    paraipaba: 'Paraipaba',
    santaquiteria: 'Santa Quitéria',
    sobral: 'Sobral',
    redencao: 'Redenção',
    cascavel: 'Cascavel',
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
