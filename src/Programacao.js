import { useLayoutEffect, useState, useEffect, createRef, useRef } from 'react';
import './Programacao.css';
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
function Programacao() {
  const [currentProgram, setCurrentProgram] = useState(null);
  const [expandedProgram, setExpandedProgram] = useState(null);
  const [displayPrograms, setDisplayPrograms] = useState([]);
  const currentProgramRef = useRef(null);
  const navigate = useNavigate();
  const programs = [
    {
      title: 'Corujão da Plus',
      days: [0, 1, 2, 3, 4, 5, 6],
      startHour: 0,
      endHour: 5,
      image: corujaodaplus,
    },
    {
      title: 'Clube Plus',
      days: [1, 2, 3, 4, 5],
      startHour: 5,
      endHour: 6,
      image: clubeplus,
    },
    {
      title: 'Deu B.O.',
      days: [1, 2, 3, 4, 5],
      startHour: 6,
      endHour: 7,
      image: PROGRAMAS,
    },
    {
      title: 'Ceará News',
      days: [1, 2, 3, 4, 5],
      startHour: 7,
      endHour: 8,
      image: cearanews,
    },
    {
      title: 'No Colo de Jesus e Maria',
      days: [1, 2, 3, 4, 5],
      startHour: 8,
      endHour: 9,
      image: nocolodejesusedemaria,
    },
    {
      title: 'Manhã da Plus',
      days: [1, 2, 3, 4, 5, 6],
      startHour: 9,
      endHour: 11,
      image: manhadaplus,
    },
    {
      title: 'Redação da Plus',
      days: [1, 2, 3, 4, 5],
      startHour: 12,
      endHour: 14,
      image: redacaoplus,
    },
    {
      title: 'Tarde Plus',
      days: [1, 2, 3, 4, 5],
      startHour: 14,
      endHour: 17,
      image: tardeplus,
    },
    {
      title: 'Tá Todo Mundo Plus',
      days: [1, 2, 3, 4, 5],
      startHour: 17,
      endHour: 18,
      image: tatodomundoplus,
    },
    {
      title: 'As Mais Pedidas',
      days: [1, 2, 3, 4, 5],
      startHour: 18,
      endHour: 19,
      image: asmaispedidas,
    },
    {
      title: 'A Voz do Brasil',
      days: [1, 2, 3, 4, 5],
      startHour: 19,
      endHour: 20,
      image: vozdobrasil,
    },
    {
      title: 'Plus Mania',
      days: [1, 2, 3, 4, 5],
      startHour: 20,
      endHour: 22,
      image: plusmania,
    },
    {
      title: 'Festa Plus',
      days: [6],
      startHour: 12,
      endHour: 14,
      image: festaplus,
    },
    {
      title: 'Time Machine',
      days: [6],
      startHour: 21,
      endHour: 22,
      image: timemachine,
    },
    {
      title: 'Upgrade',
      days: [6],
      startHour: 22,
      endHour: 24,
      image: upgrade,
    },
    {
      title: 'Playlist da Plus',
      days: [0],
      startHour: 5,
      endHour: 8,
      image: playlistdaplus,
    },
    {
      title: 'Domingão da Plus',
      days: [0],
      startHour: 10,
      endHour: 15,
      image: domingao,
    },
    {
      title: 'Mega Plus',
      days: [0],
      startHour: 15,
      endHour: 19,
      image: megaplus,
    },
    {
      title: 'A Grande Hora',
      days: [0],
      startHour: 19,
      endHour: 20,
      image: agrandehora,
    },
    {
      title: 'Sem Limites Para Amar',
      days: [0],
      startHour: 22,
      endHour: 24,
      image: semlimitesparaamar,
    },
    {
      title: 'As Melhores da Plus',
      days: [1, 2, 3, 4, 5, 6],
      startHour: 11,
      endHour: 12,
      image: asmelhoresdaplus,
    },
    {
      title: 'Slow Motion',
      days: [1, 2, 3, 4, 5],
      startHour: 22,
      endHour: 24,
      image: slowmotion,
    },
  ];

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

    // Exibe apenas os programas do dia atual
    const todaysPrograms = sortedPrograms.filter((program) =>
      program.days.includes(currentDay)
    );
    setDisplayPrograms(todaysPrograms);

    // Atrasa a rolagem até que os programas sejam renderizados
    setTimeout(() => {
      currentProgramRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 0);
  }, []);

  const handleExpand = (program) => {
    if (program === expandedProgram) {
      setExpandedProgram(null);
    } else {
      setExpandedProgram(program);
    }
  };

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
        return `${dayMap[6]} à ${dayMap[0]}`;
      } else {
        return `${dayMap[days[0]]} à ${dayMap[days[days.length - 1]]}`;
      }
    } else {
      return days.map((day) => dayMap[day]).join(', ');
    }
  }
  function handleHome() {
    navigate('/');
  }

  return (
    <div className="programacao-container">
      <h1 className="h1StyleDrops">Programação</h1>
      <div className="whiteLine4" />
      <button onClick={handleHome} className="backButton1">
        <CaretLeft weight="bold" />
      </button>
      <div className="propagandaDiv" />
      {displayPrograms.map((program, index) => (
        <div key={index}>
          {program !== currentProgram && (
            <div
              className={`programacao-row ${
                program === currentProgram ? 'current-program' : ''
              }`}
            >
              <div className="programacao-data">
                <p>{`${program.startHour.toString().padStart(2, '0')}:00`}</p>
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
                  <p>{`${program.startHour.toString().padStart(2, '0')}:00`}</p>
                )}
              </div>
              <div className="programacao-expanded-titulo">
                <h1>{program.title}</h1>
                <span>{formatDays(program.days)}</span>
                <p>Texto genérico</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Programacao;
