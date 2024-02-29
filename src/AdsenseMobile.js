import React, { useEffect, useRef } from 'react';

const AdSenseMobile = () => {
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
      style={{
        display: 'block',
        width: '100%',
        height: '150px !important',
        
      }} // Adicionado borda aqui
      data-ad-client="ca-pub-7840500895207824"
      data-ad-slot="8775639643"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdSenseMobile;
