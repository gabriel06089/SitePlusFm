// Player.js
import React, { useState, useEffect, useRef, useContext } from 'react';
import { BeatLoader } from 'react-spinners';
import './App.css';
import {
  SpeakerHigh,
  SpeakerLow,
  SpeakerNone,
  SpeakerSlash,
  PauseCircle,
  PlayCircle,
  CaretDown,
} from 'phosphor-react';

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
          size={'5vw'}
          weight="bold"
        />
      );
    } else if (volume < 20) {
      return (
        <SpeakerNone
          style={{ marginInline: '2vw' }}
          color="white"
          size={'5vw'}
          weight="bold"
        />
      );
    } else if (volume < 60) {
      return (
        <SpeakerLow
          style={{ marginInline: '2vw' }}
          color="white"
          size={'5vw'}
          weight="bold"
        />
      );
    } else {
      return (
        <SpeakerHigh
          style={{ marginInline: '2vw' }}
          color="white"
          size={'5vw'}
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

  return (
    <div className="containerPlayer">
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
            <div style={{ marginRight: '2vw' }}>
              <BeatLoader color="#ffffff" loading={isLoading} size={8} />
            </div>
          ) : isPlaying ? (
            <PauseCircle
              style={{ marginRight: '2vw' }}
              color="white"
              size={'5vw'}
              weight="bold"
            />
          ) : (
            <PlayCircle
              style={{ marginRight: '2vw' }}
              color="white"
              size={'5vw'}
              weight="bold"
            />
          )}
        </div>
        <div className="Container-Music-Title">
          <span className="Container-Music-TitleSpan">Tocando agora</span>
          <div
            style={{
              height: '0.1px',
              background: 'white',
              width: '10.1vw',
              marginBlock: '0.5vw',
              marginLeft: '0.2vw',
            }}
          ></div>
          <span className="ContainerMusicSpanPlaying">
            {currentSong.artist} - {currentSong.title}
          </span>
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
          <CaretDown size={'2.5vw'} />
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
