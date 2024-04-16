import React, {FC, useEffect, useRef} from 'react';

interface VideoMessageProps {
  blob: Blob
}

const VideoMessage: FC<VideoMessageProps> = ({blob}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = URL.createObjectURL(blob);
    }
  }, [videoRef, blob]);

  return (
    <video controls preload="none" width={200} ref={videoRef} autoPlay/>
  );
};

export default VideoMessage;