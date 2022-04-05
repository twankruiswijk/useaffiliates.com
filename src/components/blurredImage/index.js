import Image from 'next/image';
import useProgressiveImg from '@/hooks/useProgressiveImg';

const BlurredUpImage = ({ imgSrc, alt, props }) => {
  const [src, blur] = useProgressiveImg('/img/blurPlaceholder.webp', imgSrc);

  return (
    <Image
      src={src}
      alt={alt}
      style={{
        filter: blur ? 'blur(20px)' : 'none',
        transition: blur ? 'none' : 'filter 0.3s ease-out',
        clipPath: 'inset(-1)',
      }}
      {...props}
    />
  );
};

export default BlurredUpImage;
