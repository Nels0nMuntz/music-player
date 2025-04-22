import { useEffect, useRef } from "react";
import { API_BASE_URL } from "@/shared/configs";
import { PlayerEmpty } from "./PlayerEmpty";
import { PlayerSkeleton } from "./PlayerSkeleton";
import { usePlayerData } from "../../../lib/usePlayerData";
import { usePlayerActions, useIsPlaying, useDirection, useCanStartPlaying } from "@/shared/model";

export const Player = () => {
  const { track, isInitialized, setNextTrack, setPrevTrack } = usePlayerData();
  const isPlaying = useIsPlaying();
  const direction = useDirection();
  const canStartPlaying = useCanStartPlaying();
  const { setDuration, setCurrentTime, setIsPlaying, setCanStartPlaying } = usePlayerActions();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [track]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
    setCanStartPlaying(true);
  };

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play();
  };

  const pause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
  };

  const playNext = () => {
    setNextTrack();
    setIsPlaying(false);
    setCanStartPlaying(true);
  };

  const playPrev = () => {
    setPrevTrack();
    setIsPlaying(false);
    setCanStartPlaying(true);
  };

  const handleError = () => {
    if (direction === "next") {
      playNext();
    } else {
      playPrev();
    }
  };

  useEffect(() => {
    if (canStartPlaying) {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  }, [track, canStartPlaying]);

  useEffect(() => {
    if (isPlaying) {
      play();
    } else {
      pause();
    }
  }, [isPlaying]);

  if (!isInitialized) {
    return <PlayerSkeleton />;
  }

  if (!track) {
    return <PlayerEmpty />;
  }

  return (
    <section className="w-full max-w-2xl mx-auto flex flex-col items-center p-6 rounded-4xl shadow-player border-2 border-primary">
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
      {/* <div className="flex items-center gap-x-2 mt-6">
        <Button
          variant="link"
          onClick={playPrev}
          disabled={trackIndex === 0}
          className="w-auto h-auto p-0 pr-0 pl-0 cursor-pointer"
        >
          <CircleChevronLeft
            className={cn(["size-8", trackIndex !== 0 ? "text-primary" : "text-muted-foreground"])}
          />
        </Button>
        <Button
          variant="link"
          onClick={togglePlay}
          className="w-auto h-auto p-0 pr-0 pl-0 cursor-pointer"
        >
          {isPlaying ? (
            <CirclePause className="size-12 text-primary" />
          ) : (
            <CirclePlay className="size-12 text-primary" />
          )}
        </Button>
        <Button
          variant="link"
          onClick={playNext}
          disabled={!hasNext}
          className="w-auto h-auto p-0 pr-0 pl-0 cursor-pointer"
        >
          <CircleChevronRight
            className={cn(["size-8", hasNext ? "text-primary" : "text-muted-foreground"])}
          />
        </Button>
      </div> */}
      <audio
        ref={audioRef}
        src={`${API_BASE_URL}/files/${track.audioFile}`}
        onError={handleError}
      />
    </section>
  );
};
