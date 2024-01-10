import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './NoticiaDetalhe.css';

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
        setNoticia(data);
        const imagemResponse = await fetch(
          `https://plusfm.com.br/wp-json/wp/v2/media/${data.featured_media}`
        );
        const imagemData = await imagemResponse.json();
        if (
          data.title.rendered.startsWith(
            'AO VIVO: assista aos programas Deu B.O.'
          )
        ) {
          setImagemDescricao(
            'Wesmenia Lopes e Mateus Vasconcelos. Foto: Plus FM'
          );
        } else if (imagemData.yoast_head_json) {
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
    <div className="noticiasContainer">
      <h1>{noticia.title.rendered}</h1>
      <h2>{noticia.bigode}</h2>
      {noticia.yoast_head_json && noticia.yoast_head_json.og_image && (
        <>
          <img
            src={noticia.yoast_head_json.og_image[0].url}
            alt="Imagem da notícia"
          />
          {imagemDescricao && (
            <p className="descImage">Descrição da imagem: {imagemDescricao}</p>
          )}
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
  );
};

export default NoticiaDetalhe;
