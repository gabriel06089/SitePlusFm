import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './NoticiaDetalhe.css';
import { Puff } from 'react-loader-spinner';

import { decode } from 'he';
import Don7 from './don7horizontal.svg';
import Logo from './plus-1.png';
import PlayStore from './playstore.png';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import AppleStore from './iostore.png';
import {
  Camera,
  FacebookLogo,
  InstagramLogo,
  Timer,
  TwitterLogo,
  WhatsappLogo,
  YoutubeLogo,
} from 'phosphor-react';

const NoticiaDetalhe = () => {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagemDescricao, setImagemDescricao] = useState(null);

  const [maisNoticias, setMaisNoticias] = useState([]);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [noticia]);
  useEffect(() => {
    const fetchMaisNoticias = async () => {
      const response = await fetch(
        'https://plusfm.com.br/wp-json/wp/v2/posts?per_page=2'
      );
      const data = await response.json();
      setMaisNoticias(data);
    };

    fetchMaisNoticias();
  }, []);
  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        // Verifica se a notícia já está em cache
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

        // Código existente...

        setNoticia(data);

        // Armazena a notícia em cache
        localStorage.setItem(`noticia-${id}`, JSON.stringify(data));

        const imagemResponse = await fetch(
          `https://plusfm.com.br/wp-json/wp/v2/media/${data.featured_media}`
        );
        const imagemData = await imagemResponse.json();
        if (imagemData.yoast_head_json) {
          setImagemDescricao(imagemData.yoast_head_json.og_description);
          // Armazena a featured_media em cache
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
          'https://plusfm.com.br/wp-json/wp/v2/posts?per_page=6'
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Erro ao buscar os posts:', error);
      }
    };

    fetchPosts();
  }, []);

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
    .replace(/<p>(Assista:|Ouça:)<\/p>/g, '<p class="special-strong">$1</p>')
    .replace(
      /<div class="twitter-tweet twitter-tweet-rendered"[^>]*>[\s\S]*?<\/div>/g,
      ''
    );
  console.log(htmlWithStyling); // Exibe o htmlContent no console
  const cleanedHtmlContent = decode(
    htmlWithStyling.replace(/<em/g, '<em class="alinhado-direita"')
  );
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
      <div className="MenuContainerHeader">
        <header className="App-headerN">
          <Link to="/">
            <img loading="lazy" src={Logo} />
          </Link>
          <div className="divMenu">
            <div className="menuDiv">
              <Link to="/drops" className="divMenuSpan">
                <span>Drops</span>
              </Link>
              <span className="divMenuSpan">Contato</span>
              <span className="divMenuSpan">Programação</span>
            </div>
            <div className="socialIcons">
              <InstagramLogo
                size={'2vw'}
                color={getComputedStyle(
                  document.documentElement
                ).getPropertyValue('--cor-primaria')}
              />
              <FacebookLogo
                size={'2vw'}
                color={getComputedStyle(
                  document.documentElement
                ).getPropertyValue('--cor-primaria')}
              />
              <YoutubeLogo
                size={'2vw'}
                color={getComputedStyle(
                  document.documentElement
                ).getPropertyValue('--cor-primaria')}
              />
              <TwitterLogo
                size={'2vw'}
                color={getComputedStyle(
                  document.documentElement
                ).getPropertyValue('--cor-primaria')}
              />
            </div>
          </div>
        </header>
      </div>
      <div className="noticiasContainer">
        <h1>{decode(noticia.title.rendered)}</h1>
        <h2>{decode(noticia.bigode)}</h2>

        {noticia.yoast_head_json && noticia.yoast_head_json.og_image && (
          <>
            <img
              loading="lazy"
              src={noticia.yoast_head_json.og_image[0].url}
              alt="Imagem da notícia"
            />

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '1vw',
              }}
            >
              <Camera size={'1.5vw'} />
              {imagemDescricao && (
                <p className="descImage">{decode(imagemDescricao)}</p>
              )}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '3vw',
                marginTop: '1vw',
              }}
            >
              <Timer size={'1.5vw'} />
              {noticia.date && (
                <p className="descImage">
                  Publicado em:{' '}
                  {format(new Date(noticia.date), 'dd/MM/yyyy HH:mm', {
                    locale: ptBR,
                  })}
                </p>
              )}
            </div>
          </>
        )}
        <div
          className="meu-conteudo"
          dangerouslySetInnerHTML={{ __html: cleanedHtmlContent }}
        />
      </div>
      <div className="social-share-container">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookLogo
            className="social-link"
            size={'5vw'}
            color={getComputedStyle(document.documentElement).getPropertyValue(
              '--cor-primaria'
            )}
            weight="fill"
          />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${text}&url=${url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterLogo
            className="social-link"
            size={'5vw'}
            color={getComputedStyle(document.documentElement).getPropertyValue(
              '--cor-primaria'
            )}
            weight="fill"
          />
        </a>
        <a
          href={`https://api.whatsapp.com/send?text=${text} ${url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsappLogo
            className="social-link"
            size={'5vw'}
            color={getComputedStyle(document.documentElement).getPropertyValue(
              '--cor-primaria'
            )}
            weight="fill"
          />
        </a>
      </div>
      <div className="containerDivisao"> Mais notícias </div>
      <div className="maisNoticias">
        {maisNoticias.map((noticia) => (
          <Link
            to={`/noticia/${noticia.id}`}
            key={noticia.id}
            className="noticia"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <img
              loading="lazy"
              src={noticia.yoast_head_json.og_image[0].url}
              alt="Imagem da notícia"
            />
            <div>
              <h4>{decode(noticia.cartola)}</h4>
              <h5>{decode(noticia.title.rendered)}</h5>
            </div>
          </Link>
        ))}
      </div>
      <div className="containerDivisaoC"> Recomendadas para você </div>
      <div
        className="maisNoticiasR"
        style={{ display: 'flex', flexDirection: 'row', width: '74vw' }}
      >
        <div className="containerColuna1">
          {posts.slice(0, 3).map((post) => (
            <Link
              to={`/noticia/${post.id}`} // Use o id do post aqui
              key={post.id}
              className="post"
              style={{
                color: 'inherit',
                textDecoration: 'none',
              }}
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
              to={`/noticia/${post.id}`} // Use o id do post aqui
              key={post.id}
              className="post"
              style={{
                color: 'inherit',
                textDecoration: 'none',
              }}
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
        <div className="footerDiv">
          <div className="imageContainer">
            <img
              loading="lazy"
              src={Logo}
              alt="Imagem 3"
              className="footerImage2"
            />
            <img
              loading="lazy"
              src={Don7}
              alt="Imagem 4"
              className="footerImage3"
            />
          </div>
          <span className="footerText">
            Copyright © 2024 Plus FM - Todos os direitos reservados
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoticiaDetalhe;
