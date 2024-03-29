// Player.js
import React, { useState, useEffect, useRef, useContext } from 'react';
import { BeatLoader } from 'react-spinners';
import { css } from '@emotion/react';
import './App.css';
import './NoticiaDetalhe.css';
import {
  SpeakerHigh,
  SpeakerLow,
  SpeakerNone,
  SpeakerSlash,
  PauseCircle,
  PlayCircle,
  CaretDown,
} from 'phosphor-react';
import { useLocation } from 'react-router-dom';
import Logo from './plus-1.png';
import { PlayerContext } from './Context/PlayerContext'; // Importe o PlayerContext

const Player = () => {
  const {
    isPlaying,
    setIsPlaying,
    audio,
    selectedRadio,
    setSelectedRadio,
    radios,
    isLoading,
    setIsLoading,
    currentSong,
    handlePlayPause, // Adicione handlePlayPause aqui se você o adicionou ao contexto
  } = useContext(PlayerContext);

  const [volume, setVolume] = useState(50);

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
          style={{ marginInline: '2vw' }}
          color="white"
          size={'3.4vw'}
          weight="bold"
        />
      );
    } else if (volume < 20) {
      return (
        <SpeakerNone
          style={{ marginInline: '2vw' }}
          color="white"
          size={'3.4vw'}
          weight="bold"
        />
      );
    } else if (volume < 60) {
      return (
        <SpeakerLow
          style={{ marginInline: '2vw' }}
          color="white"
          size={'3.4vw'}
          weight="bold"
        />
      );
    } else {
      return (
        <SpeakerHigh
          style={{ marginInline: '2vw' }}
          color="white"
          size={'3.4vw'}
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
  const getPrograma = () => {
    const currentDay = new Date().getDay();
    const currentHour = new Date().getHours();
    let progTitle = '';

    if (
      currentDay >= 0 &&
      currentDay <= 6 &&
      currentHour >= 0 &&
      currentHour < 5
    ) {
      progTitle = 'Corujão da Plus';
    } else if (
      currentDay >= 1 &&
      currentDay <= 5 &&
      currentHour >= 5 &&
      currentHour < 6
    ) {
      progTitle = 'Clube Plus';
    } else if (
      currentDay >= 1 &&
      currentDay <= 5 &&
      currentHour >= 6 &&
      currentHour < 7
    ) {
      progTitle = 'Deu B.O.';
    } else if (
      currentDay >= 1 &&
      currentDay <= 5 &&
      currentHour >= 7 &&
      currentHour < 8
    ) {
      progTitle = 'Ceará News';
    } else if (
      currentDay >= 1 &&
      currentDay <= 6 &&
      currentHour >= 8 &&
      currentHour < 9
    ) {
      progTitle = 'Ao Colo de Jesus e Maria';
    } else if (
      currentDay >= 1 &&
      currentDay <= 6 &&
      currentHour >= 9 &&
      currentHour < 11
    ) {
      progTitle = 'Manhã da Plus';
    } else if (
      currentDay >= 1 &&
      currentDay <= 5 &&
      currentHour >= 12 &&
      currentHour < 14
    ) {
      progTitle = 'Redação da Plus';
    } else if (
      currentDay >= 1 &&
      currentDay <= 5 &&
      currentHour >= 14 &&
      currentHour < 17
    ) {
      progTitle = 'Tarde Plus';
    } else if (
      currentDay >= 1 &&
      currentDay <= 5 &&
      currentHour >= 17 &&
      currentHour < 18
    ) {
      progTitle = 'Tá Todo Mundo Plus';
    } else if (
      currentDay >= 1 &&
      currentDay <= 5 &&
      currentHour >= 18 &&
      currentHour < 19
    ) {
      progTitle = 'As Mais Pedidas';
    } else if (
      currentDay >= 1 &&
      currentDay <= 5 &&
      currentHour >= 20 &&
      currentHour < 22
    ) {
      progTitle = 'Plus Mania';
    } else if (currentDay === 6 && currentHour >= 12 && currentHour < 14) {
      progTitle = 'Festa Plus';
    } else if (currentDay === 6 && currentHour >= 21 && currentHour < 22) {
      progTitle = 'Time Machine';
    } else if (currentDay === 6 && currentHour >= 22 && currentHour < 24) {
      progTitle = 'Upgrade';
    } else if (
      currentDay === 0 &&
      ((currentHour >= 5 && currentHour < 8) ||
        (currentHour >= 20 && currentHour < 22))
    ) {
      progTitle = 'Playlist da Plus';
    } else if (currentDay === 0 && currentHour >= 8 && currentHour < 9) {
      progTitle = 'Terço da Misericórdia';
    } else if (currentDay === 0 && currentHour >= 10 && currentHour < 15) {
      progTitle = 'Domingão da Plus';
    } else if (currentDay === 0 && currentHour >= 15 && currentHour < 19) {
      progTitle = 'Mega Plus';
    } else if (currentDay === 0 && currentHour >= 19 && currentHour < 20) {
      progTitle = 'A Grande Hora';
    } else if (currentDay === 0 && currentHour >= 22 && currentHour < 24) {
      progTitle = 'Sem Limites Para Amar';
    } else if (
      currentDay >= 1 &&
      currentDay <= 6 &&
      currentHour >= 11 &&
      currentHour < 12
    ) {
      progTitle = 'As Melhores da Plus';
    } else if (
      currentDay >= 1 &&
      currentDay <= 5 &&
      currentHour >= 22 &&
      currentHour < 24
    ) {
      progTitle = 'Slow Motion';
    }

    return progTitle;
  };
  const text =
    currentSong.artist === 'PLUS FM'
      ? `PLUS FM - ${getPrograma().toUpperCase()}`
      : currentSong.artist === 'Artista Específico'
      ? 'Seu texto personalizado aqui'
      : `${currentSong.artist} - ${currentSong.title}`;

  console.log('Comprimento do texto: ', text.length);

  const isLongText = text.length > 46;
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const naTelaNoticias =
    location.pathname.startsWith('/noticia/') ||
    location.pathname.startsWith('/drops'); // Ajuste para o caminho correto
  return (
    <div className="containerPlayer">
      {!naTelaNoticias && (
        <img src={Logo} alt="Logo da Plus FM" className="App-headerImg3" />
      )}
      <div className={`App-Player ${isHomePage ? 'home' : ''}`}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={() => {
            if (!isLoading) {
              handlePlayPause();
            }
          }}
        >
          {isLoading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <BeatLoader
                loading={isLoading}
                size="2vw" // Ajuste o tamanho aqui
                color={'white'} // Ajuste a cor aqui
                css={css`
                  margin-right: 2vw; // Ajuste a margem aqui
                `}
              />
            </div>
          ) : isPlaying ? (
            <PauseCircle className="pause-circle" />
          ) : (
            <PlayCircle className="play-circle" />
          )}
        </div>
        <div className="Container-Music-Title">
          <span className="Container-Music-TitleSpan">Tocando agora</span>
          <div
            style={{
              height: '0.1vw',
              background: 'white',
              width: '10.1vw',
              marginBlock: '0.5vw',
              marginLeft: '0.2vw',
            }}
          ></div>
          <div
            className={`ContainerMusicSpanPlaying ${
              isLongText ? '' : 'static'
            }`}
          >
            <span>{text}</span>
          </div>
        </div>
        {/*         
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
</div> */}

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
          <CaretDown size={'2.5vw'} color="#541084" />
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
    </div>
  );
};

export default Player;
