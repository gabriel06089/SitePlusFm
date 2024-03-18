import { CaretCircleLeft } from 'phosphor-react';
import React from 'react';
// Importe o arquivo CSS
import { useNavigate } from 'react-router-dom';
const PrincipiosEditoriais = () => {
  const navigate = useNavigate();
  return (
    <div className="containerEsquerda">
      <h1>PRINCÍPIOS EDITORIAIS</h1>
      <div className="lineEditoriais" />
      <h2>
        <span>Plus FM </span> é uma rede de rádios que tem um alinhamento com as
        conexões tecnológicas e a defesa da cidadania.
      </h2>
      <h2>
        <span>Plus FM </span> está inserida na tradição de entretenimento e
        jornalismo de qualidade, rejeitando o sensacionalismo e a utilização
        mercantil da informação.
      </h2>
      <h2>
        <span>Plus FM </span> é uma rede de rádios cuja linha editorial se pauta
        por valores éticos e a defesa da democracia, sem qualquer dependência de
        ordem econômica, política e ideológica.
      </h2>
      <h2>
        <span>Plus FM </span> investe numa programação eclética, priorizando o
        interesse público e a produção do conhecimento.
      </h2>
      <h2>
        <span>Plus FM </span> confia na existência de uma opinião pública
        atuante e que mantenha o protagonismo na formação de uma sociedade, que
        valorize a nossa cultura e exerça um jornalismo responsável e de
        qualidade.
      </h2>
      <h2>
        <span>Plus FM </span> obedece princípios jornalísticos transparentes e é
        comprometida com a liberdade de expressão.
      </h2>
      <h2>
        <span>Plus FM </span> acredita numa rede de rádio viva, que não abre mão
        de sua credibilidade, alinhando a sua audiência aos princípios de uma
        sociedade cujo maior interesse é o bem estar coletivo.
      </h2>
      <div style={{ position: 'relative', width: '100%' }}>
        <div
          style={{
            position: 'absolute',
            right: 0,
            paddingTop: '60px',

          }}
        >
          <CaretCircleLeft
            className="caretCircleLeftStyle"
            onClick={() => navigate(-1)}
          />
        </div>
      </div>
    </div>
  );
};

export default PrincipiosEditoriais;
