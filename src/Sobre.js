// Sobre.js
import { CaretCircleLeft } from 'phosphor-react';
import { Navigate, useNavigate } from 'react-router-dom';
import React from 'react';
import './Sobre.css';
const Sobre = () => {
  const navigate = useNavigate();
  return (
    <div className="contatoContainer">
      {' '}
      <img
        src="https://via.placeholder.com/150"
        alt="Imagem genérica"
        className="contatoImagem"
      />
      <h2 className='sobreNos'> Sobre nós</h2>
      <div className="lineSobre" />
      <h1 className='h1Sobre'>
        {' '}
        O Ceará está ligado através da Plus FM, a maior rede de rádios do
        estado. Com 11 emissoras espalhadas do norte ao sul do Ceará, a Plus FM
        conta com uma programação dinâmica, que une o melhor do jornalismo local
        e nacional com as músicas mais pedidas do momento. Seja pelo rádio,
        aplicativo, site ou redes sociais, a Plus FM leva aos ouvintes,
        diariamente, muita informação e entretenimento. São mais de 10 anos
        tornando o dia a dia dos cearenses legal demais!{' '}
      </h1>
      <div className="contatoBackButton">
        <div className="posicaoAbsolutaDireita1">
          <CaretCircleLeft
            className="caretCircleLeftStyle1"
            onClick={() => navigate(-1)}
          />
        </div>
      </div>
    </div>
  );
};

export default Sobre;
