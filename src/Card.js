import React, { useEffect, useState } from 'react';

const Card = ({ song }) => {
  const [thumbnail, setThumbnail] = useState('');
  const [videoId, setVideoId] = useState('');

  useEffect(() => {
    console.log(`Fetching data for song: ${song}`); // Log the song being fetched
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${song}&key=AIzaSyBgySMhsicde7S02heiF3D5RBmeCHWhriE`
    )
      .then((response) => {
        console.log(`Response for song ${song}:`, response); // Log the response
        return response.json();
      })
      .then((data) => {
        console.log(`Data for song ${song}:`, data); // Log the data
        setThumbnail(data.items[0].snippet.thumbnails.default.url);
        setVideoId(data.items[0].id.videoId);
      })
      .catch((error) => console.error(`Error fetching data for song ${song}:`, error)); // Log any errors
  }, [song]);

  return (
    <div className="smallCard">
      <img src={thumbnail} alt={song} />
      <p>{song}</p>
      {videoId && (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={song}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

const CardTop10 = () => {
  const songs = [
    'luan santana - mulher segura',
    'menos e mais - matadinha',
    'manu bahtidao - daqui pra frente',
    'guilherme e benuto - milionario',
    'gustavo lima - desejo imoral',
    'marcos e belutti - casal de solteiro',
    'ana castela - solteiro forçado',
    'dilsinho - diferentao',
    'anita - joga pra lua',
    'simone mende - dois fugitivos',
  ];

  return (
    <div className="top10Container">
      {songs.map((song, index) => (
        <Card key={index} song={song} />
      ))}
    </div>
  );
};

export default CardTop10;