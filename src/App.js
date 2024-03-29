/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useContext, useRef } from 'react';

import './App.css';
import { decode } from 'he';
import he from 'he';
import { ReactComponent as Map } from './mapa.svg';
import { ReactComponent as TwitterLogoX } from './twitter-x.svg';
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
import twitterLogoX from './twitter-x.svg';

import agrandehora from './imagemprogamacao/agrandehora.svg';
import asmaispedidas from './imagemprogamacao/asmaispedidas.svg';
import asmelhoresdaplus from './imagemprogamacao/asmelhoresdaplus.svg';
import corujaodaplus from './imagemprogamacao/corujaodaplus.svg';
import domingao from './imagemprogamacao/domingao.svg';
import clubeplus from './imagemprogamacao/clubeplus.svg';
import festaplus from './imagemprogamacao/festaplus.svg';
import manhadaplus from './imagemprogamacao/manhadaplus.svg';
import megaplus from './imagemprogamacao/megaplus.svg';
import nocolodejesusedemaria from './imagemprogamacao/nocolodejesusedemaria.svg';
import playlistdaplus from './imagemprogamacao/playlistdaplus.svg';
import redacaoplus from './imagemprogamacao/redacaoplus.svg';
import semlimitesparaamar from './imagemprogamacao/semlimitesparaamar.svg';
import tardeplus from './imagemprogamacao/tardeplus.svg';
import tatodomundoplus from './imagemprogamacao/tatodomundoplus.svg';
import timemachine from './imagemprogamacao/timemachine.svg';
import upgrade from './imagemprogamacao/upgrade.svg';
import PROGRAMAS from './imagemprogamacao/deubo.png';
import cearanews from './imagemprogamacao/cearanews.svg';
import plusmania from './imagemprogamacao/plusmania.svg';
import slowmotion from './imagemprogamacao/slowmotion.svg';
import tercodamisercordia from './imagemprogamacao/tercodamisericordia.svg';

import ouca from './ouca.svg';
import Drops from './textSVGs/drops.svg';
import ProgramasText from './textSVGs/PROGRAMAS.svg';
import Prog from './textSVGs/programa.svg';
import PromoActor from './AssetDrops/promoActor.png';
import textPromo from './textSVGs/promocoes.svg';
import mapText from './textSVGs/OndeEstamos.svg';
import textTop10 from './AssetDrops/textTop10.png';
import aoVivo from './oucaqui.svg';
import Don7 from './don7horizontal.svg';
import Logo from './plus-1.png';
import PlayStore from './playstorebadge.png';
import AppleStore from './appstorebadge.png';
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [itemsToRender, setItemsToRender] = useState(2);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth <= 600) {
      setItemsToRender(4);
    } else {
      setItemsToRender(2);
    }
  }, [windowWidth]);
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
        const response = await fetch(
          'https://plusfm.com.br/wp-json/wp/v2/posts?status&per_page=6&tags_exclude=2007'
        );
        const data = await response.json();

        // Filtra as notícias que não contêm "No ar" ou "Política" no cartola
        const filteredNews = data.filter(
          (news) =>
            !news.cartola.toLowerCase().includes('no ar') &&
            !news.cartola.toLowerCase().includes('política')
        );

        // Exibe apenas as 3 primeiras notícias após o filtro
        const limitedNews = filteredNews.slice(0, 3);

        limitedNews.forEach((news) => {
          console.log('Cartola:', news.cartola);
        });

        setNews(limitedNews);
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
  const [programas, setProgramas] = useState([]);

  useEffect(() => {
    const fetchProgramas = async () => {
      try {
        const response = await fetch(
          'https://plusfm.com.br/wp-json/wp/v2/posts?categories=2685&per_page=3'
        );
        const data = await response.json();

        data.forEach((programa) => {
          console.log('Cartola:', programa.cartola);
        });

        setProgramas(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProgramas();
  }, []);
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

  // const circleRef = useRef(null);
  // const programass = [
  //   {
  //     title: 'Corujão da Plus',
  //     days: [0, 1, 2, 3, 4, 5, 6],
  //     startHour: 0,
  //     endHour: 5,
  //     image: corujaodaplus,
  //   },
  //   {
  //     title: 'Clube Plus',
  //     days: [1, 2, 3, 4, 5],
  //     startHour: 5,
  //     endHour: 6,
  //     image: clubeplus,
  //   },
  //   {
  //     title: 'Deu B.O.',
  //     days: [1, 2, 3, 4, 5],
  //     startHour: 6,
  //     endHour: 7,
  //     image: PROGRAMAS,
  //   },
  //   {
  //     title: 'Ceará News',
  //     days: [1, 2, 3, 4, 5],
  //     startHour: 7,
  //     endHour: 8,
  //     image: cearanews,
  //   },
  //   {
  //     title: 'Ao Colo de Jesus e Maria',
  //     days: [1, 2, 3, 4, 5],
  //     startHour: 8,
  //     endHour: 9,
  //     image: nocolodejesusedemaria,
  //   },
  //   {
  //     title: 'Manhã da Plus',
  //     days: [1, 2, 3, 4, 5, 6],
  //     startHour: 9,
  //     endHour: 11,
  //     image: manhadaplus,
  //   },
  //   {
  //     title: 'Redação da Plus',
  //     days: [1, 2, 3, 4, 5],
  //     startHour: 12,
  //     endHour: 14,
  //     image: redacaoplus,
  //   },
  //   {
  //     title: 'Tarde Plus',
  //     days: [1, 2, 3, 4, 5],
  //     startHour: 14,
  //     endHour: 17,
  //     image: tardeplus,
  //   },
  //   {
  //     title: 'Tá Todo Mundo Plus',
  //     days: [1, 2, 3, 4, 5],
  //     startHour: 17,
  //     endHour: 18,
  //     image: tatodomundoplus,
  //   },
  //   {
  //     title: 'As Mais Pedidas',
  //     days: [1, 2, 3, 4, 5],
  //     startHour: 18,
  //     endHour: 19,
  //     image: asmaispedidas,
  //   },
  //   {
  //     title: 'Plus Mania',
  //     days: [1, 2, 3, 4, 5],
  //     startHour: 20,
  //     endHour: 22,
  //     image: plusmania,
  //   },
  //   {
  //     title: 'Festa Plus',
  //     days: [6],
  //     startHour: 12,
  //     endHour: 14,
  //     image: festaplus,
  //   },
  //   {
  //     title: 'Time Machine',
  //     days: [6],
  //     startHour: 21,
  //     endHour: 22,
  //     image: timemachine,
  //   },
  //   { title: 'Upgrade', days: [6], startHour: 22, endHour: 24, image: upgrade },
  //   {
  //     title: 'Playlist da Plus',
  //     days: [0],
  //     startHour: 5,
  //     endHour: 8,
  //     image: playlistdaplus,
  //   },
  //   {
  //     title: 'Domingão da Plus',
  //     days: [0],
  //     startHour: 10,
  //     endHour: 15,
  //     image: domingao,
  //   },
  //   {
  //     title: 'Mega Plus',
  //     days: [0],
  //     startHour: 15,
  //     endHour: 19,
  //     image: megaplus,
  //   },
  //   {
  //     title: 'A Grande Hora',
  //     days: [0],
  //     startHour: 19,
  //     endHour: 20,
  //     image: agrandehora,
  //   },
  //   {
  //     title: 'Sem Limites Para Amar',
  //     days: [0],
  //     startHour: 22,
  //     endHour: 24,
  //     image: semlimitesparaamar,
  //   },
  //   {
  //     title: 'As Melhores da Plus',
  //     days: [1, 2, 3, 4, 5, 6],
  //     startHour: 11,
  //     endHour: 12,
  //     image: asmelhoresdaplus,
  //   },
  //   {
  //     title: 'Slow Motion',
  //     days: [1, 2, 3, 4, 5],
  //     startHour: 22,
  //     endHour: 24,
  //     image: slowmotion,
  //   },
  // ];
  // const [currentImage, setCurrentImage] = useState('');
  // const getPrograma = () => {
  //   const currentDay = new Date().getDay();
  //   const currentHour = new Date().getHours();

  //   for (let i = 0; i < programass.length; i++) {
  //     const programa = programass[i];
  //     if (
  //       programa.days.includes(currentDay) &&
  //       currentHour >= programa.startHour &&
  //       currentHour < programa.endHour
  //     ) {
  //       return programa;
  //     }
  //   }

  //   return null;
  // };
  // useEffect(() => {
  //   const circle = circleRef.current;
  //   const radius = circle.r.baseVal.value;
  //   const circumference = radius * 2 * Math.PI;

  //   circle.style.strokeDasharray = `${circumference} ${circumference}`;
  //   circle.style.strokeDashoffset = `${circumference}`;

  //   function setProgress(percent) {
  //     const offset = circumference - (percent / 100) * circumference;
  //     circle.style.strokeDashoffset = offset;
  //   }

  //   const intervalId = setInterval(() => {
  //     const now = new Date();
  //     const currentHour = now.getHours();
  //     const currentMinute = now.getMinutes();
  //     const currentProgram = getPrograma();

  //     if (currentProgram) {
  //       const programStartHour = currentProgram.startHour;
  //       const programDuration = currentProgram.endHour - programStartHour;

  //       // Calcula o progresso com base na hora atual e na duração do programa
  //       let progress =
  //         (((currentHour - programStartHour) * 60 + currentMinute) /
  //           (programDuration * 60)) *
  //         100;

  //       // Garante que o progresso nunca ultrapasse 100%
  //       progress = Math.min(progress, 100);

  //       console.log(
  //         `Progresso do programa "${currentProgram.title}": ${progress}%`
  //       );
  //       setProgress(progress);
  //       setCurrentImage(currentProgram.image);
  //     }
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, []);
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
                PROGRAMAÇÃO
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
                <TwitterLogoX
                  className={`svgTwitter ${
                    isSidebarOpen ? 'sidebar-open' : ''
                  }`}
                  alt="Imagem do programa atual"
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

        <img
          src={Drops}
          className={`dropsImage ${isSidebarOpen ? 'sidebar-open' : ''}`}
        />
        <div className="container">
          {news.slice(0, itemsToRender).map((newsItem, index) => (
            <Link
              to={`/noticia/${newsItem.id}`}
              key={index}
              style={{ textDecoration: 'none' }}
            >
              <div
                className={
                  index === 0
                    ? 'sub-container first-news'
                    : 'sub-container second-news'
                }
              >
                {newsItem.yoast_head_json?.og_image?.[0] && (
                  <img
                    src={newsItem.yoast_head_json.og_image[0].url}
                    alt="Imagem da notícia"
                  />
                )}

                <div
                  className={
                    index === 0
                      ? 'center-div first-news'
                      : 'center-div second-news'
                  }
                >
                  <p className="center-divP">
                    {decode(newsItem.title.rendered)}
                  </p>
                  <div
                    className={
                      index === 0
                        ? 'absolute-div first-news'
                        : 'absolute-div second-news'
                    }
                  >
                    <p className="center-divPP">
                      {he.decode(newsItem.cartola)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <img
          src={ProgramasText}
          className={`programasImage ${isSidebarOpen ? 'sidebar-open' : ''}`}
        />
        <div className="container">
          {programas.slice(0, itemsToRender).map((programa, index) => (
            <Link
              to={`/noticia/${programa.id}`}
              key={index}
              style={{ textDecoration: 'none' }}
            >
              <div
                className={
                  index === 0
                    ? 'sub-container first-news'
                    : 'sub-container second-news'
                }
              >
                {programa.yoast_head_json?.og_image?.[0] && (
                  <img
                    src={programa.yoast_head_json.og_image[0].url}
                    alt="Imagem do programa"
                  />
                )}

                <div
                  className={
                    index === 0
                      ? 'center-div first-news'
                      : 'center-div second-news'
                  }
                >
                  <p className="center-divP">
                    {decode(programa.title.rendered)}
                  </p>
                  <div
                    className={
                      index === 0
                        ? 'absolute-div first-news'
                        : 'absolute-div second-news'
                    }
                  >
                    <p className="center-divPP">
                      {he.decode(programa.cartola)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <section id="programacao"></section>
      <div className="progContainer">
        <img src={Prog} className="progImage" />

        <div className="progContainerRow">
          <div className="progContainerColumn">
            <div className="progCardContainerRow">
              <div className="progBallContainer">
                {' '}
                <img src={corujaodaplus} alt="Coruja da Plus" />
              </div>

              <div className="progContainerColumn">
                <span>Corujão da Plus</span>
                <span>Segunda - Sexta</span>
                <span>00:00 - 05:50</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#8A0A0A" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer">
                <img src={clubeplus} alt="Clube Plus" />
              </div>

              <div className="progContainerColumn">
                {' '}
                <span>Clube da Plus</span>
                <span>Segunda à Sexta</span>
                <span>05:00 - 06:00</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#1221A8" />
            </div>

            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer specialHeightDeuBo">
                {' '}
                <img src={PROGRAMAS} alt="Clube Plus" />
              </div>

              <div className="progContainerColumn">
                {' '}
                <span>Deu B.O.</span>
                <span>Segunda à Sexta</span>
                <span>06:00 - 07:00</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#22D4D8" />
            </div>
            <div className="marginDiv"></div>

            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer">
                {' '}
                <img src={cearanews} alt="Clube Plus" />
              </div>

              <div className="progContainerColumn">
                <span>Ceará News</span>
                <span>Segunda à Sexta</span>
                <span>07:00 - 08:00</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#000000" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer">
                {' '}
                <img src={semlimitesparaamar} alt="Clube Plus" />
              </div>

              <div className="progContainerColumn specialHeight">
                {' '}
                <span>Sem limites para amar</span>
                <span>Segunda à Sexta</span>
                <span>12:00 - 13:00</span>
                <span>Domingo</span>
                <span>22:00 - 00:00</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#000000" />
            </div>
            <div className="marginDiv"></div>
          </div>
          <div className="progContainerColumn">
            <div className="progCardContainerRow">
              <div className="progBallContainer">
                {' '}
                <img src={nocolodejesusedemaria} alt="Clube Plus" />
              </div>

              <div className="progContainerColumn">
                {' '}
                <span>
                  No Colo de Jesus e<br />
                  de Maria
                </span>
                <span>Segunda à Sexta</span>
                <span>08:00 - 09:00</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#F4E72D" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer">
                {' '}
                <img src={manhadaplus} alt="Clube Plus" />
              </div>

              <div className="progContainerColumn">
                {' '}
                <span>Manhã Plus</span>
                <span>Segunda à Sexta</span>
                <span>09:00 - 11:00</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#0A8A0F" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer">
                {' '}
                <img src={redacaoplus} alt="Clube Plus" />
              </div>

              <div className="progContainerColumn">
                {' '}
                <span>Redação da Plus</span>
                <span>Segunda à Sexta</span>
                <span>12:00 - 14:00</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#9248FF" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer">
                {' '}
                <img src={tardeplus} alt="Clube Plus" />
              </div>

              <div className="progContainerColumn">
                {' '}
                <span>Tarde Plus</span>
                <span>Segunda à Sexta</span>
                <span>14:00 - 17:00</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#1E1E1E" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer">
                {' '}
                <img src={tatodomundoplus} alt="Clube Plus" />
              </div>

              <div className="progContainerColumn">
                {' '}
                <span>Tá Todo Mundo Plus</span>
                <span>Segunda à Sexta</span>
                <span>17:00 - 18:00</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#788A0A" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer">
                {' '}
                <img src={asmelhoresdaplus} alt="Clube Plus" />
              </div>

              <div className="progContainerColumn">
                <span>As Melhores da Plus</span>
                <span>Segunda à Sexta</span>
                <span>11:00 - 12:00</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#1E1E1E" />
            </div>
            <div className="marginDiv"></div>
          </div>

          <div className="progContainerColumn">
            <div className="progCardContainerRow">
              <div className="progBallContainer">
                {' '}
                <img src={asmaispedidas} alt="Clube Plus" />
              </div>

              <div className="progContainerColumn">
                {' '}
                <span>As Mais Pedidas</span>
                <span>Segunda à Sexta</span>
                <span>18:00 - 19:00</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#84AEFF" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer">
                {' '}
                <img src={plusmania} alt="Clube Plus" />
              </div>

              <div className="progContainerColumn">
                {' '}
                <span>Plus Mania</span>
                <span>Segunda à Sexta</span>
                <span>20:00 - 22:00</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#FF8A00" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer specialHeightFestaPlus">
                {' '}
                <img src={festaplus} alt="Clube Plus" />
              </div>

              <div className="progContainerColumn">
                {' '}
                <span>Festa Plus</span>
                <span>Sábado</span>
                <span>12:00 - 14:00</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#5C3F1C" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer">
                {' '}
                <img src={timemachine} alt="Clube Plus" />
              </div>

              <div className="progContainerColumn">
                {' '}
                <span>Time Machine</span>
                <span>Sábado</span>
                <span>21:00 - 22:00</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#8A0A66" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer">
                {' '}
                <img src={upgrade} alt="Clube Plus" />
              </div>

              <div className="progContainerColumn">
                {' '}
                <span>Upgrade</span>
                <span>Sábado</span>
                <span>22:00 - 00:00</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#FF00C7" />
            </div>

            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer specialHeightSlowMo">
                {' '}
                <img src={slowmotion} alt="Clube Plus" />
              </div>

              <div className="progContainerColumn">
                {' '}
                <span>Slow Motion</span>
                <span>Segunda à Sexta</span>
                <span>22:00 - 00:00</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#FF00C7" />
            </div>

            <div className="marginDiv"></div>
          </div>
          <div className="progContainerColumn">
            <div className="progCardContainerRow">
              <div className="progBallContainer">
                {' '}
                <img src={playlistdaplus} alt="Clube Plus" />
              </div>

              <div className="progContainerColumn">
                {' '}
                <span>Playlist da Plus</span>
                <span>Domingo</span>
                <span>
                  05:00 - 08:00
                  <br /> 20:00 - 22:00
                </span>
              </div>
              <Play size={'2vw'} weight="fill" color="#2D0B3E" />
            </div>
            <div className="marginDiv"></div>

            <div className="progCardContainerRow">
              <div className="progBallContainer">
                {' '}
                <img src={domingao} alt="Clube Plus" />
              </div>

              <div className="progContainerColumn">
                {' '}
                <span>Domingão da Plus</span>
                <span>Domingo</span>
                <span>10:00 - 15:00</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#FF4D00" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer">
                {' '}
                <img src={megaplus} alt="Clube Plus" />
              </div>

              <div className="progContainerColumn">
                {' '}
                <span>Mega Plus</span>
                <span>Domingo</span>
                <span>15:00 - 19:00</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#00FF94" />
            </div>
            <div className="marginDiv"></div>
            <div className="progCardContainerRow">
              <div className="progBallContainer">
                {' '}
                <img src={agrandehora} alt="Clube Plus" />
              </div>

              <div className="progContainerColumn">
                {' '}
                <span>A Grande Hora</span>
                <span>Domingo</span>
                <span>19:00 - 20:00</span>
              </div>
              <Play size={'2vw'} weight="fill" color="#262D6D" />
            </div>
            <div className="marginDiv"></div>
          </div>
        </div>

        {/* <div className="circleContainerRow">
          {' '}
          <div className="circle-container">
            <div className="inner-container"></div>
            <svg className="progress-ring" width="100%" height="100%">
              <circle
                className="progress-ring__inner-circle"
                stroke="white"
                strokeWidth="0.5vw"
                fill="transparent"
                r="48%" // metade do tamanho do SVG
                cx="50%" // metade do tamanho do SVG
                cy="50%" // metade do tamanho do SVG
              />
              <circle
                ref={circleRef}
                className="progress-ring__circle"
                stroke="#541084"
                strokeWidth="1vw" // reduzido de 21 para 20
                fill="transparent"
                r="48%" // reduzido de 50% para 45%
                cx="50%" // metade do tamanho do SVG
                cy="50%" // metade do tamanho do SVG
              />
            </svg>
            <img
              src={currentImage}
              alt="Imagem dentro do círculo"
              className="circle-image"
            />
          </div>
        </div> */}
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
              <img src={AppleStore} alt="Imagem 1" className="footerImage2" />
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
              <Envelope size={'8vw'} weight="thin" color="#ffc007" />
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
              <Phone size={'7vw'} weight="thin" color="#ffc007" />
              <div
                style={{
                  marginLeft: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <h6>Comercial</h6>
                  <h5 style={{ marginLeft: '20px' }}>(85) 99264-2744</h5>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <h7>WhatsApp </h7>
                  <h8 style={{ marginLeft: '20px' }}>(85) 99774-7777</h8>
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
          <img
            className={`programaAtual2 ${isSidebarOpen ? 'sidebar-open' : ''}`}
            src={twitterLogoX}
            alt="Imagem do programa atual"
          />
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
