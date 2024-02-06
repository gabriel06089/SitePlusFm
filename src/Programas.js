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

const Programas = ({ match }) => {
  const navigate = useNavigate();

  const [programas, setprogramas] = useState([]);
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
    const fetchProgramas = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://plusfm.com.br/wp-json/wp/v2/posts?categories=2685&per_page=3&page=${page}`
        );
        const data = await response.json();

        data.forEach((programa) => {
          console.log('Cartola:', programa.cartola);
        });

        setprogramas(data); // Corrigido para corresponder ao nome do estado
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchProgramas();
  }, [page]);
  const handlePageChange = (newPage) => {
    navigate(`/programas/${newPage}`); // Atualizado para apontar para a página de Programas
  };
  return (
    <div>
      <div className="contentBackgroundDrops1">
        <div className="topBackContainer">
          <button onClick={handleHome} className="backButton3">
            <CaretLeft weight="bold" />
          </button>
          <h1 className="contentTitle">Programas</h1>
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
            : programas.map(
                (
                  programa,
                  index // Atualizado para usar a variável programas
                ) => (
                  <Link
                    to={`/programa/${programa.id}`}
                    style={{ textDecoration: 'none' }}
                    key={programa.id}
                  >
                    <div
                      className={`contentItem ${
                        index === 2 ? 'thirdItem' : ''
                      }`}
                    >
                      <img
                        src={programa.yoast_head_json?.og_image?.[0]?.url}
                        alt="Imagem do programa"
                      />
                      <p className="contentText">
                        {decode(programa.title.rendered)}
                      </p>
                    </div>
                    {index === programas.length - 1 && (
                      <div className="dividerLine" />
                    )}
                  </Link>
                )
              )}
        </div>
        <div className="pagination1">
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

export default Programas;
