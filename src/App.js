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
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
import Xlogo from './twitter-x.svg';
import FoneDeOuvido from './FoneDeOuvido.png';
import PingGoogle from './PingGoogle.png';
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
  PlayCircle,
  PauseCircle,
  CalendarPlus,
} from 'phosphor-react';
import { PlayerContext } from './Context/PlayerContext';

import { StyledImg, StyledRipple } from './styles';
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
  const [carregando, setCarregando] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const animationDelays = [...Array(50)].map(() => ({
    animationDelay: `${Math.random() * 1000}ms`,
  }));
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [itemsToRender, setItemsToRender] = useState(2);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentProgram, setCurrentProgram] = useState(null);
  const [currentProgramStartHour, setCurrentProgramStartHour] = useState(null);
  const [currentProgramEndHour, setCurrentProgramEndHour] = useState(null);
  const checkScroll = () => {
    // Verifique se a página foi rolada mais de 100 pixels
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScroll);

    // Limpe o evento ao desmontar o componente
    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
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
      setCarregando(true);
      try {
        const response = await fetch(
          'https://plusfm.com.br/wp-json/wp/v2/posts?status&per_page=3&tags_exclude=2007'
        );
        const data = await response.json();

        const filteredNews = data.filter(
          (news) =>
            !news.cartola.toLowerCase().includes('no ar') &&
            !news.cartola.toLowerCase().includes('política')
        );

        const limitedNews = filteredNews.slice(0, 3);

        limitedNews.forEach((news) => {});

        setNews(limitedNews);
      } catch (error) {
        console.error(error);
      } finally {
        setCarregando(false);
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

        data.forEach((programa) => {});

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

  const programass = [
    {
      title: 'Corujão da Plus',
      days: [0, 1, 2, 3, 4, 5, 6],
      startHour: 0,
      endHour: 5,
      image: corujaodaplus,
    },
    {
      title: 'Clube Plus',
      days: [1, 2, 3, 4, 5],
      startHour: 5,
      endHour: 6,
      image: clubeplus,
    },
    {
      title: 'Deu B.O.',
      days: [1, 2, 3, 4, 5],
      startHour: 6,
      endHour: 7,
      image: PROGRAMAS,
    },
    {
      title: 'Ceará News',
      days: [1, 2, 3, 4, 5],
      startHour: 7,
      endHour: 8,
      image: cearanews,
    },
    {
      title: 'Ao Colo de Jesus e Maria',
      days: [1, 2, 3, 4, 5],
      startHour: 8,
      endHour: 9,
      image: nocolodejesusedemaria,
    },
    {
      title: 'Manhã da Plus',
      days: [1, 2, 3, 4, 5, 6],
      startHour: 9,
      endHour: 11,
      image: manhadaplus,
    },
    {
      title: 'Redação da Plus',
      days: [1, 2, 3, 4, 5],
      startHour: 12,
      endHour: 14,
      image: redacaoplus,
    },
    {
      title: 'Tarde Plus',
      days: [1, 2, 3, 4, 5],
      startHour: 14,
      endHour: 17,
      image: tardeplus,
    },
    {
      title: 'Tá Todo Mundo Plus',
      days: [1, 2, 3, 4, 5],
      startHour: 17,
      endHour: 18,
      image: tatodomundoplus,
    },
    {
      title: 'As Mais Pedidas',
      days: [1, 2, 3, 4, 5],
      startHour: 18,
      endHour: 19,
      image: asmaispedidas,
    },
    {
      title: 'A Voz do Brasil',
      days: [1, 2, 3, 4, 5],
      startHour: 19,
      endHour: 20,
    },
    {
      title: 'Plus Mania',
      days: [1, 2, 3, 4, 5],
      startHour: 20,
      endHour: 22,
      image: plusmania,
    },
    {
      title: 'Festa Plus',
      days: [6],
      startHour: 12,
      endHour: 14,
      image: festaplus,
    },
    {
      title: 'Time Machine',
      days: [6],
      startHour: 21,
      endHour: 22,
      image: timemachine,
    },
    { title: 'Upgrade', days: [6], startHour: 22, endHour: 24, image: upgrade },
    {
      title: 'Playlist da Plus',
      days: [0],
      startHour: 5,
      endHour: 8,
      image: playlistdaplus,
    },
    {
      title: 'Domingão da Plus',
      days: [0],
      startHour: 10,
      endHour: 15,
      image: domingao,
    },
    {
      title: 'Mega Plus',
      days: [0],
      startHour: 15,
      endHour: 19,
      image: megaplus,
    },
    {
      title: 'A Grande Hora',
      days: [0],
      startHour: 19,
      endHour: 20,
      image: agrandehora,
    },
    {
      title: 'Sem Limites Para Amar',
      days: [0],
      startHour: 22,
      endHour: 24,
      image: semlimitesparaamar,
    },
    {
      title: 'As Melhores da Plus',
      days: [1, 2, 3, 4, 5, 6],
      startHour: 11,
      endHour: 12,
      image: asmelhoresdaplus,
    },
    {
      title: 'Slow Motion',
      days: [1, 2, 3, 4, 5],
      startHour: 22,
      endHour: 24,
      image: slowmotion,
    },
  ];
  const [currentImage, setCurrentImage] = useState('');
  const [currentProgramTitle, setCurrentProgramTitle] = useState('');
  const getPrograma = () => {
    const currentDay = new Date().getDay();
    const currentHour = new Date().getHours();

    for (let i = 0; i < programass.length; i++) {
      const programa = programass[i];
      if (
        programa.days.includes(currentDay) &&
        currentHour >= programa.startHour &&
        currentHour < programa.endHour
      ) {
        setCurrentProgramTitle(programa.title);
        setCurrentProgramStartHour(programa.startHour);
        setCurrentProgramEndHour(programa.endHour);
        return programa;
      }
    }

    setCurrentProgramTitle('Nenhum programa selecionado');
    setCurrentProgramStartHour(null);
    setCurrentProgramEndHour(null);
    return null;
  };

  useEffect(() => {
    // ...resto do código...

    const intervalId = setInterval(() => {
      // ...resto do código...

      if (currentProgram) {
        // ...resto do código...
        setCurrentImage(currentProgram.image);
        setCurrentProgramStartHour(currentProgram.startHour);
        setCurrentProgramEndHour(currentProgram.endHour);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  const circleRef = useRef(null);
  useEffect(() => {
    const circle = circleRef.current;

    if (!circle) return;

    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    function setProgress(percent) {
      const offset = circumference - (percent / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    }

    const intervalId = setInterval(() => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentProgram = getPrograma();

      if (currentProgram) {
        const programStartHour = currentProgram.startHour;
        const programDuration = currentProgram.endHour - programStartHour;

        // Calcula o progresso com base na hora atual e na duração do programa
        let progress =
          (((currentHour - programStartHour) * 60 + currentMinute) /
            (programDuration * 60)) *
          100;

        // Garante que o progresso nunca ultrapasse 100%
        progress = Math.min(progress, 100);

        setProgress(progress);
        setCurrentImage(currentProgram.image);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [circleRef.current]);
  function formatHour(hour) {
    let formattedHour = hour < 10 ? `0${hour}:00` : `${hour}:00`;

    if (formattedHour === '24:00') {
      formattedHour = '00:00';
    }

    return formattedHour;
  }

  window.addEventListener('scroll', function () {
    const player = document.querySelector('.App-Player');
    if (window.scrollY > 100) {
      player.classList.add('scrolled');
    } else {
      player.classList.remove('scrolled');
    }
  });
  const [mostrar, setMostrar] = useState(false);
  const naTelaNoticias = window.location.pathname.startsWith('/noticias');
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Mostra apenas um slide de cada vez
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 20000,
  };
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('noScroll');
    } else {
      document.body.classList.remove('noScroll');
    }
  }, [isMenuOpen]);
  useEffect(() => {
    // Simula o carregamento de dados que leva 3 segundos
    setTimeout(() => {
      setCarregando(false);
    }, 2200);
  }, []);

  if (carregando) {
    return (
      <div className="loader-container1">
        <img className="loader-logo" src={Logo} alt="Logo" />
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="loader-bar"
            style={{ '--delay': `${Math.sin(i + Math.random()) * 0.2}s` }}
          />
        ))}
      </div>
    );
  }
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
        <div className="promoContainerNew1">
          <div
            className={`logoMenuDivRow ${isMenuOpen ? 'fixed' : ''} ${
              isPlaying ? 'playing' : ''
            } ${isPlaying && isMenuOpen ? 'playingAndMenuOpen' : ''}`}
          >
            <img src={Logo} />
            {isMenuOpen ? (
              <X weight="bold" onClick={() => setIsMenuOpen(false)} />
            ) : (
              <List weight="bold" onClick={() => setIsMenuOpen(true)} />
            )}
          </div>
          <div className={`fullScreenMenu ${isMenuOpen ? 'open' : ''}`}>
            <div className="menuOpenContainerColumn">
              <Link to="/">
                <h1>Home</h1>
              </Link>
              <Link to="/sobre">
                <h1>Quem Somos</h1>
              </Link>
              <Link to="/drops">
                <h1>Drops</h1>
              </Link>
              <Link to="/programas">
                <h1>Programas</h1>
              </Link>
              <Link to="/programacao">
                <h1>Programação</h1>
              </Link>
              <Link to="/onde-estamos">
                <h1>Onde Estamos</h1>
              </Link>
              <Link to="/promocao">
                <h1>Promoções</h1>
              </Link>
              <Link to="/contato">
                <h1>Contato</h1>
              </Link>
              <div className="footerSocialMediaContainer">
                {' '}
                <FacebookLogo weight="regular" size={30} /> <img src={Xlogo} />
                <InstagramLogo weight="regular" size={30} />{' '}
                <TiktokLogo weight="regular" size={30} />{' '}
                <YoutubeLogo weight="regular" size={30} />{' '}
                <WhatsappLogo weight="regular" size={30} />{' '}
                <TelegramLogo weight="regular" size={30} />
              </div>
            </div>
          </div>
          <div className="promoActorRowNew">
            <Slider {...settings}>
              {promos.map((promo, index) => (
                <div
                  className={`promoCardNew1 ${isPlaying ? 'playing' : ''}`}
                  key={index}
                >
                  {promo.yoast_head_json.og_image[0].url && (
                    <div className="imageContainer1">
                      <img
                        src={promo.yoast_head_json.og_image[0].url}
                        alt="Promo"
                      />
                      <div className="clickInterceptor"></div>
                    </div>
                  )}
                  <Link
                    to={`/promocao/${promo.id}`}
                    className="linkArea"
                  ></Link>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        <div className="backgroundDivContainerNews fade-in">
          <h1 className="h1StyleDrops">Drops </h1>
          <div className="whiteLine" />

          {news.slice(0, 3).map((newsItem, index) => (
            <Link
              to={`/noticia/${newsItem.id}`}
              key={index}
              style={{ textDecoration: 'none' }}
            >
              <div className="newsContainer">
                <img
                  src={newsItem.yoast_head_json?.og_image?.[0]?.url}
                  alt="Imagem da notícia"
                  className="newsImage"
                />
                <div className="newsTitleContainer">
                  <h2 className="newsTitle">
                    {decode(newsItem.title.rendered)}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
          <Link to="/drops" className="btnStyle">
            Ver mais
          </Link>
          <div className="placeholderPropraganda" />
        </div>
        <div className="contentBackground fade-in">
          <h1 className="contentTitle">Programas</h1>
          <div className="whiteLine" />

          <div className="contentContainer">
            {programas.slice(0, 2).map((programa, index) => (
              <Link
                to={`/noticia/${programa.id}`}
                key={index}
                style={{ textDecoration: 'none' }}
              >
                <div className="contentItem">
                  <img
                    src={programa.yoast_head_json?.og_image?.[0]?.url}
                    alt="Imagem da notícia"
                  />
                  <p className="contentText">
                    {decode(programa.title.rendered)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <section id="programacao"></section>
      <div className="progContainer">
        {/* <img src={Prog} className="progImage" /> */}
        {/* <h1 className="dropsText1">NO AR</h1>
        <div className="whiteLine1"></div> */}
        <h1 className="h1StyleDrops">Programação </h1>
        <div className="whiteLine" />
        {/* {mostrar && (
          <div>
            {' '}
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
          </div>
        )} */}
        <div className="circleContainerRow">
          {' '}
          <div className="circle-container">
            <div className="inner-container"></div>
            <svg className="progress-ring" width="100%" height="100%">
              <circle
                className="progress-ring__inner-circle"
                stroke="white"
                strokeWidth="0.2vw"
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
          <div className="program-info">
            {/* <div className="now-playing">Tocando agora</div> */}
            {/* <hr className="separator" /> */}
            <div className="live-container">
              <div className="live-dot"></div>
              <span>AO VIVO</span>
            </div>

            <h1 className="program-title">{currentProgramTitle}</h1>

            <style jsx>{`
              @keyframes blink {
                to {
                  visibility: hidden;
                }
              }
            `}</style>
            <p className="program-time">
              {formatHour(currentProgramStartHour)} -{' '}
              {formatHour(currentProgramEndHour)}
            </p>
            <div className="button-container">
              <button
                className="play-pause-button"
                onClick={handlePlayPause}
                disabled={isLoading}
              >
                {isPlaying ? (
                  <PauseCircle size="8vw" weight="fill" />
                ) : (
                  <PlayCircle size="8vw" weight="fill" />
                )}
              </button>
            </div>
          </div>
        </div>{' '}
        <Link to="/programacao" className="meuBotao">
          <span className="textoBotao">CONFIRA NOSSA PROGRAMAÇÃO</span>
        </Link>
      </div>
      <div className="promoContainerNew">
        <img src={FoneDeOuvido} className="foneImg" />

        <div className="flexCenter">
          {' '}
          <h1 className="contentTitle1">Promoções</h1>
          <div className="whiteLine1" />
        </div>
        <div className="promoActorRowNew fade-in">
          <Slider {...settings}>
            {promos.map((promo, index) => (
              <Link to={`/promocao/${promo.id}`} key={index}>
                <div className="promoCardNew">
                  {promo.yoast_head_json.og_image[0].url && (
                    <img
                      src={promo.yoast_head_json.og_image[0].url}
                      alt="Promo"
                    />
                  )}
                  <span className="cartolaAbsoluteNew">
                    {he.decode(
                      promo.cartola === 'Oportunidade' ? 'ATIVA' : 'ENCERRADA'
                    )}
                  </span>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
      </div>
      <div className="MapContainer">
        <img src={PingGoogle} className="mapImg" />
        {/* <img src={mapText} className="mapImage" /> */}
        <h1 className="h1StyleDrops">Onde Estamos</h1>
        <div className="whiteLine" />
        <div style={{ position: 'relative' }}>
          <Map
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
            className={selectedRadio.title === 'Santa Quitéria' ? 'ripple' : ''}
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
        <div className="boxMapPropaganda" />
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
        <div></div>
      </div>
      <div
        style={{
          backgroundColor: getComputedStyle(document.documentElement)
            .getPropertyValue('--cor-primaria')
            .trim(),
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
            <img src={Logo} alt="Imagem 3" className="footerImage4" />
            <div className="footerDivRow">
              <Link to="/sobre">
                <span className="footerDivRowSpan"> Sobre </span>
              </Link>
              <div className="verticalLine"></div>
              <Link to="/principios-editoriais">
                <span className="footerDivRowSpan">
                  {' '}
                  Princípios Editoriais{' '}
                </span>
              </Link>
              <div className="verticalLine"></div>
              <Link to="/contato">
                <span className="footerDivRowSpan"> Contato </span>
              </Link>
            </div>
          </div>
          <span className="footerText">Copyright © 2024 Plus FM.</span>
        </div>
      </div>
    </div>
  );
}

export default App;
