import React, { useEffect, useRef } from 'react';

const AdSense = () => {
  const adRef = useRef();

  useEffect(() => {
    if (adRef.current && adRef.current.childNodes.length === 0) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: 'block', width: '100%' }} // Defina a largura aqui
      data-ad-client="ca-pub-7840500895207824"
      data-ad-slot="8444930177"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdSense;
