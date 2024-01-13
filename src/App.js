/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useRef, useContext } from 'react';

import './App.css';
import { BeatLoader } from 'react-spinners';
import { ReactComponent as Map } from './mapa.svg';
import myImage from './radios1.png'; // Importe a imagem do local correto
import styled from 'styled-components';
import Logo from './plus-1.png';
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
import Boneco from './boneco.png';
import PlayStore from './playstore.png';
import AppleStore from './iostore.png';
import TextProg from './TextoProg.png';
import Drops from './AssetDrops/dropsSemFundo.png';
import Prog from './AssetDrops/progSemFundo.png';
import PromoActor from './AssetDrops/promoActor.png';
import textPromo from './textoPromo.png';
import textTop10 from './AssetDrops/textTop10.png';
import { Link } from 'react-router-dom';
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
  Play,
} from 'phosphor-react';
import { PlayerContext } from './Context/PlayerContext';
import CardTop10 from './Card';
function App() {
  const [image, setImage] = useState(null);
  const [post, setPost] = useState(null);

  const [hover, setHover] = useState(false);

  const [news, setNews] = useState([]);

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
  useEffect(() => {
    function handleSvgClassClicked(event) {
      const foundRadio = radios.find(
        (radio) => radio.title === radioMap[event.detail]
      );
      if (foundRadio) {
        if (audio.current) {
          audio.current.pause(); // Pausa a rádio atual

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
        console.log(
          `Found ${currentSvgElements.length} elements with class ${foundRadio.title}`
        );
        currentSvgElements.forEach(function (element, index) {
          console.log(`Element ${index}: ${element}`);
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
  }, [radios, radioMap, selectedRadio]);

  useEffect(() => {
    const svgElement = document.querySelector(`.${selectedRadio.svgClass}`);
    if (svgElement) {
      svgElement.classList.add('playing');
    }

    return () => {
      if (svgElement) {
        svgElement.classList.remove('playing');
      }
    };
  }, [selectedRadio]);
  const StyledImg = styled.img`
    position: absolute;
    z-index: 1;
    top: ${(props) => props.top};
    left: ${(props) => props.left};
    transform-origin: center bottom;
    pointer-events: none;
    height: 10vh;
    animation: ${(props) =>
      props.selectedRadio.title === props.title ? 'pulse 2s infinite' : ''};

    @media (max-width: 600px) {
      height: 5vh;
    }
  `;
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          'https://plusfm.com.br/wp-json/wp/v2/posts?status&per_page=3'
        );
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNews();
  }, []);
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch(
          'https://plusfm.com.br/wp-json/wp/v2/posts?categories=14&per_page=3'
        );
        const data = await response.json();
        setPromos(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPromotions();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div className="App">
        <header className="App-header">
          <div className="ContainerRowN">
            <img src={Logo} style={{ width: '20vw', paddingRight: '5vw' }} />
            <House
              size={'4vw'}
              weight="fill"
              color="white"
              style={{ marginLeft: '3.2vw', marginRight: '2vw' }}
            />
            <span>Quem somos</span>
            <span>Drops</span>
            <span>Progamação</span>
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
        <img src={Drops} className="dropsImage" />
        <div className="dropsContainer">
          <div className="dropsCardContainer">
            {news.slice(0, 1).map((item, index) => (
              <Link to={`/noticia/${item.id}`} key={index}>
                <div className="dropsFrontCardContainer">
                  <div className="dropsFrontCardContainerDiv">
                    <div className="dropsFrontcardContainerDivSpan">
                      {' '}
                      <span className="dropsFrontCardContainerSpanCartola">
                        {item.cartola}
                      </span>
                      <span className="dropsFrontCardContainerSpan">
                        {' '}
                        {item.title.rendered}
                      </span>
                    </div>
                  </div>
                  <img
                    src={item.yoast_head_json?.og_image?.[0]?.url}
                    alt="News"
                    className="dropsFrontCardContainerimg"
                  />
                </div>
              </Link>
            ))}
          </div>
          <div className="dropsContainerNoticias">
            {news.slice(1).map((item, index) => (
              <Link to={`/noticia/${item.id}`} key={index + 2}>
                <div
                  className={`dropsRowContainer ${
                    index === 0 ? 'first-row' : ''
                  }`}
                >
                  {item.yoast_head_json?.og_image?.[0] && (
                    <img
                      src={item.yoast_head_json.og_image[0].url}
                      alt="News"
                    />
                  )}
                  <div className={`dropsColumnContainer`}>
                    <div
                      className={`dropsNoArContainer dropsNoArContainer-${index}`}
                    >
                      {item.cartola}
                    </div>
                    <span>{item.title.rendered}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="progContainer">
        <img src={Prog} className="progImage" />

        <div className="progContainerRow">
          <div className="progContainerColumn">
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                <span>Progama Tal</span>
                <span>Segunda - sexta</span>
                <span>08h às 19h</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#8A0A0A" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Progama Tal</span>
                <span>Segunda - sexta</span>
                <span>08h às 19h</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#1221A8" />
            </div>

            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Progama Tal</span>
                <span>Segunda - sexta</span>
                <span>08h às 19h</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#22D4D8" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Progama Tal</span>
                <span>Segunda - sexta</span>
                <span>08h às 19h</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#541084" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Progama Tal</span>
                <span>Segunda - sexta</span>
                <span>08h às 19h</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#000000" />
            </div>
            <div className="marginDiv"></div>
          </div>
          <div className="progContainerColumn">
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Progama Tal</span>
                <span>Segunda - sexta</span>
                <span>08h às 19h</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#F4E72D" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Progama Tal</span>
                <span>Segunda - sexta</span>
                <span>08h às 19h</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#0A8A0F" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Progama Tal</span>
                <span>Segunda - sexta</span>
                <span>08h às 19h</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#9248FF" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Progama Tal</span>
                <span>Segunda - sexta</span>
                <span>08h às 19h</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#1E1E1E" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Progama Tal</span>
                <span>Segunda - sexta</span>
                <span>08h às 19h</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#788A0A" />
            </div>
            <div className="marginDiv"></div>
          </div>
          <div className="progContainerColumn">
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Progama Tal</span>
                <span>Segunda - sexta</span>
                <span>08h às 19h</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#84AEFF" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Progama Tal</span>
                <span>Segunda - sexta</span>
                <span>08h às 19h</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#FF8A00" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Progama Tal</span>
                <span>Segunda - sexta</span>
                <span>08h às 19h</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#5C3F1C" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Progama Tal</span>
                <span>Segunda - sexta</span>
                <span>08h às 19h</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#8A0A66" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Progama Tal</span>
                <span>Segunda - sexta</span>
                <span>08h às 19h</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#FF00C7" />
            </div>
            <div className="marginDiv"></div>
          </div>
          <div className="progContainerColumn">
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Progama Tal</span>
                <span>Segunda - sexta</span>
                <span>08h às 19h</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#2D0B3E" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Progama Tal</span>
                <span>Segunda - sexta</span>
                <span>08h às 19h</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#FF004D" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Progama Tal</span>
                <span>Segunda - sexta</span>
                <span>08h às 19h</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#FF4D00" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Progama Tal</span>
                <span>Segunda - sexta</span>
                <span>08h às 19h</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#00FF94" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Progama Tal</span>
                <span>Segunda - sexta</span>
                <span>08h às 19h</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#262D6D" />
            </div>
            <div className="marginDiv"></div>
          </div>
        </div>
      </div>
      <div className="MapContainer">
        <div style={{ position: 'relative' }}>
          <Map
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            style={{ width: '57vw', overflow: 'visible' }}
          />
          <StyledImg
            src={Cariri}
            top="87%"
            left="50%"
            title="Plus Cariri"
            selectedRadio={selectedRadio}
          />
          <StyledImg
            src={Aracati}
            top="35%"
            left="85%"
            title="Plus Aracati"
            selectedRadio={selectedRadio}
          />
          <StyledImg
            src={Catarina}
            top="62%"
            left="30%"
            title="Plus Catarina"
            selectedRadio={selectedRadio}
          />
          <StyledImg
            src={Rede}
            top="14%"
            left="65%"
            title="Plus FM"
            selectedRadio={selectedRadio}
          />
          <StyledImg
            src={Crateus}
            top="44%"
            left="15%"
            title="Plus Crateús"
            selectedRadio={selectedRadio}
          />
          <StyledImg
            src={Iguatu}
            top="67%"
            left="45%"
            title="Plus Iguatu"
            selectedRadio={selectedRadio}
          />
          <StyledImg
            src={Pacajus}
            top="24%"
            left="66%"
            title="Plus Pacajus"
            selectedRadio={selectedRadio}
          />
          <StyledImg
            src={Paraipaba}
            top="9%"
            left="50%"
            title="Plus Paraipaba"
            selectedRadio={selectedRadio}
          />
          <StyledImg
            src={SantaQuiteria}
            top="27%"
            left="29%"
            title="Plus Santa Quitéria"
            selectedRadio={selectedRadio}
          />
          <StyledImg
            src={Sobral}
            top="14%"
            left="22%"
            title="Plus Sobral"
            selectedRadio={selectedRadio}
          />
          <StyledImg
            src={Redencao}
            top="30%"
            left="62%"
            title="Plus Redenção"
            selectedRadio={selectedRadio}
          />
          <StyledImg
            src={Cascavel}
            top="27%"
            left="76%"
            title="Plus Cascavel"
            selectedRadio={selectedRadio}
          />
        </div>
      </div>
      <div className="promoContainer">
        <img src={textPromo} className="textProgImg" />
        <div className="promoActorRow">
          <div className="promoContainerColumn">
            <div className="promoCardBig" style={{ flexDirection: 'column' }}>
              {promos[0] && promos[0].yoast_head_json.og_image[0].url && (
                <img
                  src={promos[0].yoast_head_json.og_image[0].url}
                  alt="Promo"
                />
              )}
              {promos[0] && (
                <span className="cartolaAbsolute">
                  {promos[0].cartola === 'Oportunidade' ? 'ATIVA' : 'ENCERRADA'}
                </span>
              )}
            </div>
            <div className="promoContainerRow">
              {promos.slice(1).map((promo, index) => (
                <div
                  className="promoCardSmall"
                  style={{ flexDirection: 'column' }}
                  key={index}
                >
                  {promo.yoast_head_json.og_image[0].url && (
                    <img
                      src={promo.yoast_head_json.og_image[0].url}
                      alt="Promo"
                    />
                  )}
                  <span className="cartolaAbsolute">
                    {promos.cartola === 'Oportunidade' ? 'ATIVA' : 'ENCERRADA'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <img src={PromoActor} />
        </div>
      </div>
      <div className="top10Container">
        <img src={textTop10} className="imgTop10" />
        <div className="top10CardsContainer">
          <div className="mainCard">
            <div className="smallCard smallCard1"> <CardTop10/></div>
            <div className="smallCard smallCard2">Card pequeno 2</div>Card
            principal <div className="smallCard smallCard3">Card pequeno 3</div>
            <div className="smallCard smallCard4">Card pequeno 4</div>
            <div className="smallCard smallCard5">Card pequeno 5</div>
            <div className="smallCard smallCard6">Card pequeno 6</div>
            <div className="smallCard smallCard7">Card pequeno 7</div>
            <div className="smallCard smallCard8">Card pequeno 8</div>
            <div className="smallCard smallCard9">Card pequeno 9</div>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default App;
