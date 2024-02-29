import { useLayoutEffect, useState, useEffect, createRef, useRef } from 'react';
import './Programacao.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import agrandehora from './imagemprogamacao/agrandehora.svg';
import asmaispedidas from './imagemprogamacao/asmaispedidas.svg';
import asmelhoresdaplus from './imagemprogamacao/asmelhoresdaplus.svg';
import corujaodaplus from './imagemprogamacao/corujaodaplus.svg';
import domingao from './imagemprogamacao/domingao.svg';
import clubeplus from './imagemprogamacao/clubeplus.svg';
import festaplus from './imagemprogamacao/festaplus.svg';
import manhadaplus from './imagemprogamacao/manhadaplus.svg';
import megaplus from './imagemprogamacao/megaplus.svg';
import nocolodejesusedemaria from './imagemprogamacao/nocolodejesusedemaria.svg';
import playlistdaplus from './imagemprogamacao/playlistdaplus.svg';
import redacaoplus from './imagemprogamacao/redacaoplus.svg';
import semlimitesparaamar from './imagemprogamacao/semlimitesparaamar.svg';
import tardeplus from './imagemprogamacao/tardeplus.svg';
import tatodomundoplus from './imagemprogamacao/tatodomundoplus.svg';
import timemachine from './imagemprogamacao/timemachine.svg';
import upgrade from './imagemprogamacao/upgrade.svg';
import PROGRAMAS from './imagemprogamacao/deubo.png';
import cearanews from './imagemprogamacao/cearanews.svg';
import plusmania from './imagemprogamacao/plusmania.svg';
import slowmotion from './imagemprogamacao/slowmotion.svg';
import vozdobrasil from './imagemprogamacao/vozdobrasil.png';
import { CaretDown, CaretLeft } from 'phosphor-react';
import { navigate } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import AdSense from './Adsense';
function Programacao() {
  const [currentProgram, setCurrentProgram] = useState(null);
  const [expandedProgram, setExpandedProgram] = useState(null);
  const [displayPrograms, setDisplayPrograms] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const currentProgramRef = useRef(null);
  const navigate = useNavigate();
  const programs = [
    {
      title: 'Corujão da Plus',
      days: [0, 1, 2, 3, 4, 5, 6],
      startHour: 0,
      endHour: 5,
      textDesc:
        'Curta as madrugadas com o Corujão da Plus, onde a música nunca para!',
      image: corujaodaplus,
    },
    {
      title: 'Clube Plus',
      days: [1, 2, 3, 4, 5],
      startHour: 5,
      endHour: 6,
      textDesc: 'Comece o dia com o pé direito no Clube Plus da Plus!',
      image: clubeplus,
    },
    {
      title: 'Deu B.O.',
      days: [1, 2, 3, 4, 5],
      startHour: 6,
      endHour: 7,
      textDesc:
        'O Deu B.O. é o seu aliado para ficar por dentro dos crimes e da justiça!',
      image: PROGRAMAS,
    },
    {
      title: 'Ceará News',
      days: [1, 2, 3, 4, 5],
      startHour: 7,
      endHour: 8,
      textDesc:
        'O Ceará News traz as últimas notícias do estado para você todas as manhãs!',
      image: cearanews,
    },
    {
      title: 'No Colo de Jesus e Maria',
      days: [1, 2, 3, 4, 5],
      startHour: 8,
      endHour: 9,
      textDesc: 'Acompanhe mensagens de fé e esperança todas as manhãs.',
      image: nocolodejesusedemaria,
    },
    {
      title: 'Manhã da Plus',
      days: [1, 2, 3, 4, 5, 6],
      startHour: 9,
      endHour: 11,
      textDesc: 'Comece o dia com a energia contagiante da Manhã da Plus!',
      image: manhadaplus,
    },
    {
      title: 'Redação da Plus',
      days: [1, 2, 3, 4, 5],
      startHour: 12,
      endHour: 14,
      textDesc:
        'Redação da Plus, informação e análise dos principais fatos do dia!',
      image: redacaoplus,
    },
    {
      title: 'Tarde Plus',
      days: [1, 2, 3, 4, 5],
      startHour: 14,
      endHour: 17,
      textDesc: 'Acompanhe a Tarde Plus e tenha uma tarde cheia de energia!',
      image: tardeplus,
    },
    {
      title: 'Tá Todo Mundo Plus',
      days: [1, 2, 3, 4, 5],
      startHour: 17,
      endHour: 18,
      textDesc:
        'Tá Todo Mundo Plus, a diversão está garantida para animar o seu final de tarde!',
      image: tatodomundoplus,
    },
    {
      title: 'As Mais Pedidas',
      days: [1, 2, 3, 4, 5],
      startHour: 18,
      endHour: 19,
      textDesc: 'Curta os sucessos mais pedidos em uma programação especial.',
      image: asmaispedidas,
    },
    {
      title: 'A Voz do Brasil',
      days: [1, 2, 3, 4, 5],
      startHour: 19,
      endHour: 20,
      textDesc:
        'A Voz do Brasil, a sua conexão com os acontecimentos do Brasil.',
      image: vozdobrasil,
    },
    {
      title: 'Plus Mania',
      days: [1, 2, 3, 4, 5],
      startHour: 20,
      endHour: 22,
      textDesc: 'O melhor da música para agitar a noite está na Plus Mania!',
      image: plusmania,
    },
    {
      title: 'Festa Plus',
      days: [6],
      startHour: 12,
      endHour: 14,
      textDesc:
        'Festa Plus, a trilha sonora perfeita para animar o seu sábado!',
      image: festaplus,
    },
    {
      title: 'Time Machine',
      days: [6],
      startHour: 21,
      endHour: 22,
      textDesc:
        'Time Machine, uma viagem no tempo com as melhores músicas do passado!',
      image: timemachine,
    },
    {
      title: 'Upgrade',
      days: [6],
      startHour: 22,
      endHour: 24,
      textDesc:
        'O programa que leva a sua noite a outro nível: Upgrade na Plus!',
      image: upgrade,
    },
    {
      title: 'Playlist da Plus',
      days: [0],
      startHour: 5,
      endHour: 8,
      textDesc:
        'Playlist da Plus, a trilha sonora perfeita para começar a semana!',
      image: playlistdaplus,
    },
    {
      title: 'Domingão da Plus',
      days: [0],
      startHour: 10,
      endHour: 15,
      textDesc:
        'Comece o domingo com as melhores músicas para animar o seu dia.',
      image: domingao,
    },
    {
      title: 'Mega Plus',
      days: [0],
      startHour: 15,
      endHour: 19,
      textDesc:
        'Mega Plus, a sua dose de energia para aproveitar o final de domingo',
      image: megaplus,
    },
    {
      title: 'A Grande Hora',
      days: [0],
      startHour: 19,
      endHour: 20,
      textDesc:
        '"O programa que transforma o seu domingo em um momento inesquecível: A Grande Hora!',
      image: agrandehora,
    },
    {
      title: 'Sem Limites Para Amar',
      days: [0],
      startHour: 22,
      endHour: 24,
      textDesc:
        'Transforme o seu domingo em uma celebração do amor com músicas apaixonadas.',
      image: semlimitesparaamar,
    },
    {
      title: 'As Melhores da Plus',
      days: [1, 2, 3, 4, 5, 6],
      startHour: 11,
      endHour: 12,
      textDesc:
        'Curta As Melhores da Plus e ouça os maiores sucessos em um só lugar!',
      image: asmelhoresdaplus,
    },
    {
      title: 'Slow Motion',
      days: [1, 2, 3, 4, 5],
      startHour: 22,
      endHour: 24,
      textDesc:
        'Acompanhe o Slow Motion e tenha uma noite relaxante e cheia de boas vibrações!',
      image: slowmotion,
    },
  ];
  const handleDayChange = (day) => {
    // Se o dia for uma string (ou seja, vindo do select), converta-o para um número e coloque-o em um array
    // Se o dia já for um array (ou seja, vindo de um botão), use-o como está
    setSelectedDay(typeof day === 'string' ? [Number(day)] : day);
  };
  useLayoutEffect(() => {
    const now = new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours();

    const sortedPrograms = [...programs].sort((a, b) => {
      const dayDiff = a.days[0] - b.days[0];
      if (dayDiff !== 0) {
        return dayDiff;
      } else {
        return a.startHour - b.startHour;
      }
    });

    const currentProgram = sortedPrograms.find((program) => {
      return (
        program.days.includes(currentDay) &&
        program.startHour <= currentHour &&
        program.endHour > currentHour
      );
    });

    setCurrentProgram(currentProgram);
    setExpandedProgram(currentProgram);

    // Exibe apenas os programas do dia selecionado
    const selectedPrograms = sortedPrograms.filter((program) =>
      selectedDay ? program.days.some((day) => selectedDay.includes(day)) : true
    );
    setDisplayPrograms(selectedPrograms);

    // Atrasa a rolagem até que os programas sejam renderizados
    setTimeout(() => {
      currentProgramRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 0);
  }, [selectedDay]);

  const handleExpand = (program) => {
    if (program === expandedProgram) {
      setExpandedProgram(null);
    } else {
      setExpandedProgram(program);
    }
  };
  useEffect(() => {
    // Adiciona a classe ao corpo quando o componente é montado
    document.body.classList.add('cor-de-fundo-especial');

    // Remove a classe do corpo quando o componente é desmontado
    return () => {
      document.body.classList.remove('cor-de-fundo-especial');
    };
  }, []);
  function formatDays(days) {
    const dayMap = {
      0: 'Domingo',
      1: 'Segunda',
      2: 'Terça',
      3: 'Quarta',
      4: 'Quinta',
      5: 'Sexta',
      6: 'Sábado',
    };

    const areConsecutive = days.every((day, index) => {
      return (
        index === 0 ||
        day === days[index - 1] + 1 ||
        (days[index - 1] === 6 && day === 0)
      );
    });

    if (areConsecutive && days.length > 1) {
      // Se o intervalo for de Domingo a Sábado, inverta para Sábado a Domingo
      if (days[0] === 0 && days[days.length - 1] === 6) {
        return `${dayMap[6]} a ${dayMap[0]}`;
      } else {
        return `${dayMap[days[0]]} a ${dayMap[days[days.length - 1]]}`;
      }
    } else {
      return days.map((day) => dayMap[day]).join(', ');
    }
  }
  function handleHome() {
    navigate('/');
  }
  useEffect(() => {
    const today = new Date();
    const currentDay = today.getDay();
    setSelectedDay(currentDay.toString());
  }, []);

  return (
    <div className="programacao-container">
      <div className="topBackContainer">
        <button onClick={handleHome} className="backButton7">
          <CaretLeft weight="bold" />
        </button>
        <h1 className="contentTitle">Programação</h1>
      </div>
      <div className="whiteLine8" />

      <div className="propagandaDiv">
        <AdSense />
      </div>
      <div className="botoes-dia-semana">
        <div className="select-container">
          <select
            className="botao-dia"
            value={selectedDay}
            onChange={(e) => handleDayChange(e.target.value)}
          >
            <option value="" disabled>
              Selecione um dia
            </option>
            <option value="1">Segunda-feira</option>
            <option value="2">Terça-feira</option>
            <option value="3">Quarta-feira</option>
            <option value="4">Quinta-feira</option>
            <option value="5">Sexta-feira</option>
            <option value="6">Sábado</option>
            <option value="0">Domingo</option>
          </select>
        </div>
        {/* <button className="botao-dia" onClick={() => handleDayChange([6])}>
          Sábado
        </button> */}

        {/* <button className="botao-dia" onClick={() => handleDayChange([0])}>
          Domingo
        </button> */}
      </div>
      <TransitionGroup className="programacao-lista">
        {displayPrograms.map((program, index) => (
          <CSSTransition key={index} timeout={500} classNames="programa">
            <div
              key={index}
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              {program !== currentProgram && (
                <div
                  className={`programacao-row ${
                    program === currentProgram ? 'current-program' : ''
                  }`}
                >
                  <div className="programacao-data">
                    <p>{`${program.startHour
                      .toString()
                      .padStart(2, '0')}:00`}</p>
                  </div>
                  <div className="programacao-titulo">
                    <p>{program.title}</p>
                    {/* <p>{formatDays(program.days)}</p> */}
                  </div>
                  <div
                    className="programacao-expand"
                    onClick={() => handleExpand(program)}
                  >
                    <p>
                      <CaretDown weight="bold" />
                    </p>
                  </div>
                </div>
              )}
              {(program === currentProgram || program === expandedProgram) && (
                <div
                  className={`programacao-expanded-row ${
                    program === expandedProgram && program !== currentProgram
                      ? 'expanded'
                      : ''
                  } ${program === currentProgram ? 'current-program' : ''} ${
                    program.title === 'Deu B.O.' ||
                    program.title === 'A Voz do Brasil'
                      ? 'special-program'
                      : ''
                  }`}
                  ref={program === currentProgram ? currentProgramRef : null}
                >
                  <div className="programacao-imagem">
                    <img
                      src={program.image}
                      alt="Imagem"
                      className={`${
                        program === expandedProgram ? 'larger-image' : ''
                      } ${
                        program.title === 'Deu B.O.' ||
                        program.title === 'A Voz do Brasil'
                          ? 'special-program-image'
                          : program.title === 'Ceará News'
                          ? 'ceara-news-image'
                          : ''
                      }`}
                    />
                    {program === currentProgram && (
                      <p>{`${program.startHour
                        .toString()
                        .padStart(2, '0')}:00`}</p>
                    )}
                  </div>
                  <div className="programacao-expanded-titulo">
                    <h1>{program.title}</h1>
                    <span>{formatDays(program.days)}</span>
                    <p>{program.textDesc}</p>
                  </div>
                </div>
              )}
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}

export default Programacao;
