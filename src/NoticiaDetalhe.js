import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import './NoticiaDetalhe.css';
import { Puff } from 'react-loader-spinner';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Tweet } from 'react-tweet';
import Xlogo from './twitter-x.svg';
import Don7 from './don7.png';
import XlogoRoxo from './twitter-xRoxo.svg';
import { decode } from 'he';

import Logo from './plus-1.png';
import LogoBranca from './LogoBranca.svg';
import PlayStore from './playstore.png';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import AppleStore from './iostore.png';
import { PlayerContext } from './Context/PlayerContext';
import {
  Camera,
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

const NoticiaDetalhe = () => {
  const location = useLocation();
  const isNewsPage = location.pathname.includes('/noticia');
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagemDescricao, setImagemDescricao] = useState(null);
  const [maisNoticias, setMaisNoticias] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    isPlaying,
    // Adicione handlePlayPause aqui se você o adicionou ao contexto
  } = useContext(PlayerContext);
  const checkScroll = () => {
    // Verifique se a página foi rolada mais de 100 pixels
    if (window.scrollY > 20) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('scroll', checkScroll);

    // Limpe o evento ao desmontar o componente
    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [noticia]);

  useEffect(() => {
    const fetchNoticia = async () => {
      setLoading(true);
      try {
        const [noticiaResponse, maisNoticiasResponse] = await Promise.all([
          fetch(`https://plusfm.com.br/wp-json/wp/v2/posts/${id}`),
          fetch('https://plusfm.com.br/wp-json/wp/v2/posts?per_page=2'),
        ]);

        const noticiaData = await noticiaResponse.json();
        const maisNoticiasData = await maisNoticiasResponse.json();

        setNoticia(noticiaData);
        setMaisNoticias(maisNoticiasData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticia();
  }, [id]);
  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);
    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []);
  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        const cachedNoticia = localStorage.getItem(`noticia-${id}`);
        const cachedFeaturedMedia = localStorage.getItem(
          `featured_media-${id}`
        );
        if (cachedNoticia && cachedFeaturedMedia) {
          setNoticia(JSON.parse(cachedNoticia));
          setImagemDescricao(JSON.parse(cachedFeaturedMedia));
          return;
        }

        const response = await fetch(
          `https://plusfm.com.br/wp-json/wp/v2/posts/${id}`
        );
        const data = await response.json();

        setNoticia(data);
        localStorage.setItem(`noticia-${id}`, JSON.stringify(data));

        const imagemResponse = await fetch(
          `https://plusfm.com.br/wp-json/wp/v2/media/${data.featured_media}`
        );
        const imagemData = await imagemResponse.json();
        if (imagemData.yoast_head_json) {
          setImagemDescricao(imagemData.yoast_head_json.og_description);
          localStorage.setItem(
            `featured_media-${id}`,
            JSON.stringify(imagemData.yoast_head_json.og_description)
          );
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticia();
  }, [id]);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          'https://plusfm.com.br/wp-json/wp/v2/posts?per_page=9'
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Erro ao buscar os posts:', error);
      }
    };

    fetchPosts();
  }, []);
  
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('noScroll');
    } else {
      document.body.classList.remove('noScroll');
    }
  }, [isMenuOpen]);
  if (loading) {
    return (
      <div className="loader-container">
        <Puff color="white" size={400} />
        <p>Carregando...</p>
      </div>
    );
  }
  if (error) {
    return <div>Erro ao carregar a notícia: {error}</div>;
  }
  const url = window.location.href;
  const text = `Confira esta notícia: ${noticia.title.rendered}`;
  const htmlWithStyling = noticia.content.rendered
    .replace(/(<iframe[^>]*src="https:\/\/www\.youtube\.com[^>]*>)/g, (match) =>
      match.replace('<iframe', '<iframe class="iframe-wrapper youtube-iframe"')
    )
    .replace(
      /(<iframe[^>]*src="https:\/\/open\.spotify\.com[^>]*>)/g,
      (match) =>
        match.replace(
          '<iframe',
          '<iframe class="iframe-wrapper spotify-iframe"'
        )
    )
    .replace(/<p>(Assista:|Ouça:)<\/p>/g, '<p class="special-strong">$1</p>');

  const cleanedHtmlContent = decode(
    htmlWithStyling.replace(/<em/g, '<em class="alinhado-direita"')
  );

  const tweetBlockquoteRegex =
    /<blockquote class="twitter-tweet"[^>]*>.*?<\/blockquote>/s;
  const cleanedHtmlContentWithoutTweet = cleanedHtmlContent.replace(
    tweetBlockquoteRegex,
    ''
  );
  const tweet = document.querySelector('.twitter-tweet');

  // Altere a largura máxima e a altura
  if (tweet) {
    tweet.style.display = 'none';
  }
  const tweetBlockquote = document.querySelector('.twitter-tweet');

  // Altere a largura máxima e a altura
  if (tweetBlockquote) {
    tweetBlockquote.dataset.width = '500px';
    tweetBlockquote.dataset.height = '300px';
  }

  const tweetUrlRegex = /https:\/\/twitter.com\/\w+\/status\/(\d+)/;
  const match = cleanedHtmlContent.match(tweetUrlRegex);
  const tweetId = match ? match[1] : null;
  // Exiba o htmlContent atualizado
  console.log(cleanedHtmlContent);

  // window.addEventListener('scroll', function () {
  //   const element = document.querySelector('.social-share-container');
  //   const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  //   if (scrollPosition > 200 && scrollPosition < 3250) {
  //     element.classList.add('fixed');
  //     element.classList.remove('final-position');
  //   } else if (scrollPosition >= 3250) {
  //     element.classList.remove('fixed');
  //     element.classList.add('final-position');
  //   } else {
  //     element.classList.remove('fixed');
  //     element.classList.remove('final-position');
  //   }
  // });

  return (
    <div className="noticiaDetalheDiv">
      <div className={`MenuContainerHeader ${isPlaying ? 'playing' : ''}`}>
        <div
          className={`logoMenuDivRow ${isMenuOpen ? 'fixed' : ''} ${
            isPlaying ? 'playing' : ''
          } ${isPlaying && isMenuOpen ? 'playingAndMenuOpen' : ''} ${
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
          {isMenuOpen && windowWidth <= 600 ? (
            <X weight="bold" onClick={() => setIsMenuOpen(false)} />
          ) : (
            windowWidth <= 600 && (
              <List weight="bold" onClick={() => setIsMenuOpen(true)} />
            )
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
            <Link to="/promocao">
              <h1>Promoções</h1>
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
      </div>
      <div className="div-bloco-cinza"></div>
      <div className="containerPrincipal">
        <div className={`noticiasContainer ${isPlaying ? 'playing' : ''}`}>
          <h1>{decode(noticia.title.rendered)}</h1>
          <h2>{decode(noticia.bigode)}</h2>

          {noticia.yoast_head_json && noticia.yoast_head_json.og_image && (
            <>
              <img
                loading="lazy"
                src={noticia.yoast_head_json.og_image[0].url}
                alt="Imagem da notícia"
              />
              {/* <div className="icon-row">
              <FacebookLogo weight="regular" size={40} />
              <img src={XlogoRoxo} />
              <InstagramLogo weight="regular" size={40} />
              <TiktokLogo weight="regular" size={40} />

              <WhatsappLogo weight="regular" size={40} />
              <TelegramLogo weight="regular" size={40} />
            </div> */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '6px',
                }}
              >
                <Camera className="iconDesc" />
                {imagemDescricao && (
                  <p className="descImage">{decode(imagemDescricao)}</p>
                )}
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Timer className="iconDesc" />
                {noticia.date && (
                  <p className="descImage">
                    {format(new Date(noticia.date), 'dd/MM/yyyy HH:mm', {
                      locale: ptBR,
                    })}
                  </p>
                )}
              </div>
            </>
          )}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '1px',
              backgroundColor: 'black',
              marginTop: '1rem',
              marginBottom: '1rem',
              opacity: '0.4',
            }}
          />
          <div
            className="meu-conteudo"
            dangerouslySetInnerHTML={{ __html: cleanedHtmlContent }}
          />
          <div className="tweet-container">
            <div className="light">{tweetId && <Tweet id={tweetId} />}</div>
          </div>
          <div id="container"></div>
        </div>
        <div className="container-blocos">
          <div className="bloco-cinza-grande">
            
          </div>
          <div className="bloco-cinza">
           
          </div>
        </div>
      </div>

      <div className="containerDivisaoC"> Recomendadas para você </div>
      <div
        className="maisNoticiasR"
        style={{ display: 'flex', flexDirection: 'row', width: 'auto' }}
      >
        <div className="containerColuna1">
          {posts.slice(0, 3).map((post) => (
            <Link
              to={`/noticia/${post.id}`}
              key={post.id}
              className="post"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              <img
                loading="lazy"
                src={post.yoast_head_json.og_image[0].url}
                alt="Imagem do post"
              />
              <div className="containerSpanFooter">
                <h4>{decode(post.cartola)}</h4>
                <h5>{decode(post.title.rendered)}</h5>
              </div>
            </Link>
          ))}
        </div>
        <div className="containerColuna2">
          {posts.slice(3, 6).map((post) => (
            <Link
              to={`/noticia/${post.id}`}
              key={post.id}
              className="post"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              <img
                loading="lazy"
                src={post.yoast_head_json.og_image[0].url}
                alt="Imagem do post"
              />
              <div className="containerSpanFooter">
                <h4>{decode(post.cartola)}</h4>
                <h5>{decode(post.title.rendered)}</h5>
              </div>
            </Link>
          ))}
        </div>
        <div className="containerColuna3">
          {posts.slice(6, 9).map((post) => (
            <Link
              to={`/noticia/${post.id}`}
              key={post.id}
              className="post"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              <img
                loading="lazy"
                src={post.yoast_head_json.og_image[0].url}
                alt="Imagem do post"
              />
              <div className="containerSpanFooter">
                <h4>{decode(post.cartola)}</h4>
                <h5>{decode(post.title.rendered)}</h5>
              </div>
            </Link>
          ))}
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
            <span className="footerText">Copyright © 2024 Plus FM.</span>
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
              <span className="footerText1">SITE PERTENCENTE AO</span>{' '}
              <img src={Don7} alt="Imagem 3" className="footerImage5" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NoticiaDetalhe;
