import {
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
  YoutubeLogo,
} from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as TwitterLogoX } from './twitter-x.svg';
import Don7 from './don7horizontal.svg';
import Logo from './plus-1.png';
import PlayStore from './playstore.png';
import AppleStore from './iostore.png';
import './Drops.css';
import { decode } from 'he';
const Drops = ({ match }) => {
  const [drops, setDrops] = useState([]);
  const { page = 1 } = useParams();

  const fetchDrops = async () => {
    try {
      const response = await fetch(
        `https://plusfm.com.br/wp-json/wp/v2/posts?status&per_page=18&page=${page}&categories=2`
      );
      const data = await response.json();
      setDrops(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDrops();
  }, [page]);

  return (
    <div>
      {' '}
      <div className="MenuContainerHeader">
        <header className="App-headerN">
          <Link to="/">
            <img src={Logo} />
          </Link>
          <div className="divMenu">
            <div className="socialIcons2">
              <a
                href="https://www.instagram.com/plusfmrede/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramLogo size={'3vw'} color="#541084" />
              </a>
              <a
                href="https://www.facebook.com/plusfmrede"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookLogo size={'3vw'} color="#541084" />
              </a>
              <a
                href="https://www.youtube.com/channel/UC0ek2Dls6ikevIsWckZX7ZA"
                target="_blank"
                rel="noopener noreferrer"
              >
                <YoutubeLogo size={'3vw'} color="#541084" />
              </a>
              <a
                href="https://twitter.com/plusfmrede_"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterLogo size={'3vw'} color="#541084" />
              </a>
            </div>
          </div>
        </header>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          margin: '20px',
        }}
      >
        {drops.map((drop) => (
          <Link
            to={`/noticia/${drop.id}`}
            key={drop.id}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <div className="containerNoticia">
              <img
                src={drop.yoast_head_json.og_image[0].url}
                alt="Imagem da notícia"
                className="imagemNoticia"
              />
              <div>
                <h4>{drop.cartola}</h4>
                <h5>{decode(drop.title.rendered)}</h5>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="botaoContainer">
        <Link to={`/drops/page/${parseInt(page) + 1}`}>
          <button className="botaoCarregarMais">Carregar Mais</button>
        </Link>
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
};

export default Drops;
