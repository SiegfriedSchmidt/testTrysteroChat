import React, {FC, useEffect, useRef} from 'react';

interface ImageMessageProps {
  blob: Blob
}

const ImageMessage: FC<ImageMessageProps> = ({blob}) => {
  const videoRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = URL.createObjectURL(blob);
    }
  }, [videoRef, blob]);

  return (
    <img width={200} ref={videoRef} alt='image'/>
  );
};

export default ImageMessage;