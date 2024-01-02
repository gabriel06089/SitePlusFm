import React, { useState, useEffect, useRef } from 'react';
import AudioVisualizer from './Audiovisualizer';
import './App.css';
import { BeatLoader } from 'react-spinners';
import { ReactComponent as Map } from './mapa.svg';
import myImage from './radios1.png'; // Importe a imagem do local correto
import Logo from './plus-1.png';
import Boneco from './boneco.png';
import PlayStore from './playstore.png';
import AppleStore from './iostore.png';
import TextProg from './TextoProg.png';
import {
  CaretDown,
  PlayCircle,
  PauseCircle,
  SpeakerNone,
  SpeakerLow,
  SpeakerHigh,
  SpeakerSlash,
  House,
  FacebookLogo,
  TwitterLogo,
  InstagramLogo,
  TiktokLogo,
  YoutubeLogo,
  WhatsappLogo,
  TelegramLogo,
} from 'phosphor-react';
function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const selectRef = useRef(null);
  const [hover, setHover] = useState(false);
  const [currentSong, setCurrentSong] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [volume, setVolume] = useState(50);

  const radios = [
    {
      url: 'https://webradio.amsolution.com.br/radio/8180/aracati',
      title: 'Plus Aracati',
      isPlaying: false,
      frequency: '98.1',
      width: '70px',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8020/plus',
      title: 'Plus FM',
      isPlaying: false,
      width: '50px',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8140/cariri',
      title: 'Plus Cariri',
      isPlaying: false,
      frequency: '97.1',
      width: '60px',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8110/catarina',
      title: 'Plus Catarina',
      isPlaying: false,
      frequency: '106.1',
      width: '80px',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8120/crateus',
      title: 'Plus Crateús',
      isPlaying: false,
      frequency: '93.3',
      width: '75px',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8160/cascavel',
      title: 'Plus Cascavel',
      isPlaying: false,
      frequency: '106.1',
      width: '80px',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8070/iguatu',
      title: 'Plus Iguatu',
      isPlaying: false,
      width: '70px',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8130/pacajus',
      title: 'Plus Pacajus',
      isPlaying: false,
      frequency: '99.5',
      width: '75px',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8150/paraipaba',
      title: 'Plus Paraipaba',
      isPlaying: false,
      frequency: '88.7',
      width: '90px',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8170/santaquiteria',
      title: 'Plus Santa Quitéria',
      isPlaying: false,
      frequency: '106.5',
      width: '115px',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8030/sobral',
      title: 'Plus Sobral',
      isPlaying: false,
      frequency: '105.1',
      width: '70px',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8090/redencao',
      title: 'Plus Redenção',
      isPlaying: false,
      frequency: '98.7',
      width: '85px',
    },
    {
      url: 'https://webradio.amsolution.com.br/radio/8110/catarina',
      title: 'Plus Catarina',
      isPlaying: false,
      frequency: '88.7',
      width: '80px',
    },
  ];
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
  const [selectedRadio, setSelectedRadio] = useState(
    radios.find((radio) => radio.title === 'Plus FM')
  );
  useEffect(() => {
    function handleSvgClassClicked(event) {
      const foundRadio = radios.find(
        (radio) => radio.title === radioMap[event.detail]
      );
      if (foundRadio) {
        if (audio.current) {
          audio.current.pause(); // Pausa a rádio atual
          audio.current.src = ''; // Limpa a fonte do áudio atual
          audio.current.load(); // Recarrega o áudio
        }
        setSelectedRadio(foundRadio); // Define a nova rádio

        // Começar a carregar a nova rádio
        setIsLoading(true);
        audio.current.src = foundRadio.url;
        audio.current.load();

        // Começar a reprodução da nova rádio quando os dados de mídia suficientes foram carregados
        audio.current.onloadeddata = () => {
          audio.current.play();
          setIsPlaying(true);
          setIsLoading(false);
        };
      } else {
        console.error(`No radio found with title ${radioMap[event.detail]}`);
      }
    }

    document.addEventListener('svgClassClicked', handleSvgClassClicked);

    // Certifique-se de remover o ouvinte de evento quando o componente for desmontado
    return () => {
      document.removeEventListener('svgClassClicked', handleSvgClassClicked);
    };
  }, [radios, radioMap]);
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
    if (audio.current) {
      audio.current.volume = volume / 100;
    }
  }, [volume]);

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const renderSpeakerIcon = () => {
    if (volume < 1) {
      return (
        <SpeakerSlash
          style={{ marginInline: 16 }}
          color="white"
          size={36}
          weight="bold"
        />
      );
    } else if (volume < 20) {
      return (
        <SpeakerNone
          style={{ marginInline: 16 }}
          color="white"
          size={36}
          weight="bold"
        />
      );
    } else if (volume < 60) {
      return (
        <SpeakerLow
          style={{ marginInline: 16 }}
          color="white"
          size={36}
          weight="bold"
        />
      );
    } else {
      return (
        <SpeakerHigh
          style={{ marginInline: 16 }}
          color="white"
          size={36}
          weight="bold"
        />
      );
    }
  };
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);

  const handleSpeakerClick = () => {
    setIsVolumeVisible(!isVolumeVisible);
  };
  useEffect(() => {
    audio.current = new Audio(selectedRadio.url);
  }, [selectedRadio]);

  const handleRadioClick = (value) => {
    // Parar a reprodução da rádio atual
    if (isPlaying) {
      audio.current.pause();
      audio.current.src = '';
      audio.current.load();
      setIsPlaying(false);
    }

    // Mudar para a nova rádio
    const selectedRadio = radios.find((radio) => radio.title === value);
    setSelectedRadio(selectedRadio);

    // Começar a carregar a nova rádio
    setIsLoading(true);
    audio.current.src = selectedRadio.url;
    audio.current.load();

    // Começar a reprodução da nova rádio quando os dados de mídia suficientes foram carregados
    audio.current.onloadeddata = () => {
      audio.current.play();
      setIsPlaying(true);
      setIsLoading(false);
    };
  };
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, [selectedRadio]);

  return (
    <>
      <div className="App">
        <div className="App-Player">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={handlePlayPause}
          >
            {isLoading ? (
              <div style={{ marginRight: 16 }}>
                <BeatLoader color="#ffffff" loading={isLoading} size={8} />
              </div>
            ) : isPlaying ? (
              <PauseCircle
                style={{ marginRight: 16 }}
                color="white"
                size={36}
                weight="bold"
              />
            ) : (
              <PlayCircle
                style={{ marginRight: 16 }}
                color="white"
                size={36}
                weight="bold"
              />
            )}
          </div>
          <div className="Container-Music-Title">
            <span>Tocando agora</span>
            <div
              style={{
                height: '0.1px',
                background: 'white',
                width: 87,
                marginBlock: 3,
                marginLeft: 1.5,
              }}
            ></div>
            <span>{currentSong.title}</span>
          </div>
          <div className="VolumeControl">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={handleSpeakerClick}
            >
              {renderSpeakerIcon()}
            </div>
          </div>
          <div className="ContainerRadioList">
            <select
              value={selectedRadio.title}
              onChange={(event) => handleRadioClick(event.target.value)}
              style={{ width: selectedRadio.width }}
            >
              {radios.map((radio, index) => (
                <option key={index} value={radio.title}>
                  {radio.title}
                </option>
              ))}
            </select>
            <CaretDown />
          </div>

          {isVolumeVisible && (
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
            />
          )}
        </div>
        <header className="App-header">
          <div className="ContainerRow">
            <img src={Logo} style={{ width: '20vw', height: 'auto' }} />
            <House
              size={'4vw'}
              weight="fill"
              color="white"
              style={{ marginLeft: 32, marginRight: 8 }}
            />
            <span>Quem somo</span>
            <span>Drops</span>
            <span>Progamação</span>
            <span>Top 10</span>
            <span>Contato</span>
            <div className="InnerContainerRow">
              <FacebookLogo size={'2vw'} weight="fill" color="white" />
              <TwitterLogo size={'2vw'} weight="fill" color="white" />
              <InstagramLogo size={'2vw'} weight="fill" color="white" />
              <TiktokLogo size={'2vw'} weight="fill" color="white" />
              <YoutubeLogo size={'2vw'} weight="fill" color="white" />
              <WhatsappLogo size={'2vw'} weight="fill" color="white" />
              <TelegramLogo size={'2vw'} weight="fill" color="white" />
            </div>
          </div>
        </header>
        <div className="central-container">
          <img src={TextProg} alt="Imagem 1" className="side-image1" />
          <div className="center-image-container">
            <img src={PlayStore} alt="Imagem 2" className="center-image" />
            <img src={AppleStore} alt="Imagem 3" className="center-image" />
          </div>
          <img src={Boneco} alt="Imagem 4" className="side-image" />
        </div>

        <div style={{ position: 'relative' }}>
          <Map
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            style={{ width: '80vw', height: '100vh' }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
