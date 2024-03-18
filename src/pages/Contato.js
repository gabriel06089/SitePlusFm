import React, { useState, useEffect, useContext, useRef } from 'react';

import { Link, useParams, useLocation } from 'react-router-dom';
import InputMask from 'react-input-mask';
import {
  CaretCircleLeft,
  Envelope,
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  List,
  TelegramLogo,
  TiktokLogo,
  WhatsappLogo,
  X,
  YoutubeLogo,
} from 'phosphor-react';
import { PlayerContext } from '../Context/PlayerContext';
import { Navigate, useNavigate } from 'react-router-dom';
import Logo from './../plus-1.png';
import XRoxo from './../TwitterRoxo.png';
import Xlogo from './../twitter-x.svg';
import AdSense from '../Adsense';

const Contato = () => {
  const location = useLocation();
  const isNewsPage = location.pathname.includes('/contato');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isContactPage = location.pathname === '/contato';
  const {
    isPlaying,
    // Adicione handlePlayPause aqui se você o adicionou ao contexto
  } = useContext(PlayerContext);
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!nome.trim()) {
      alert('Por favor, preencha o campo Nome.');
      return;
    }

    if (!email.trim()) {
      alert('Por favor, preencha o campo Email.');
      return;
    }

    if (!telefone.trim()) {
      alert('Por favor, preencha o campo Telefone.');
      return;
    }

    if (!mensagem.trim()) {
      alert('Por favor, preencha o campo Mensagem.');
      return;
    }

    const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!telefoneRegex.test(telefone)) {
      alert('Por favor, insira um número de telefone válido.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }

    // Aqui você pode adicionar o código para enviar os dados do formulário
    console.log('Formulário enviado com sucesso!');
    const mailtoLink = `mailto:gabrieleemailpessoal02@gmail.com?subject=Contato do site&body=Nome: ${nome}%0DEmail: ${email}%0DTelefone: ${telefone}%0DMensagem: ${mensagem}`;
    window.location.href = mailtoLink;
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('noScroll');
    } else {
      document.body.classList.remove('noScroll');
    }
  }, [isMenuOpen]);
  return (
    <div className="contatoContainer">
      <div
        className={`
    logoMenuDivRow 
    ${isMenuOpen ? 'fixed' : ''} 
    ${isPlaying ? 'playing' : ''} 
    ${isPlaying && isMenuOpen ? 'playingAndMenuOpen' : ''} 
    ${isContactPage ? 'contactPage' : ''}
    ${isPlaying && isContactPage ? 'playingAndContactPage' : ''}
  `}
      >
        <img src={Logo} />
        {isMenuOpen ? (
          <X weight="bold" onClick={() => setIsMenuOpen(false)} />
        ) : (
          <List
            className={isNewsPage ? 'newsPageIconS' : ''}
            weight="bold"
            onClick={() => setIsMenuOpen(true)}
          />
        )}
      </div>
      <div className={`fullScreenMenu ${isMenuOpen ? 'open' : ''}`}>
        <div className="menuOpenContainerColumn">
          <Link to="/">
            <h1>Home</h1>
          </Link>
          <Link to="/onde-estamos">
            <h1>Onde</h1>
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
            <a
              href="https://www.facebook.com/plusfmrede/?locale=pt_BR"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookLogo weight="regular" size={30} />
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
              <InstagramLogo weight="regular" size={30} />
            </a>
            <a
              href="https://www.tiktok.com/@plusfmrede"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TiktokLogo weight="regular" size={30} />
            </a>
            <a
              href="https://www.youtube.com/channel/UC0ek2Dls6ikevIsWckZX7ZA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <YoutubeLogo weight="regular" size={30} />
            </a>
            <a
              href="https://www.whatsapp.com/channel/0029VaDSwXYA89MeJrPw1p1A"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsappLogo weight="regular" size={30} />
            </a>
            <a
              href="https://t.me/redeplusfm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TelegramLogo weight="regular" size={30} />
            </a>
          </div>
        </div>
      </div>
      <h2 className={`contatoH2 ${isPlaying ? 'playing' : ''}`}>Contato</h2>{' '}
      <div className="whiteLineContato" />
      <div className={`containerPropaganda ${isPlaying ? 'playing' : ''}`}>
        <AdSense />{' '}
      </div>
      <div className="containerRowColumn">
        {' '}
        <div className="divColumn">
          <h1 className="contatoH1">
            Para falar com a equipe da Plus FM, basta preencher o formulário
            abaixo. Responderemos, em breve, via e-mail.
          </h1>
          <form className="contatoForm" onSubmit={handleSubmit}>
            <label className="contatoLabel">
              Nome:
              <input
                type="text"
                name="nome"
                placeholder="Seu nome completo."
                className="contatoInput"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </label>
            <label className="contatoLabel">
              E-mail:
              <input
                type="email"
                name="email"
                placeholder="Ex: exemplo@email.com"
                className="contatoInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="contatoLabel">
              Telefone:
              <InputMask
                mask="(99) 99999-9999"
                type="tel"
                name="telefone"
                placeholder="Ex: (00) 00000-0000"
                className="contatoInput"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </label>
            <label className="contatoLabel">
              Mensagem:
              <textarea
                name="mensagem"
                placeholder="Digite sua mensagem aqui"
                className="contatoTextarea"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
              />
            </label>
            <input type="submit" value="Enviar" className="contatoSubmit" />
          </form>
        </div>{' '}
        <div className="box">
          <AdSense />
        </div>
        <div className="footerContainer">
          <div className="footerDivRowContato">
            <div className="footerDivColumnContato">
              {' '}
              <EnvelopeSimple weight="regular" />
              <span className="text-wrapper">
                Comercial
                <br />
              </span>
              <span className="span">comercial@plusfm.com.br</span>
            </div>
            <div className="footerDivColumnContato">
              <EnvelopeSimple weight="regular" />{' '}
              <span className="text-wrapper">
                Redação
                <br />
              </span>
              <span className="span">redacao@plusfm.com.br</span>
            </div>
          </div>
          <div className="footerSocialmediaContainer">
            {' '}
            <a
              href="https://www.facebook.com/plusfmrede/?locale=pt_BR"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookLogo weight="regular" size={25} color="#9248FF" />
            </a>
            <a
              href="https://twitter.com/plusfmrede_"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={XRoxo} />
            </a>
            <a
              href="https://www.instagram.com/plusfmrede/?igsh=dGhjczFwNDBwdW81"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramLogo weight="regular" size={25} color="#9248FF" />
            </a>
            <a
              href="https://www.tiktok.com/@plusfmrede"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TiktokLogo weight="regular" size={25} color="#9248FF" />
            </a>
            <a
              href="https://www.youtube.com/channel/UC0ek2Dls6ikevIsWckZX7ZA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <YoutubeLogo weight="regular" size={25} color="#9248FF" />
            </a>
            <a
              href="https://www.whatsapp.com/channel/0029VaDSwXYA89MeJrPw1p1A"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsappLogo weight="regular" size={25} color="#9248FF" />
            </a>
            <a
              href="https://t.me/redeplusfm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TelegramLogo weight="regular" size={25} color="#9248FF" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contato;
