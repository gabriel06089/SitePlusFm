import { CaretLeft } from 'phosphor-react';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './OndeEstamos.css';
import { ReactComponent as Map } from './mapa.svg';
import { StyledImg, StyledRipple } from './styles';
import { PlayerContext } from './Context/PlayerContext';
import Cariri from './AssetsMap/Cariri.svg';
import Catarina from './AssetsMap/Catarina.svg';
import Cascavel from './AssetsMap/Cascavel.svg';
import Aracati from './AssetsMap/Aracati.svg';
import Crateus from './AssetsMap/Crateus.svg';
import Iguatu from './AssetsMap/Iguatu.svg';
import Pacajus from './AssetsMap/Pacajus.svg';
import Sobral from './AssetsMap/Sobral.svg';
import Redencao from './AssetsMap/Redencao.svg';
import SantaQuiteria from './AssetsMap/SantaQuiteria.svg';
import Rede from './AssetsMap/Rede.svg';
import Paraipaba from './AssetsMap/Paraipaba.svg';
import AdSense from './Adsense';
function OndeEstamos() {
  const {
    isPlaying,
    setIsPlaying,
    audio,
    selectedRadio,
    setSelectedRadio,
    radios,
    radioMap,
    isLoading,
    setIsLoading,
    currentSong,
    setCurrentSong,
    handlePlayPause, // Adicione handlePlayPause aqui se você o adicionou ao contexto
  } = useContext(PlayerContext);
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  function handleHome() {
    navigate('/');
  }
  useEffect(() => {
    function resetPlayingSvg() {
      if (selectedRadio) {
        const previousSvgElements = document.querySelectorAll(
          `.${selectedRadio.title}`
        );
        previousSvgElements.forEach(function (element) {
          element.classList.remove('playing');
          element.style.fill = ''; // Remove o estilo de preenchimento
        });
      }
    }

    function removeScaledEffect() {
      if (selectedRadio) {
        const previousSvgElements = document.querySelectorAll(
          `.${selectedRadio.title}`
        );
        previousSvgElements.forEach(function (element) {
          element.classList.remove('scaled'); // Remove a classe 'scaled'
        });
      }
    }
    function handleSvgClassClicked(event) {
      if (isLoading) {
        return;
      }

      const foundRadio = radios.find(
        (radio) => radio.title === radioMap[event.detail]
      );

      if (foundRadio) {
        if (audio.current) {
          audio.current.pause(); // Pausa a rádio atual
          resetPlayingSvg();
          removeScaledEffect(); // Chama a nova função aqui

          // Se o rádio encontrado é o mesmo que o rádio atualmente selecionado, apenas pausa a música e retorna
          if (selectedRadio && selectedRadio.title === foundRadio.title) {
            setIsPlaying(false);
            return;
          }

          // Remova a classe 'playing' da SVG da música que parou de tocar
          if (selectedRadio) {
            const previousSvgElements = document.querySelectorAll(
              `.${selectedRadio.title}`
            );
            previousSvgElements.forEach(function (element) {
              element.classList.remove('playing');
              element.style.fill = ''; // Remove o estilo de preenchimento
            });
          }

          audio.current.src = ''; // Limpa a fonte do áudio atual
          audio.current.load(); // Recarrega o áudio
        }
        setSelectedRadio(foundRadio); // Define a nova rádio

        // Adicione a classe 'playing' à SVG da música que começou a tocar
        const currentSvgElements = document.querySelectorAll(
          `.${foundRadio.title}`
        );

        currentSvgElements.forEach(function (element, index) {
          element.classList.add('playing');
          element.style.fill = 'red'; // Adiciona o estilo de preenchimento vermelho
        });

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
  }, [isLoading, radios, radioMap, selectedRadio]);

  useEffect(() => {
    var svgElement = document.querySelector('svg');
    svgElement.setAttribute('data-is-playing', isPlaying);
    svgElement.setAttribute('data-current-song', selectedRadio.title);

    // Dispare um evento personalizado
    var event = new CustomEvent('stateChanged', {
      detail: {
        isPlaying: isPlaying,
        currentSong: selectedRadio.title,
      },
    });
    svgElement.dispatchEvent(event);
  }, [isPlaying, selectedRadio]);
  return (
    <div className="mainContainer">
      <div className={`spacerDiv ${isPlaying ? 'playing' : ''}`} />
      <div className="topBackContainer">
        <button
          onClick={handleHome}
          className={`backButton1 ${isPlaying ? 'playing' : ''}`}
        >
          <CaretLeft weight="bold" />
        </button>
        <h1 className="contentTitle">Onde Estamos</h1>
      </div>
      <div className="whiteLine" />
      <div className="contentContainer">
        <div className="MapContainerOndeEstamos">
          {/* <img src={mapText} className="mapImage" /> */}

          <div style={{ position: 'relative' }}>
            <Map
              data-is-playing={isPlaying}
              data-current-song={selectedRadio.title}
              onMouseOver={() => setHover(true)}
              onMouseOut={() => setHover(false)}
              className="mapComponent"
            />
            <StyledRipple
              top="86%"
              left="60%"
              className={selectedRadio.title === 'Cariri' ? 'ripple' : ''}
            />
            <StyledImg
              src={Cariri}
              top="83%"
              left="50%"
              title="Cariri"
              selectedRadio={selectedRadio}
              className={selectedRadio.title === 'Cariri' ? 'pulsing' : ''}
            />
            <StyledRipple
              top="37%"
              left="86%"
              className={selectedRadio.title === 'Aracati' ? 'ripple' : ''}
            />
            <StyledImg
              src={Aracati}
              top="33%"
              left="81%"
              title="Aracati"
              selectedRadio={selectedRadio}
              className={selectedRadio.title === 'Aracati' ? 'pulsing' : ''}
            />
            <StyledRipple
              top="65%"
              left="27%"
              className={selectedRadio.title === 'Catarina' ? 'ripple' : ''}
            />
            <StyledImg
              src={Catarina}
              top="62%"
              left="22%"
              title="Catarina"
              selectedRadio={selectedRadio}
              className={selectedRadio.title === 'Catarina' ? 'pulsing' : ''}
            />
            <StyledRipple
              top="18%"
              left="69%"
              className={selectedRadio.title === 'Fortaleza' ? 'ripple' : ''}
            />
            <StyledImg
              src={Rede}
              top="14%"
              left="61%"
              title="Fortaleza"
              selectedRadio={selectedRadio}
              className={selectedRadio.title === 'Fortaleza' ? 'pulsing' : ''}
            />
            <StyledRipple
              top="48%"
              left="15%"
              className={selectedRadio.title === 'Crateús' ? 'ripple' : ''}
            />
            <StyledImg
              src={Crateus}
              top="44%"
              left="10%"
              title="Crateús"
              selectedRadio={selectedRadio}
              className={selectedRadio.title === 'Crateús' ? 'pulsing' : ''}
            />
            <StyledRipple
              top="70%"
              left="51%"
              className={selectedRadio.title === 'Iguatu' ? 'ripple' : ''}
            />
            <StyledImg
              src={Iguatu}
              top="67%"
              left="39%"
              title="Iguatu"
              selectedRadio={selectedRadio}
              className={selectedRadio.title === 'Iguatu' ? 'pulsing' : ''}
            />
            <StyledRipple
              top="25%"
              left="64%"
              className={selectedRadio.title === 'Pacajus' ? 'ripple' : ''}
            />
            <StyledImg
              src={Pacajus}
              top="22%"
              left="56%"
              title="Pacajus"
              selectedRadio={selectedRadio}
              className={selectedRadio.title === 'Pacajus' ? 'pulsing' : ''}
            />
            <StyledRipple
              top="13%"
              left="54%"
              className={selectedRadio.title === 'Paraipaba' ? 'ripple' : ''}
            />
            <StyledImg
              src={Paraipaba}
              top="9%"
              left="50%"
              title="Paraipaba"
              selectedRadio={selectedRadio}
              className={selectedRadio.title === 'Paraipaba' ? 'pulsing' : ''}
            />
            <StyledRipple
              top="31%"
              left="32%"
              className={
                selectedRadio.title === 'Santa Quitéria' ? 'ripple' : ''
              }
            />
            <StyledImg
              src={SantaQuiteria}
              top="27%"
              left="29%"
              title="Santa Quitéria"
              selectedRadio={selectedRadio}
              className={
                selectedRadio.title === 'Santa Quitéria' ? 'pulsing' : ''
              }
            />
            <StyledRipple
              top="18%"
              left="26%"
              className={selectedRadio.title === 'Sobral' ? 'ripple' : ''}
            />
            <StyledImg
              src={Sobral}
              top="14%"
              left="22%"
              title="Sobral"
              selectedRadio={selectedRadio}
              className={selectedRadio.title === 'Sobral' ? 'pulsing' : ''}
            />
            <StyledRipple
              top="32%"
              left="63%"
              className={selectedRadio.title === 'Redenção' ? 'ripple' : ''}
            />
            <StyledImg
              src={Redencao}
              top="28%"
              left="55%"
              title="Redenção"
              selectedRadio={selectedRadio}
              className={selectedRadio.title === 'Redenção' ? 'pulsing' : ''}
            />
            <StyledRipple
              top="30%"
              left="78%"
              className={selectedRadio.title === 'Cascavel' ? 'ripple' : ''}
            />
            <StyledImg
              src={Cascavel}
              top="27%"
              left="71%"
              title="Cascavel"
              selectedRadio={selectedRadio}
              className={selectedRadio.title === 'Cascavel' ? 'pulsing' : ''}
            />
          </div>
          <div className="container-cidades-grid">
            <div className="container-cidades-coluna">
              <h1>Sobral 105.1</h1>
              <div className="container-cidades-row">
                <h1> Forquilha</h1> <h1>Massapê</h1> <h1> Santana do Acaraú</h1>{' '}
              </div>
              <div className="container-cidades-row">
                <h1> Meruoca</h1> <h1>Alcântaras</h1> <h1> Groaíras</h1>{' '}
                <h1>Cariré</h1>{' '}
              </div>

              <div className="container-cidades-row">
                <h1>Irauçuba</h1> <h1>Coreaú</h1> <h1> Varjota</h1>{' '}
                <h1>Reriutaba</h1>{' '}
              </div>
              <div className="container-cidades-row">
                <h1>Amontada</h1> <h1>Pires ferreira</h1>
                <h1>Miraíma</h1>{' '}
              </div>
            </div>
            <div className="container-cidades-coluna">
              <h1>Cariri 97.1</h1>
              <div className="container-cidades-row">
                <h1> Juazeiro do Norte</h1> <h1> Barbalha</h1>
                <h1> Brejo Santo</h1>
              </div>
              <div className="container-cidades-row">
                <h1> Barro</h1> <h1> Nova Olinda</h1>
                <h1> Abaiara</h1>
                <h1> Crato</h1>
              </div>
              <div className="container-cidades-row">
                <h1> Caririaçu</h1> <h1> Missão Velha</h1>
                <h1> Mauriti</h1> <h1> Milagres</h1>{' '}
              </div>
            </div>
            <div className="container-cidades-coluna">
              <h1>Aracati 98.1</h1>
              <div className="container-cidades-row">
                <h1> Aracati</h1> <h1>Fortim</h1> <h1> Icapuí</h1>{' '}
              </div>
              <div className="container-cidades-row">
                <h1> Itaiçaba</h1> <h1> Jaguaruana</h1>
                <h1> Palhano</h1>{' '}
              </div>
            </div>
            <div className="container-cidades-coluna">
              <h1>Cascavel 106.1</h1>
              <div className="container-cidades-row">
                <h1> Chorozinho</h1>
                <h1> Pindoretama</h1>
              </div>
              <div className="container-cidades-row">
                <h1> Eusébio</h1> <h1> Horizonte</h1>
                <h1> Itaitinga</h1> <h1> Pacajus</h1>{' '}
              </div>
              <div className="container-cidades-row">
                <h1> Aquiraz</h1> <h1> Beberibe</h1>
              </div>
            </div>
            <div className="container-cidades-coluna">
              <h1>Crateús 93.3</h1>
              <div className="container-cidades-row">
                <h1> Ipaporanga</h1> <h1> Massapê</h1>
                <h1> Independência</h1>
              </div>
              <div className="container-cidades-row">
                <h1> Novo Oriente</h1> <h1>Tamboril</h1>
                <h1> Poranga</h1>
              </div>
              <div className="container-cidades-row">
                <h1> Catunda</h1> <h1> Nova Russas</h1>
                <h1> Quiterianópolis</h1>
              </div>
            </div>
            <div className="container-cidades-coluna">
              <h1>Iguatu 91.5</h1>
              <div className="container-cidades-row">
                <h1> Cariús</h1> <h1> Várzea Alegre</h1>
                <h1> Farias Brito</h1>
              </div>
              <div className="container-cidades-row">
                <h1> Cedro</h1> <h1>Quixelô</h1>
                <h1> Jucás</h1>
              </div>
              <div className="container-cidades-row">
                <h1> Acopiara</h1> <h1> Tarrafas</h1>
                <h1> Saboeiro</h1>
              </div>
            </div>
            <div className="container-cidades-coluna">
              <h1>Pacajus 99.5</h1>
              <div className="container-cidades-row">
                <h1> Chorozinho</h1>
              </div>
              <div className="container-cidades-row">
                <h1> Horizonte</h1> <h1>Ocara</h1>
              </div>
            </div>
            <div className="container-cidades-coluna">
              <h1>Paraipaba 88.7</h1>
              <div className="container-cidades-row">
                <h1> Paracuru</h1> <h1> São Gonçalo do Amarante</h1>{' '}
              </div>
              <div className="container-cidades-row">
                <h1> Trairi</h1>
                <h1> São Luís do Curu</h1>
              </div>
            </div>
            <div className="container-cidades-coluna">
              <h1>Redenção 98.7</h1>
              <div className="container-cidades-row">
                <h1> Acaripe</h1> <h1>Guaiúba</h1>{' '}
              </div>
              <div className="container-cidades-row">
                <h1> Barreira</h1>
                <h1> Capistrano</h1>
              </div>
            </div>
            <div className="container-cidades-coluna">
              <h1>Santa Quitéria 106.5</h1>
              <div className="container-cidades-row">
                <h1> Varjota</h1> <h1>Catunda</h1>{' '}
              </div>
              <div className="container-cidades-row">
                <h1> Hidrolândia</h1>
              </div>
            </div>
            <div className="container-cidades-coluna">
              <h1>Catarina 88.7</h1>
              <div className="container-cidades-row">
                <h1> Aiuaba</h1> <h1> Arneiroz</h1> <h1> Saboeiro</h1>
              </div>
              <div className="container-cidades-row">
                <h1> Acopiara</h1> <h1> Mombaça</h1>
              </div>
            </div>
            {/* Outros elementos .container-cidades-coluna */}
          </div>

          <div className="boxMapPropaganda" />
        </div>
      </div>
      <div className="propagandaDiv">
        <AdSense />
      </div>
    </div>
  );
}

export default OndeEstamos;
