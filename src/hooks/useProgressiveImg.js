import { useEffect, useState } from 'react';

const useProgressiveImg = (lowQualitySrc, highQualitySrc) => {
  const [src, setSrc] = useState(lowQualitySrc);
  const blur = src === lowQualitySrc;

  useEffect(() => {
    if (!blur) {
      return;
    }

    setSrc(lowQualitySrc);

    const img = new Image();
    img.src = highQualitySrc;

    img.onload = () => {
      setSrc(highQualitySrc);
    };
  }, [blur, lowQualitySrc, highQualitySrc, setSrc]);

  return [src, blur];
};
export default useProgressiveImg;
