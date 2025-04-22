import * as React from "react";
import {
  MdPlayArrow,
  MdPause,
  MdSkipNext,
  MdSkipPrevious,
  MdVolumeUp,
  MdVolumeOff,
} from "react-icons/md";
import { CgSpinner } from "react-icons/cg";
import IconButton from "../../components/Audio/components/IconButton";
import { Track } from "@/entities/track/index.ts";
import { API_BASE_URL } from "@/shared/configs/urls.ts";
import { usePlayerData } from "@/pages/tracks/lib/usePlayerData";
import { useHasNext, useHasPrevious, useList, useTrack, useTrackIndex } from "@/shared/model";
import { set } from "react-hook-form";

interface AudioPlayerProps {
  currentTrack?: Track;
  trackIndex: number;
  hasNextTrack: boolean;
  hasPreviousTrack: boolean;
  onNext: () => void;
  onPrev: () => void;
}

function formatDurationDisplay(duration: number) {
    const min = Math.floor(duration / 60);
    const sec = Math.floor(duration - min * 60);
  
    const formatted = [min, sec].map((n) => (n < 10 ? '0' + n : n)).join(':');
  
    return formatted;
  }

export default function AudioPlayer() {
  const track = useTrack();
  const list = useList();
  const trackIndex = useTrackIndex();
  const hasNextPage = useHasNext();
  const hasPreviousPage = useHasPrevious();
  const { setNextTrack, setPrevTrack } = usePlayerData();
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const [isReady, setIsReady] = React.useState(false);
  const [volume, setVolume] = React.useState(0.2);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTrack, setCurrentTrack] = React.useState<Track | null>();
  const [buffered, setBuffered] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [currrentProgress, setCurrrentProgress] = React.useState(0);

  const elapsedDisplay = formatDurationDisplay(currrentProgress);
  const canPlayPrevTrack = trackIndex > 0 || hasPreviousPage;
  const canPlayNextTrack = trackIndex < list.length - 1 || hasNextPage;

  React.useEffect(() => {
    setCurrentTrack((prev) => !!prev ? track : null)
  }, [track]);

  React.useEffect(() => {
    audioRef.current?.pause();

    const timeout = setTimeout(() => {
      audioRef.current?.play();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [currentTrack]);

  const handleNext = () => {
    if (canPlayNextTrack) {
      setNextTrack();
    }
  };

  const handlePrev = () => {
    if (canPlayPrevTrack) {
      setPrevTrack();
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleBufferProgress: React.ReactEventHandler<HTMLAudioElement> = (e) => {
    const audio = e.currentTarget;
    const dur = audio.duration;
    if (dur > 0) {
      for (let i = 0; i < audio.buffered.length; i++) {
        if (audio.buffered.start(audio.buffered.length - 1 - i) < audio.currentTime) {
          const bufferedLength = audio.buffered.end(audio.buffered.length - 1 - i);
          setBuffered(bufferedLength);
          break;
        }
      }
    }
  };

  return (
    <div className="bg-slate-900 text-slate-400 p-3 relative">
      {currentTrack && (
        <audio
          ref={audioRef}
          preload="metadata"
          onDurationChange={(e) => setDuration(e.currentTarget.duration)}
          onPlaying={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={handleNext}
          onCanPlay={(e) => {
            e.currentTarget.volume = volume;
            setIsReady(true);
          }}
          onTimeUpdate={(e) => {
            setCurrrentProgress(e.currentTarget.currentTime);
            handleBufferProgress(e);
          }}
          onProgress={handleBufferProgress}
          onVolumeChange={(e) => setVolume(e.currentTarget.volume)}
        >
          <source src={`${API_BASE_URL}/files/${currentTrack.audioFile}`} />
        </audio>
      )}

      <div className="flex flex-col items-center justify-center">
        <div className="text-center mb-1">
          <p className="text-slate-300 font-bold">{currentTrack?.title ?? "Select a song"}</p>
          <p className="text-xs">Singer Name</p>
        </div>
      </div>
      <div className="grid grid-cols-3 items-center mt-4">
        <span className="text-xs">{/* {elapsedDisplay} / {durationDisplay} */}</span>
        <div className="flex items-center gap-4 justify-self-center">
          <IconButton
            onClick={handlePrev}
            disabled={!canPlayPrevTrack}
            aria-label="go to previous"
            intent="secondary"
          >
            <MdSkipPrevious size={24} />
          </IconButton>
          <IconButton
            disabled={!isReady}
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
            size="lg"
          >
            {!isReady && currentTrack ? (
              <CgSpinner size={24} className="animate-spin" />
            ) : isPlaying ? (
              <MdPause size={30} />
            ) : (
              <MdPlayArrow size={30} />
            )}
          </IconButton>
          <IconButton
            onClick={handleNext}
            disabled={!canPlayNextTrack}
            aria-label="go to next"
            intent="secondary"
          >
            <MdSkipNext size={24} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
