import { useEffect, useState } from 'react';

import imgPlaceholder from '@assets/imgPlaceholder.png';

export const useImage = (src: string) => {
  const [imageSrc, setImageSrc] = useState(imgPlaceholder);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
    };
  }, [src]);

  return {
    imageSrc,
    isLoading: imageSrc === imgPlaceholder,
  };
};
