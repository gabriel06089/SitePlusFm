import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
  YoutubeLogo,
  WhatsappLogo,
} from 'phosphor-react';
import Logo from './plus-1.png';
const PromoDetalhe = () => {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagemDescricao, setImagemDescricao] = useState(null);
  const url = `https://plusfm.com.br/promo/${id}`; // URL da promoção
  const text = 'Confira esta promoção incrível na Plus FM!'; // Texto para compartilhar

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
  const [promos, setPromos] = useState([]);
  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const response = await fetch(
          'https://plusfm.com.br/wp-json/wp/v2/posts?categories=14&per_page=3'
        );
        const data = await response.json();
        setPromos(data);
      } catch (error) {
        console.error('Erro ao buscar as promoções:', error);
      }
    };

    fetchPromos();
  }, []);
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
          <Link to="/">
            <img src={Logo} />]
          </Link>
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
        <h3>COMPARTILHE</h3>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookLogo size={'6vw'} color="#541084" weight="fill" />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${text}&url=${url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterLogo size={'6vw'} color="#541084" weight="fill" />
        </a>
        <a
          href={`https://api.whatsapp.com/send?text=${text} ${url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsappLogo size={'6vw'} color="#541084" weight="fill" />
        </a>
      </div>
      <div className="containerDivisaoP"> Mais promoções </div>
      <div className="maisNoticias">
        {promos.map((promo) => (
          <Link
            to={`/promo/${promo.id}`}
            key={promo.id}
            className="noticia"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <img
              src={promo.yoast_head_json.og_image[0].url}
              alt="Imagem da promoção"
            />
            <div>
              <h4>
                {promo.cartola.includes('Oportunidade')
                  ? promo.cartola.toUpperCase()
                  : promo.cartola.includes('PROMOÇÃO ENCERRADA')
                  ? 'ENCERRADA'
                  : promo.cartola}
              </h4>
              <h5>{promo.title.rendered}</h5>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PromoDetalhe;
