/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useContext } from 'react';

import './App.css';
import { decode } from 'he';
import he from 'he';
import { ReactComponent as Map } from './mapa.svg';

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

import ouca from './ouca.svg';
import Drops from './textSVGs/drops.svg';
import Prog from './textSVGs/programa.svg';
import PromoActor from './AssetDrops/promoActor.png';
import textPromo from './textSVGs/promocoes.svg';
import mapText from './textSVGs/ondEstou.svg';
import textTop10 from './AssetDrops/textTop10.png';
import Don7 from './don7horizontal.svg';
import Logo from './plus-1.png';
import PlayStore from './playstore.png';
import AppleStore from './iostore.png';
import { Link } from 'react-router-dom';
import {
  House,
  FacebookLogo,
  TwitterLogo,
  InstagramLogo,
  TiktokLogo,
  YoutubeLogo,
  WhatsappLogo,
  TelegramLogo,
  Play,
  List,
  X,
  Envelope,
  Phone,
} from 'phosphor-react';
import { PlayerContext } from './Context/PlayerContext';

import { StyledImg } from './styles';
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
      if (isLoading) {
        return;
      }

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

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const cachedNews = JSON.parse(localStorage.getItem('news'));
        const response = await fetch(
          'https://plusfm.com.br/wp-json/wp/v2/posts?status&per_page=3'
        );
        const data = await response.json();
        if (
          !cachedNews ||
          new Date(data[0].modified) > new Date(cachedNews[0].modified)
        ) {
          setNews(data);
          localStorage.setItem('news', JSON.stringify(data));
        } else {
          setNews(cachedNews);
        }
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
        const cachedPromos = JSON.parse(localStorage.getItem('promos'));
        const response = await fetch(
          'https://plusfm.com.br/wp-json/wp/v2/posts?categories=14&per_page=3'
        );
        const data = await response.json();
        if (
          !cachedPromos ||
          new Date(data[0].modified) > new Date(cachedPromos[0].modified)
        ) {
          setPromos(data);
          localStorage.setItem('promos', JSON.stringify(data));
        } else {
          setPromos(cachedPromos);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPromotions();
  }, []);
  const [songsWithThumbnails, setSongsWithThumbnails] = useState([]);

  const songs = [
    {
      song: 'luan santana - mulher segura',
      url: 'https://www.youtube.com/watch?v=XJQUyfPYQNs&ab_channel=LuanSantana',
    },
    {
      song: 'menos e mais - matadinha',
      url: 'https://www.youtube.com/watch?v=skGuNpYDzmc&ab_channel=GrupoMenos%C3%A9Mais',
    },
    {
      song: 'manu bahtidao - daqui pra frente',
      url: 'https://www.youtube.com/watch?v=2FNiAPNK4Ig&ab_channel=ManuBahtid%C3%A3o',
    },
    {
      song: 'guilherme e benuto - milionario',
      url: 'https://www.youtube.com/watch?v=t5YMh8TWcKQ&ab_channel=GuilhermeeBenuto',
    },
    {
      song: 'gustavo lima - desejo imoral',
      url: 'https://www.youtube.com/watch?v=-UUe7g8-E0k&ab_channel=GusttavoLimaOficial',
    },
    {
      song: 'marcos e belutti - casal de solteiro',
      url: 'https://www.youtube.com/watch?v=tgZ3TdqGwuE&ab_channel=MarcoseBelutti',
    },
    {
      song: 'ana castela - solteiro forçado',
      url: 'https://www.youtube.com/watch?v=f58W_FVXBLg&ab_channel=AnaCastela',
    },
    {
      song: 'dilsinho - diferentao',
      url: 'https://www.youtube.com/watch?v=YRNLudNXU_c',
    },
    {
      song: 'anita - joga pra lua',
      url: 'https://www.youtube.com/watch?v=QJgSzPqUYy0&ab_channel=AnittaVEVO',
    },
    {
      song: 'simone mende - dois fugitivos',
      url: 'https://www.youtube.com/watch?v=9D3c4FlFuy8&ab_channel=SimoneMendes',
    },
  ];
  useEffect(() => {
    const fetchThumbnails = async () => {
      const newSongsWithThumbnails = songs.map((song) => {
        try {
          const videoId = new URL(song.url).searchParams.get('v');
          const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
          return { ...song, thumbnailUrl };
        } catch (error) {
          console.error(`Error fetching thumbnail for ${song.song}:`, error);
        }

        return song;
      });

      // Verifique se os novos dados são diferentes dos dados antigos
      if (
        JSON.stringify(newSongsWithThumbnails) !==
        JSON.stringify(songsWithThumbnails)
      ) {
        setSongsWithThumbnails(newSongsWithThumbnails);
      }
    };

    fetchThumbnails();
  }, [songs, songsWithThumbnails]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
        <header className={`App-header ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          <div
            className={`ContainerRow ${isSidebarOpen ? 'sidebar-open' : ''}`}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <img src={Logo} />
              <button
                className="ButtonMenu"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? (
                  <X
                    size={'8vw'}
                    color="white"
                    weight="bold"
                    className="xSvg"
                  />
                ) : (
                  <List size={'12vw'} color="white" />
                )}
              </button>
            </div>
            <span>
              <Link
                to="/drops"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                DROPS
              </Link>
            </span>
            <span>
              {' '}
              <a
                href="#programacao"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                PROGAMAÇÃO
              </a>
            </span>

            <span>
              {' '}
              <a
                href="#contato"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                CONTATO
              </a>
            </span>
            <div
              className={`InnerContainerRow ${
                isSidebarOpen ? 'sidebar-open' : ''
              }`}
            >
              <a
                href="https://www.facebook.com/plusfmrede"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookLogo
                  size={isSidebarOpen ? '6vw' : '2vw'}
                  color="white"
                />
              </a>
              <a
                href="https://twitter.com/plusfmrede_"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterLogo
                  size={isSidebarOpen ? '6vw' : '2vw'}
                  color="white"
                />
              </a>
              <a
                href="https://www.instagram.com/plusfmrede/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramLogo
                  size={isSidebarOpen ? '6vw' : '2vw'}
                  color="white"
                />
              </a>
              <a
                href="https://www.tiktok.com/@plusfmrede"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TiktokLogo
                  size={isSidebarOpen ? '6vw' : '2vw'}
                  color="white"
                />
              </a>
              <a
                href="https://www.youtube.com/channel/UC0ek2Dls6ikevIsWckZX7ZA"
                target="_blank"
                rel="noopener noreferrer"
              >
                <YoutubeLogo
                  size={isSidebarOpen ? '6vw' : '2vw'}
                  color="white"
                />
              </a>
              <a
                href="https://chat.whatsapp.com/L1iUEmsrPf7LLkJca22rut"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsappLogo
                  size={isSidebarOpen ? '6vw' : '2vw'}
                  color="white"
                />
              </a>
              <a
                href="https://t.me/redeplusfm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TelegramLogo
                  size={isSidebarOpen ? '6vw' : '2vw'}
                  color="white"
                />
              </a>
            </div>
            <div style={{ marginLeft: '6vw' }}></div>
          </div>
        </header>
        <div
          className={`central-container ${isSidebarOpen ? 'sidebar-open' : ''}`}
        >
          

          <img
            src={Boneco}
            alt="Imagem 4"
            className={`side-image ${isSidebarOpen ? 'sidebar-open' : ''}`}
          />
        </div>
        <img
          src={Drops}
          className={`dropsImage ${isSidebarOpen ? 'sidebar-open' : ''}`}
        />
        <div className="dropsContainer">
          <div className="dropsCardContainer">
            {news.slice(0, 1).map((item, index) => (
              <Link to={`/noticia/${item.id}`} key={index}>
                <div className="dropsFrontCardContainer">
                  <div className="dropsFrontCardContainerDiv">
                    <div className="dropsFrontcardContainerDivSpan">
                      {' '}
                      <span className="dropsFrontCardContainerSpanCartola">
                        {he.decode(item.cartola)}
                      </span>
                      <span className="dropsFrontCardContainerSpan">
                        {' '}
                        {he.decode(item.title.rendered)}
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
                      {he.decode(item.cartola)}
                    </div>
                    <span>{decode(item.title.rendered)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <section id="programacao"></section>
      <div className="progContainer">
        <img src={Prog} className="progImage" />

        <div className="progContainerRow">
          <div className="progContainerColumn">
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                <span>Coruja da Plus</span>
                <span>Segunda - Sexta</span>
                <span>00:00 - 04:59</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#8A0A0A" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Clube Plus</span>
                <span>Segunda à Sexta</span>
                <span>05:00 - 05:59</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#1221A8" />
            </div>

            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Deu B.O.</span>
                <span>Segunda à Sexta</span>
                <span>06:00 - 06:59</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#22D4D8" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Deu B.O.</span>
                <span>Segunda à Sexta</span>
                <span>06:00 - 06:59</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#541084" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Ceará News</span>
                <span>Segunda à Sexta</span>
                <span>07:00 - 07:59</span>
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
                <span>
                  Ao Colo de Jesus e<br /> Maria
                </span>
                <span>Segunda à Sexta</span>
                <span>08:00 - 08:59</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#F4E72D" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Manhã da Plus</span>
                <span>Segunda à Sexta</span>
                <span>09:00 - 10:59</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#0A8A0F" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Redação da Plus</span>
                <span>Segunda à Sexta</span>
                <span>12:00 - 13:59</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#9248FF" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Tarde Plus</span>
                <span>Segunda à Sexta</span>
                <span>14:00 - 16:59</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#1E1E1E" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Tá Todo Mundo Plus</span>
                <span>Segunda à Sexta</span>
                <span>17:00 - 17:59</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#788A0A" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                <span>As Melhores da Plus</span>
                <span>Segunda à Sexta</span>
                <span>11:00 - 11:59</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#1E1E1E" />
            </div>
            <div className="marginDiv"></div>
          </div>

          <div className="progContainerColumn">
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>As Mais Pedidas</span>
                <span>Segunda à Sexta</span>
                <span>18:00 - 18:59</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#84AEFF" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Plus Mania</span>
                <span>Segunda à Sexta</span>
                <span>20:00 - 21:59</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#FF8A00" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Festa Plus</span>
                <span>Sábado</span>
                <span>12:00 - 13:59</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#5C3F1C" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Time Machine</span>
                <span>Sábado</span>
                <span>21:00 - 21:59</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#8A0A66" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Upgrade</span>
                <span>Sábado</span>
                <span>22:00 - 23:59</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#FF00C7" />
            </div>

            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Slow Motion</span>
                <span>Segunda à Sexta</span>
                <span>22:00 - 23:59</span>
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
                <span>Playlist da Plus</span>
                <span>Domingo</span>
                <span>
                  05:00 - 07:59
                  <br /> 20:00 - 21:59
                </span>
              </div>
              <Play size={'2vw'} weight="fill" color="#2D0B3E" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Terço da Misericórdia</span>
                <span>Domingo</span>
                <span>08:00 - 08:59</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#FF004D" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Domingão da Plus</span>
                <span>Domingo</span>
                <span>10:00 - 14:59</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#FF4D00" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>Mega Plus</span>
                <span>Domingo</span>
                <span>15:00 - 18:59</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#00FF94" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer"></div>

              <div className="progContainerColumn">
                {' '}
                <span>A Grande Hora</span>
                <span>Domingo</span>
                <span>19:00 - 19:59</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#262D6D" />
            </div>
            <div className="marginDiv"></div>
          </div>
        </div>
      </div>

      <div className="MapContainer">
        <img src={mapText} className="mapImage" />
        <div style={{ position: 'relative' }}>
          <Map
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            style={{ width: '57vw', overflow: 'visible', cursor: 'pointer' }}
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
            <Link to={`/promocao/${promos[0]?.id}`}>
              <div className="promoCardBig" style={{ flexDirection: 'column' }}>
                {promos[0] && promos[0].yoast_head_json.og_image[0].url && (
                  <img
                    src={promos[0].yoast_head_json.og_image[0].url}
                    alt="Promo"
                  />
                )}
                {promos[0] && (
                  <span className="cartolaAbsolute">
                    {he.decode(
                      promos[0].cartola === 'Oportunidade'
                        ? 'ATIVA'
                        : 'ENCERRADA'
                    )}
                  </span>
                )}
              </div>
            </Link>
            <div className="promoContainerRow">
              {promos.slice(1).map((promo, index) => (
                <Link to={`/promocao/${promo.id}`} key={index}>
                  <div
                    className="promoCardSmall"
                    style={{ flexDirection: 'column' }}
                  >
                    {promo.yoast_head_json.og_image[0].url && (
                      <img
                        src={promo.yoast_head_json.og_image[0].url}
                        alt="Promo"
                      />
                    )}
                    <span className="cartolaAbsolute">
                      {he.decode(
                        promo.cartola === 'Oportunidade' ? 'ATIVA' : 'ENCERRADA'
                      )}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <img src={PromoActor} className="actorImage" />
        </div>
      </div>
      <section id="contato"></section>
      <div className="contato">
        <div className="footerDiv1">
          <span className="footerText">
            <span className="nossoStyle1">Baixe</span>{' '}
            <p className="nossoStyle">nosso</p>
            <p className="appStyle"> App </p>
          </span>
          <div className="imageContainer1">
            <a
              href="https://apps.apple.com/br/app/plus-fm/id1542601871"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={AppleStore} alt="Imagem 1" className="footerImage1" />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.johnallreal.PLUSFM"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={PlayStore} alt="Imagem 2" className="footerImage1" />
            </a>
          </div>
        </div>
        <div>
          <h2>Contatos</h2>
          <div className="contatoInfo">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Envelope size={'8vw'} weight="fill" color="#9248FF" />
              <div
                style={{
                  marginLeft: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <h4>comercial@plusfm.com.br</h4>
                <h4>contato@plusfm.com.br</h4>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Phone size={'7vw'} weight="fill" color="#9248FF" />
              <div
                style={{
                  marginLeft: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <h4>Comercial</h4>
                  <h4 style={{ marginLeft: '20px' }}>(85) 99264-2744</h4>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <h4>WhatsApp </h4>
                  <h4 style={{ marginLeft: '20px' }}>(85) 99774-7777</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: '#541084',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <p className="redesSociaisP">Siga a Plus nas Redes Sociais</p>
      </div>
      <div className="InnerContainerRow1">
        <a
          href="https://www.facebook.com/plusfmrede"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookLogo size={'4vw'} color="white" />
        </a>
        <a
          href="https://twitter.com/plusfmrede_"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterLogo size={'4vw'} color="white" />
        </a>
        <a
          href="https://www.instagram.com/plusfmrede/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramLogo size={'4vw'} color="white" />
        </a>
        <a
          href="https://www.tiktok.com/@plusfmrede"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TiktokLogo size={'4vw'} color="white" />
        </a>
        <a
          href="https://www.youtube.com/channel/UC0ek2Dls6ikevIsWckZX7ZA"
          target="_blank"
          rel="noopener noreferrer"
        >
          <YoutubeLogo size={'4vw'} color="white" />
        </a>
        <a
          href="https://chat.whatsapp.com/L1iUEmsrPf7LLkJca22rut"
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsappLogo size={'4vw'} color="white" />
        </a>
        <a
          href="https://t.me/redeplusfm"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TelegramLogo size={'4vw'} color="white" />
        </a>
      </div>
      <div className="footer">
        <div className="footerDiv">
          <div className="imageContainer">
            <img src={Logo} alt="Imagem 3" className="footerImage2" />
            <img src={Don7} alt="Imagem 4" className="footerImage3" />
          </div>
          <span className="footerText">
            Copyright © 2024 Plus FM - Todos os direitos reservados
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
