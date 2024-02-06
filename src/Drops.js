import {
  CaretLeft,
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
  YoutubeLogo,
} from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as TwitterLogoX } from './twitter-x.svg';
import Don7 from './don7horizontal.svg';
import Logo from './plus-1.png';
import PlayStore from './playstore.png';
import AppleStore from './iostore.png';
import './Drops.css';
import { decode } from 'he';
import { Link } from 'react-router-dom';

const Drops = ({ match }) => {
  const navigate = useNavigate();

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [startPage, setStartPage] = useState(1);

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
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://plusfm.com.br/wp-json/wp/v2/posts?status&per_page=5&page=${page}&tags_exclude=2007`
        );
        const data = await response.json();

        const filteredNews = data.filter(
          (news) =>
            !news.cartola.toLowerCase().includes('no ar') &&
            !news.cartola.toLowerCase().includes('política')
        );

        filteredNews.forEach((news) => {
          console.log('Cartola:', news.cartola);
        });

        setNews(filteredNews);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchNews();
  }, [page]);
  const handlePageChange = (newPage) => {
    navigate(`/drops/${newPage}`);
  };

  return (
    <div>
      <div className="contentBackgroundDrops">
        <div className="topBackContainer">
          <button onClick={handleHome} className="backButton">
            <CaretLeft weight='bold'/>
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
            : news.map((newsItem, index) => (
                <Link
                  to={`/noticia/${newsItem.id}`}
                  style={{ textDecoration: 'none' }}
                  key={newsItem.id}
                >
                  <div
                    className={`contentItem ${index === 2 ? 'thirdItem' : ''}`}
                  >
                    <img
                      src={newsItem.yoast_head_json?.og_image?.[0]?.url}
                      alt="Imagem da notícia"
                    />
                    <p className="contentText">
                      {decode(newsItem.title.rendered)}
                    </p>
                  </div>
                  {index === news.length - 1 && <div className="dividerLine" />}
                </Link>
              ))}
        </div>
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
};

export default Drops;
