import { useEffect, useRef, useState } from "react";
import {
  CircleChevronLeft,
  CircleChevronRight,
  CirclePause,
  CirclePlay,
  Loader2,
} from "lucide-react";
import { API_BASE_URL } from "@/shared/configs";
import { Button } from "@/shared/ui";
import {
  usePlayerActions,
  useIsPlaying,
  useDirection,
  useCanStartPlaying,
  useTrackIndex,
  useHasPrevious,
  useHasNext,
  useList,
  useTrack,
  useIsInitialized,
} from "@/shared/model";
import { PlayerEmpty } from "./PlayerEmpty";
import { PlayerSkeleton } from "./PlayerSkeleton";
import { usePlayerData } from "../../../lib/usePlayerData";
import { cn } from "@/shared/lib";

export const Player = () => {
  const track = useTrack();
  // const playingTrack = usePlayingTrack();
  const list = useList();
  const isPlaying = useIsPlaying();
  const direction = useDirection();
  const trackIndex = useTrackIndex();
  const hasNextPage = useHasNext();
  const hasPreviousPage = useHasPrevious();
  const isInitialized = useIsInitialized();
  const canStartPlaying = useCanStartPlaying();
  const { setDuration, setCurrentTime, setIsPlaying, setCanStartPlaying } = usePlayerActions();
  const { setNextTrack, setPrevTrack } = usePlayerData();

  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const canPlayPrevTrack = trackIndex > 0 || hasPreviousPage;
  const canPlayNextTrack = trackIndex < list.length - 1 || hasNextPage;

  // useEffect(() => {
  //   const audio = audioRef.current;
  //   if (!audio) return;

  //   const handleLoadedMetadata = () => {
  //     setDuration(audio.duration);
  //   };

  //   const handleTimeUpdate = () => {
  //     setCurrentTime(audio.currentTime);
  //   };

  //   audio.addEventListener("loadedmetadata", handleLoadedMetadata);
  //   audio.addEventListener("timeupdate", handleTimeUpdate);

  //   return () => {
  //     audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
  //     audio.removeEventListener("timeupdate", handleTimeUpdate);
  //   };
  // }, [track]);

  useEffect(() => {
    audioRef.current?.pause();

    const timeout = setTimeout(() => {
      if (canStartPlaying) {
        audioRef.current?.play();
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [track, canStartPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  const playNext = () => {
    if (canPlayNextTrack) {
      setNextTrack();
      setCanStartPlaying(true);
    }
    setIsPlaying(true);
  };

  const playPrev = () => {
    if (canPlayPrevTrack) {
      setPrevTrack();
      setCanStartPlaying(true);
    }
    setIsPlaying(true);
  };

  const handleError = () => {
    if (direction === "next") {
      playNext();
    } else {
      playPrev();
    }
  };

  if (!isInitialized) {
    return <PlayerSkeleton />;
  }

  return (
    <section
      key={track?.id}
      className="w-full max-w-2xl mx-auto flex flex-col items-center p-6 rounded-4xl shadow-player border-2 border-primary"
    >
      <div className="w-full text-right">
        <span className="text-muted-foreground">Next - </span>
        <span className="font-medium text-foreground">Utopia</span>
      </div>
      <div className="mt-4">
        <div className="w-32 h-32 rounded-xl bg-indigo-700"></div>
      </div>
      <h3 className="font-medium text-2xl">Torashu calm</h3>
      <div className="font-medium text-muted-foreground">LoFi HipHop</div>
      {/* <div className="text-sm font-mono">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div> */}
      <div className="flex items-center gap-x-2 mt-6">
        <Button
          variant="link"
          onClick={playPrev}
          disabled={!canPlayPrevTrack}
          className="w-auto h-auto p-0 pr-0 pl-0 cursor-pointer"
        >
          <CircleChevronLeft
            className={cn(["size-8", canPlayPrevTrack ? "text-primary" : "text-muted-foreground"])}
          />
        </Button>
        <Button
          variant="link"
          disabled={!isReady}
          onClick={togglePlay}
          className="w-auto h-auto p-0 pr-0 pl-0 cursor-pointer"
        >
          {!isReady && track ? (
            <Loader2 />
          ) : isPlaying ? (
            <CirclePause className="size-12 text-primary" />
          ) : (
            <CirclePlay className="size-12 text-primary" />
          )}
        </Button>
        <Button
          variant="link"
          onClick={playNext}
          disabled={!canPlayNextTrack}
          className="w-auto h-auto p-0 pr-0 pl-0 cursor-pointer"
        >
          <CircleChevronRight
            className={cn(["size-8", canPlayNextTrack ? "text-primary" : "text-muted-foreground"])}
          />
        </Button>
      </div>
      {track && (
        <audio
          ref={audioRef}
          preload="metadata"
          onDurationChange={(e) => setDuration(e.currentTarget.duration)}
          // onPlaying={() => setIsPlaying(true)}
          // onPause={() => setIsPlaying(false)}
          onEnded={playNext}
          onCanPlay={(e) => {
            // e.currentTarget.volume = volume;
            setIsReady(true);
          }}
          onError={handleError}
          // onTimeUpdate={(e) => {
          //   setCurrrentProgress(e.currentTarget.currentTime);
          //   handleBufferProgress(e);
          // }}
          // onProgress={handleBufferProgress}
          // onVolumeChange={(e) => setVolume(e.currentTarget.volume)}
        >
          <source src={`${API_BASE_URL}/files/${track.audioFile}`} />
        </audio>
      )}
    </section>
  );
};
