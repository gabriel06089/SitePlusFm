import {
  Camera,
  CaretLeft,
  FacebookLogo,
  InstagramLogo,
  List,
  TelegramLogo,
  TiktokLogo,
  Timer,
  TwitterLogo,
  WhatsappLogo,
  X,
  YoutubeLogo,
} from 'phosphor-react';
import Xlogo from './twitter-x.svg';
import { Helmet } from 'react-helmet';
import LogoBranca from './LogoBranca.svg';
import { ReactComponent as Map } from './mapa.svg';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ReactComponent as TwitterLogoX } from './twitter-x.svg';
import Don7 from './don7horizontal.svg';
import Logo from './plus-1.png';
import PlayStore from './playstore.png';
import AppleStore from './iostore.png';
import './Drops.css';
import { decode } from 'he';
import { Link } from 'react-router-dom';
import { PlayerContext } from './Context/PlayerContext';
import AdSense from './Adsense';
import AdSenseMobile from './AdsenseMobile';
const PlusNews = ({ match }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const isNewsPage = location.pathname.includes('/plusnews');
  const [startPage, setStartPage] = useState(1);
  const {
    isPlaying,
    // Adicione handlePlayPause aqui se você o adicionou ao contexto
  } = useContext(PlayerContext);
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);
    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []);
  function handleHome() {
    navigate('/');
  }
  function handleNextPages() {
    setStartPage(startPage + 5);
  }

  function handlePreviousPages() {
    if (startPage > 1) {
      setStartPage(startPage - 5);
    }
  }
  useEffect(() => {
    console.log(`Fetching news for page ${page}`);
    const fetchNews = async () => {
      try {
        const responseBrasil = await fetch(
          `https://plusfm.com.br/wp-json/wp/v2/posts?categories=2698&per_page=3&page=${page}`
        );
        const dataBrasil = await responseBrasil.json();
        dataBrasil.forEach((newsItem) => {
          newsItem.cartola = 'Brasil';
        });

        const responseCeara = await fetch(
          `https://plusfm.com.br/wp-json/wp/v2/posts?categories=2699&per_page=3&page=${page}`
        );
        const dataCeara = await responseCeara.json();
        dataCeara.forEach((newsItem) => {
          newsItem.cartola = 'Ceará';
        });

        const responseFortaleza = await fetch(
          `https://plusfm.com.br/wp-json/wp/v2/posts?categories=2697&per_page=3&page=${page}`
        );
        const dataFortaleza = await responseFortaleza.json();
        if (Array.isArray(dataFortaleza)) {
          dataFortaleza.forEach((newsItem) => {
            newsItem.cartola = 'Fortaleza';
          });
        } else {
          console.error('dataFortaleza is not an array:', dataFortaleza);
        }
        let allNews;
        if (Array.isArray(dataFortaleza)) {
          allNews = [...dataBrasil, ...dataCeara, ...dataFortaleza];
        } else {
          allNews = [...dataBrasil, ...dataCeara];
        }
        allNews.sort((a, b) => new Date(b.date) - new Date(a.date));

        setNews(allNews);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNews();
  }, [page, location]);

  const handlePageChange = (newPage) => {
    console.log(`Changing page to ${newPage}`);
    setPage(newPage);
    navigate(`/plusnews/${newPage}`);
  };
  return (
    <div>
      <div className="contentBackgroundDrops">
        {windowWidth <= 600 && (
          <>
            <div className="topBackContainer">
              <button onClick={handleHome} className="backButton">
                <CaretLeft weight="bold" />
              </button>
              <h1 className="contentTitle">Drops</h1>
            </div>
            <div className="whiteLine" />
            <div className="contentContainer">
              {loading
                ? Array(3)
                    .fill()
                    .map((_, index) => (
                      <div key={index} className="contentItem">
                        <div
                          style={{
                            backgroundColor: 'gray',
                            width: '100%',
                            height: '200px',
                          }}
                        ></div>
                        <p className="contentText">Carregando...</p>
                      </div>
                    ))
                : news.flatMap((newsItem, index) => [
                    <Link
                      to={`/noticia/${newsItem.id}/${newsItem.slug}`}
                      style={{ textDecoration: 'none' }}
                      key={newsItem.id}
                    >
                      <div
                        className={`contentItem ${
                          index === 2 ? 'thirdItem' : ''
                        }`}
                      >
                        <img
                          src={newsItem.yoast_head_json?.og_image?.[0]?.url}
                          alt="Imagem da notícia"
                        />
                        <p className="contentText">
                          {decode(newsItem.title.rendered)}
                        </p>
                      </div>
                    </Link>,
                    (index + 1) % 2 === 0 && (
                      <div className="dividerLine">
                        {windowWidth < 600 && (
                          <div style={{ width: '100%', height: '150px' }}>
                            <AdSenseMobile />
                          </div>
                        )}
                      </div>
                    ),
                  ])}
            </div>
          </>
        )}
        {windowWidth > 600 && (
          <>
            {' '}
            <div
              className={`MenuContainerHeader ${isPlaying ? 'playing' : ''}`}
            >
              <div
                className={`logoMenuDivRow ${isPlaying ? 'playing' : ''} ${
                  isNewsPage ? 'newsPage' : ''
                }`}
              >
                <img src={Logo} />
                <div className="menuLinksDetalhes">
                  <Link to="/">Home</Link>
                  <Link to="/onde-estamos">Onde Estamos</Link>
                  <Link to="/drops">Drops</Link>
                  <Link to="/programas">Programas</Link>
                  <Link to="/programacao">Programação</Link>
                  <Link to="/contato">Contato</Link>
                </div>
              </div>
            </div>
            <div className="news-grid">
              {news.map((newsItem, index) => (
                <Link
                  to={`/noticia/${newsItem.id}/${newsItem.slug}`}
                  style={{ textDecoration: 'none' }}
                  key={newsItem.id}
                >
                  <div className="news-card">
                    <img
                      src={newsItem.yoast_head_json?.og_image?.[0]?.url}
                      alt="Imagem da notícia"
                    />
                    <p>{newsItem.cartola}</p>
                    <h2>{decode(newsItem.title.rendered)}</h2>
                  </div>
                </Link>
              ))}
            </div>
            <div className="propagandaDivDrops">
              <AdSense />
            </div>
          </>
        )}
        <div className="pagination">
          {startPage > 1 && (
            <button onClick={handlePreviousPages} className="previousPages">
              &lt;
            </button>
          )}
          {Array.from({ length: 5 }, (_, i) => startPage + i).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={num === page ? 'activePage' : ''}
            >
              {num}
            </button>
          ))}
          <button onClick={handleNextPages} className="nextPages">
            &gt;
          </button>
        </div>
      </div>

      <div className="footer">
        {windowWidth <= 600 && (
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
        )}
        {windowWidth > 600 && (
          <>
            {' '}
            <div className="footerDiv">
              <div className="imageContainer">
                <img src={LogoBranca} alt="Imagem 3" className="footerImage4" />
                <div className="footerDivRow">
                  <Link to="/sobre">
                    <span className="footerDivRowSpan"> SOBRE </span>
                  </Link>

                  <Link to="/principios-editoriais">
                    <span className="footerDivRowSpan">
                      {' '}
                      PRINCÍPIOS EDITORIAIS{' '}
                    </span>
                  </Link>

                  <Link to="/contato">
                    <span className="footerDivRowSpan"> CONTATO </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="footerContainerColumnDiv">
              {' '}
              <div className="footerSocialMediaContainerFooter">
                <a
                  href="https://www.facebook.com/plusfmrede/?locale=pt_BR"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookLogo weight="regular" size={50} color="white" />
                </a>
                <a
                  href="https://twitter.com/plusfmrede_"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={Xlogo} />
                </a>
                <a
                  href="https://www.instagram.com/plusfmrede/?igsh=dGhjczFwNDBwdW81"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramLogo weight="regular" size={50} color="white" />
                </a>
                <a
                  href="https://www.tiktok.com/@plusfmrede"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TiktokLogo weight="regular" size={50} color="white" />
                </a>
                <a
                  href="https://www.youtube.com/channel/UC0ek2Dls6ikevIsWckZX7ZA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <YoutubeLogo weight="regular" size={50} color="white" />
                </a>
                <a
                  href="https://www.whatsapp.com/channel/0029VaDSwXYA89MeJrPw1p1A"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsappLogo weight="regular" size={50} color="white" />
                </a>
                <a
                  href="https://t.me/redeplusfm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TelegramLogo weight="regular" size={50} color="white" />
                </a>
              </div>
              <span className="footerText">Copyright © 2024 Plus FM.</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PlusNews;
