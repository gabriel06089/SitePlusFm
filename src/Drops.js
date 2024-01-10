import React, { useEffect, useState } from 'react';

const Drops = () => {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    fetch('https://plusfm.com.br/wp-json/wp/v2/posts?status&per_page=3')
      .then((response) => response.json())
      .then((data) => setDrops(data));
  }, []);

  return (
    <div>
      {drops.map((drop) => (
        <div
          key={drop.id}
          style={{
            border: '1px solid black',
            borderRadius: '10px',
            margin: '10px',
            padding: '10px',
          }}
        >
          <img
            src={drop.image}
            alt={drop.title}
            style={{ width: '20vw', height: '10vw', borderRadius: '10px' }}
          />
        </div>
      ))}
    </div>
  );
};

export default Drops;
