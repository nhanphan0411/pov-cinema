import { useRef, useEffect } from "react";

type Props = {
  src: string;
  onEnd: () => void;
  loop?: boolean;
  muted?: boolean;
  freezeOnEnd?: boolean;
};

export const VideoPlayer: React.FC<Props> = ({
  src,
  onEnd,
  loop = false,
  muted = true,
  freezeOnEnd = false
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = muted;
    video.playsInline = true;

    const tryPlay = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch((err) => {
          console.warn("Video play failed:", err);
        });
      }
    };

    const handleEnded = () => {
      if (freezeOnEnd && video) {
        video.pause();
        video.currentTime = video.duration;

        const handleSeeked = () => {
          video.removeEventListener('seeked', handleSeeked);
          onEnd();
        };

        video.addEventListener('seeked', handleSeeked);
      } else {
        onEnd();
      }
    };

    const handleLoaded = () => {
      tryPlay();
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("ended", handleEnded);
    if (video.readyState >= 1) {
      handleLoaded();
    } else {
      video.addEventListener("loadedmetadata", handleLoaded);
    }


    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
      video.removeEventListener("ended", handleEnded);
    };
  }, [src, onEnd, freezeOnEnd, muted]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={src}
        loop={loop && !freezeOnEnd}
        muted={muted}
      />
    </div>
  );
};
