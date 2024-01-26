// Importar bibliotecas necessárias
import React from 'react';
import ManutencaoLogo from './embreve.png';
import './Manutencao.css';
// Componente de tela de manutenção
function Manutencao() {
  return (
    <div className="manutencao">
      {' '}
      <img src={ManutencaoLogo} className="manutencaoLogo" />
    </div>
  );
}

export default Manutencao;
