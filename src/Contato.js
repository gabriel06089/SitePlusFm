import React, { useState } from 'react';
import './Contato.css'; // Importe o arquivo CSS
import InputMask from 'react-input-mask';
const Contato = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');

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
  return (
    <div className="contatoContainer">
      <img
        src="https://via.placeholder.com/150"
        alt="Imagem genérica"
        className="contatoImagem"
      />
      <h1 className="contatoH1">
        Para falar com a equipe da Plus FM, basta preencher o formulário abaixo.
        Responderemos, em breve, via e-mail.
      </h1>
      <form className="contatoForm" onSubmit={handleSubmit}>
        <label className="contatoLabel">
          Nome:
          <input
            type="text"
            name="nome"
            placeholder="Seu Nome Completo"
            className="contatoInput"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>
        <label className="contatoLabel">
          Email:
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
    </div>
  );
};

export default Contato;
