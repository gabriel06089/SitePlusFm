import '../../public/theme.css';
import './../App.css';
import './../NoticiaDetalhe.css';
import './../Contato.css'; // Importe o arquivo CSS
import './../Drops.css';
import './../Manutencao.css';
import './../OndeEstamos.css';
import './../PrincipiosEditoriais.css';
import './../Programacao.css';
import './../Sobre.css';
import './../index.css';
import { Component, Fragment } from 'react';

// Este é apenas um exemplo de componente funcional, o seu pode ser diferente
function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
