import { useRef, useEffect, useState } from 'react';

type Props = {
  src: string;
  onEnd: () => void;
};

export const VideoPlayer: React.FC<Props> = ({ src, onEnd }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      video.muted = muted;
      video.play().catch(() => {
        // Autoplay blocked
      });
    }
  }, [src, muted]);

  const handleUnmute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      setMuted(false);
      video.play();
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={src}
        onEnded={onEnd}
        playsInline
        muted={muted}
        autoPlay
      />
      
      {muted && (
        <div className="absolute bottom-4 right-4">
          <button
            onClick={handleUnmute}
            className="bg-white/80 text-black px-4 py-2 rounded-full shadow-lg hover:bg-white"
          >
            🔈 Unmute
          </button>
        </div>
      )}
    </div>
  );
};
