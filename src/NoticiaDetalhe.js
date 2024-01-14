import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './NoticiaDetalhe.css';
import Logo from './plus-1.png';
import {
  FacebookLogo,
  House,
  InstagramLogo,
  TelegramLogo,
  TiktokLogo,
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

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        const response = await fetch(
          `https://plusfm.com.br/wp-json/wp/v2/posts/${id}`
        );
        const data = await response.json();

        // Cria um novo DOMParser
        let parser = new DOMParser();
        // Converte a string HTML em um objeto de documento
        let doc = parser.parseFromString(data.content.rendered, 'text/html');

        // Seleciona todos os iframes
        let iframes = doc.getElementsByTagName('iframe');

        for (let i = 0; i < iframes.length; i++) {
          let iframe = iframes[i];
          let src = iframe.getAttribute('src');

          // Adiciona uma classe com base na URL de origem
          if (src.includes('youtube')) {
            iframe.classList.add('youtube-iframe');
          } else if (src.includes('spotify')) {
            iframe.classList.add('spotify-iframe');
          }
        }

        // Atualiza o conteúdo da notícia com o HTML modificado
        data.content.rendered = doc.body.innerHTML;

        setNoticia(data);
        const imagemResponse = await fetch(
          `https://plusfm.com.br/wp-json/wp/v2/media/${data.featured_media}`
        );
        const imagemData = await imagemResponse.json();
        if (imagemData.yoast_head_json) {
          setImagemDescricao(imagemData.yoast_head_json.og_description);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticia();
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar a notícia: {error}</div>;
  }

  return (
    <div style={{ backgroundColor: '#d7d7d771' }}>
      <div className="MenuContainerHeader">
        <header className="App-headerN">
          <img src={Logo} />
          <div className="divMenu">
            <div className="menuDiv">
              <span className="divMenuSpan">Drops</span>
              <span className="divMenuSpan">Contato</span>
              <span className="divMenuSpan">Progamação</span>
            </div>
            <div className="socialIcons">
              <InstagramLogo size={'2vw'} color="#541084" />
              <FacebookLogo size={'2vw'} color="#541084" />
              <YoutubeLogo size={'2vw'} color="#541084" />
              <TwitterLogo size={'2vw'} color="#541084" />
            </div>
          </div>
        </header>
      </div>
      <div className="noticiasContainer">
        <h1>{noticia.title.rendered}</h1>
        <h2>{noticia.bigode}</h2>
        {noticia.yoast_head_json && noticia.yoast_head_json.og_image && (
          <>
            <img
              src={noticia.yoast_head_json.og_image[0].url}
              alt="Imagem da notícia"
            />
            {imagemDescricao && <p className="descImage">{imagemDescricao}</p>}
          </>
        )}
        <div
          className="meu-conteudo"
          dangerouslySetInnerHTML={{
            __html: noticia.content.rendered.replace(
              /<em/g,
              '<em class="alinhado-direita"'
            ),
          }}
        />
      </div>
    </div>
  );
};

export default NoticiaDetalhe;
