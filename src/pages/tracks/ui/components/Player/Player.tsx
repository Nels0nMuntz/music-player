import { useEffect, useRef, useState } from "react";
import {
  CircleChevronLeft,
  CircleChevronRight,
  CirclePause,
  CirclePlay,
  Loader2,
  Music4,
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
import { PlayerSkeleton } from "./PlayerSkeleton";
import { usePlayerData } from "../../../lib/usePlayerData";
import { cn } from "@/shared/lib";
import AudioProgressBar from "./AudioProgressBar";

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
  const { setIsPlaying, setCanStartPlaying } = usePlayerActions();
  const { setNextTrack, setPrevTrack } = usePlayerData();

  const [isReady, setIsReady] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currrentProgress, setCurrrentProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const canPlayPrevTrack = trackIndex > 0 || hasPreviousPage;
  const canPlayNextTrack = trackIndex < list.length - 1 || hasNextPage;

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

  if (!isInitialized) {
    return <PlayerSkeleton />;
  }

  return (
    <section
      key={track?.id}
      className="w-full max-w-2xl mx-auto flex flex-col items-center p-6 rounded-4xl shadow-player border-2 border-primary"
      aria-disabled={isInitialized ? "false" : "true"}
    >
      <div className="my-4">
        {track?.coverImage ? (
          <img src={track.coverImage} width={144} height={144} className="w-36 h-36 rounded-xl" />
        ) : (
          <div className="w-36 h-36 rounded-xl border-primary border-2 flex items-center justify-center shrink-0 bg-gradient-to-br from-[#A678D5] to-[#F6F1FA]">
            <Music4 className="text-primary size-12" />
          </div>
        )}
      </div>
      {track ? (
        <h3 className="font-medium text-xl text-center max-w-60 mx-auto">{track.title}</h3>
      ) : (
        <h3 className="font-medium max-w-60 mx-auto text-center">
          Upload your tracks to start listening and vibingUpload your tracks to start listening and
          vibing
        </h3>
      )}
      {track && (
        <div className="font-medium text-sm text-muted-foreground max-w-60 mx-auto">
          {track.genres.join(", ")}
        </div>
      )}
      {/* <div className="text-sm font-mono">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div> */}
      <div className="my-4 w-full max-w-60 h-3 relative">
        <AudioProgressBar
          duration={duration}
          currentProgress={currrentProgress}
          buffered={buffered}
          onChange={(e) => {
            if (!audioRef.current) return;

            audioRef.current.currentTime = e.currentTarget.valueAsNumber;

            setCurrrentProgress(e.currentTarget.valueAsNumber);
          }}
        />
      </div>
      <div className="flex items-center gap-x-2 mt-2 p-3 rounded-xl bg-background-accent border border-primary">
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
          onTimeUpdate={(e) => {
            setCurrrentProgress(e.currentTarget.currentTime);
            handleBufferProgress(e);
          }}
          onProgress={handleBufferProgress}
        >
          <source src={`${API_BASE_URL}/files/${track.audioFile}`} />
        </audio>
      )}
    </section>
  );
};
