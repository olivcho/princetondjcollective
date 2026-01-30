"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import Image from "next/image";

interface Mix {
  id: string;
  track_name: string;
  track_url: string;
  month?: string;
}

interface MixesPlayerProps {
  mixes: Mix[];
}

export default function MixesPlayer({ mixes }: MixesPlayerProps) {
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const glowAnimationRef = useRef<ReturnType<typeof animate> | null>(null);
  const sliderAnimationRef = useRef<ReturnType<typeof animate> | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // Format time as M:SS
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Handle track click
  const handleTrackClick = (mix: Mix) => {
    if (currentTrack === mix.id) {
      // Toggle play/pause for current track
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      // Play new track
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      const audio = new Audio(mix.track_url);
      audioRef.current = audio;
      
      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });
      
      audio.addEventListener("timeupdate", () => {
        if (!isDragging) {
          setCurrentTime(audio.currentTime);
        }
      });
      
      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
      
      audio.play();
      setCurrentTrack(mix.id);
      setIsPlaying(true);
      setCurrentTime(0);
    }
  };

  // Handle slider interaction
  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !sliderContainerRef.current) return;
    
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSliderDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !audioRef.current || !sliderContainerRef.current) return;
    
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    
    setCurrentTime(newTime);
  };

  const handleDragEnd = () => {
    if (isDragging && audioRef.current) {
      audioRef.current.currentTime = currentTime;
    }
    setIsDragging(false);
  };

  // Slider pulse animation when playing
  useEffect(() => {
    if (sliderAnimationRef.current) {
      sliderAnimationRef.current.pause();
    }

    if (isPlaying && progressRef.current) {
      sliderAnimationRef.current = animate(progressRef.current, {
        boxShadow: [
          "0 0 5px #ff6b6b, 0 0 10px #ff6b6b",
          "0 0 8px #feca57, 0 0 15px #feca57",
          "0 0 5px #48dbfb, 0 0 10px #48dbfb",
          "0 0 8px #ff9ff3, 0 0 15px #ff9ff3",
          "0 0 5px #ff6b6b, 0 0 10px #ff6b6b",
        ],
        duration: 2000,
        ease: "linear",
        loop: true,
      });
    }

    return () => {
      if (sliderAnimationRef.current) {
        sliderAnimationRef.current.pause();
      }
    };
  }, [isPlaying]);

  // Cleanup audio on unmount (when leaving page)
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (glowAnimationRef.current) {
        glowAnimationRef.current.pause();
      }
      if (sliderAnimationRef.current) {
        sliderAnimationRef.current.pause();
      }
    };
  }, []);

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-3xl px-8 md:px-0">
      {/* Track List */}
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col items-start gap-4 text-base md:text-lg font-bold">
          {mixes.map((mix) => (
            <button
              key={mix.id}
              data-track-id={mix.id}
              onClick={() => handleTrackClick(mix)}
              className={`
                text-left transition-all duration-200 cursor-pointer
                hover:opacity-80 focus:outline-none
                ${currentTrack === mix.id && isPlaying ? "text-inherit" : ""}
                ${currentTrack === mix.id && !isPlaying ? "opacity-60" : ""}
              `}
              style={{
                textShadow: currentTrack === mix.id && !isPlaying 
                  ? "0 0 5px rgba(100, 100, 100, 0.5)" 
                  : "none"
              }}
            >
              {currentTrack === mix.id && (
                <span className="mr-2">▶</span>
              )}
              {mix.track_name}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <Image
            src="/vinyl_record.png"
            alt="Vinyl Record"
            width={250}
            height={250}
            className={`w-40 h-40 md:w-64 md:h-64 animate-spin ${isPlaying ? "" : "[animation-play-state:paused]"}`}
            style={{ animationDuration: "2s" }}
            sizes="(max-width: 768px) 10rem, 16rem"
          />
        </div>
      </div>

      {/* Audio Player Controls */}
      {currentTrack && (
        <div className="w-full flex flex-col gap-3 mt-4 animate-fadeIn">
          {/* Slider */}
          <div
            ref={sliderContainerRef}
            className="w-full h-3 bg-neutral-300 rounded-full cursor-pointer relative overflow-hidden"
            onClick={handleSliderClick}
            onMouseDown={() => setIsDragging(true)}
            onMouseMove={handleSliderDrag}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
          >
            <div
              ref={progressRef}
              className="h-full bg-neutral-800 rounded-full transition-all duration-100"
              style={{ width: `${progressPercentage}%` }}
            />
            {/* Slider thumb */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-neutral-900 rounded-full shadow-lg transition-all duration-100"
              style={{ 
                left: `calc(${progressPercentage}% - 8px)`,
                boxShadow: isPlaying ? "0 0 8px rgba(0,0,0,0.4)" : "0 2px 4px rgba(0,0,0,0.2)"
              }}
            />
          </div>

          {/* Timer */}
          <div className="flex justify-between text-sm font-mono text-neutral-600">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
