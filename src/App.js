/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useContext } from 'react';

import './App.css';

import { ReactComponent as Map } from './mapa.svg';

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
              <img src={Logo} style={{ paddingRight: '15vw' }} />
              <button
                className="ButtonMenu"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? (
                  <X size={'12vw'} color="white" />
                ) : (
                  <List size={'12vw'} color="white" />
                )}
              </button>
            </div>

            <span>DROPS</span>
            <span>PROGAMAÇÃO</span>
            <span>CONTATO</span>
            <div
              className={`InnerContainerRow ${
                isSidebarOpen ? 'sidebar-open' : ''
              }`}
            >
              <FacebookLogo
                size={isSidebarOpen ? '6vw' : '2vw'}
                color="white"
              />
              <TwitterLogo size={isSidebarOpen ? '6vw' : '2vw'} color="white" />
              <InstagramLogo
                size={isSidebarOpen ? '6vw' : '2vw'}
                color="white"
              />
              <TiktokLogo size={isSidebarOpen ? '6vw' : '2vw'} color="white" />
              <YoutubeLogo size={isSidebarOpen ? '6vw' : '2vw'} color="white" />
              <WhatsappLogo
                size={isSidebarOpen ? '6vw' : '2vw'}
                color="white"
              />
              <TelegramLogo
                size={isSidebarOpen ? '6vw' : '2vw'}
                color="white"
              />
            </div>
            <div style={{ marginLeft: '6vw' }}></div>
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
                    {promos[0].cartola === 'Oportunidade'
                      ? 'ATIVA'
                      : 'ENCERRADA'}
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
                      {promos.cartola === 'Oportunidade'
                        ? 'ATIVA'
                        : 'ENCERRADA'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <img src={PromoActor} />
        </div>
      </div>
      <div className="top10Container">
        <img src={textTop10} className="imgTop10" />
        <div className="mainCard">
          {songsWithThumbnails[0] && (
            <a
              href={songsWithThumbnails[0].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={songsWithThumbnails[0].thumbnailUrl}
                alt={songsWithThumbnails[0].song}
              />
            </a>
          )}
          {songsWithThumbnails.slice(1, 9).map((song, index) => (
            <div key={index} className={`smallCard smallCard${index + 1}`}>
              <a href={song.url} target="_blank" rel="noopener noreferrer">
                <img src={song.thumbnailUrl} alt={song.song} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
