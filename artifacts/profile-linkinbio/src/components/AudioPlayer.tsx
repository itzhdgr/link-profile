import React, { useEffect, useRef, useState } from 'react';
import { PLAYLIST } from '../playlist';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  startPlaying: boolean;
}

export function AudioPlayer({ startPlaying }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (startPlaying && !hasStartedRef.current) {
      hasStartedRef.current = true;
      setPlaying(true);
      audioRef.current?.play().catch(() => {});
    }
  }, [startPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing, currentIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  const handleEnded = () => {
    setCurrentIndex((prev) => (prev + 1) % PLAYLIST.length);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 glass-panel rounded-2xl p-4 flex items-center gap-4 animate-in slide-in-from-bottom-8 duration-700 fade-in text-white shadow-xl">
      <audio
        ref={audioRef}
        src={PLAYLIST[currentIndex].src}
        onEnded={handleEnded}
        className="hidden"
      />
      <button
        onClick={() => setPlaying(!playing)}
        className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors border border-white/10"
        aria-label={playing ? 'Pause' : 'Play'}
      >
        {playing ? (
          <Pause size={18} fill="currentColor" />
        ) : (
          <Play size={18} fill="currentColor" className="ml-1" />
        )}
      </button>

      <div className="flex flex-col min-w-[100px] max-w-[140px]">
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-60 mb-0.5">Now Playing</span>
        <span className="text-sm font-sans truncate drop-shadow-sm font-medium">
          {PLAYLIST[currentIndex].title}
        </span>
      </div>

      <div className="flex items-center gap-2 border-l border-white/20 pl-4 ml-1">
        <button
          onClick={() => setMuted(!muted)}
          className="opacity-70 hover:opacity-100 transition-opacity"
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          {muted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={muted ? 0 : volume}
          onChange={(e) => {
            setVolume(parseFloat(e.target.value));
            setMuted(false);
          }}
          className="w-16 h-1.5 bg-white/20 rounded-full appearance-none outline-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
            [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          aria-label="Volume"
        />
      </div>
    </div>
  );
}
