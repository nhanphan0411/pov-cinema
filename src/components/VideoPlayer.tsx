import React, { useRef, useEffect } from 'react';

type Props = {
  src: string;
  onEnd: () => void;
};

export const VideoPlayer: React.FC<Props> = ({ src, onEnd }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      className="w-full h-auto"
      onEnded={onEnd}
      controls={false}
      autoPlay
    />
  );
};
