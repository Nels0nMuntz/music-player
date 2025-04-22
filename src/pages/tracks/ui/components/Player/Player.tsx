import { useEffect, useRef } from "react";
import { CircleChevronLeft, CircleChevronRight, CirclePause, CirclePlay } from "lucide-react";
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
  const { setNextTrack, setPrevTrack } = usePlayerData();
  const track = useTrack();
  const list = useList();
  const isPlaying = useIsPlaying();
  const direction = useDirection();
  const trackIndex = useTrackIndex();
  const hasNextPage = useHasNext();
  const hasPreviousPage = useHasPrevious();
  const isInitialized = useIsInitialized();
  const canStartPlaying = useCanStartPlaying();
  const { setDuration, setCurrentTime, setIsPlaying, setCanStartPlaying } = usePlayerActions();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playPromise = useRef<Promise<void> | undefined>(undefined);

  const canPlayPrevTrack = trackIndex > 0 || hasPreviousPage;
  const canPlayNextTrack = trackIndex < list.length - 1 || hasNextPage;

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
      // audio.pause();
      if (playPromise.current !== undefined) {
        playPromise.current
          .then(() => {
            audio.pause();
          })
          .catch((error) => {
            console.error("Error playing audio:", error);
          });
      }
    } else {
      // audio.play();
      if (playPromise.current === undefined) {
        playPromise.current = audio.play();
      } else {
        playPromise.current
          .then(() => {
            audio.play();
          })
          .catch((error) => {
            console.error("Error playing audio:", error);
          });
      }
    }
    setIsPlaying(!isPlaying);
    setCanStartPlaying(true);
  };

  // const play = () => {
  //   const audio = audioRef.current;
  //   if (!audio) return;
  //   playPromise.current = audio.play();
  // };

  // const pause = () => {
  //   const audio = audioRef.current;
  //   if (!audio) return;
  //   if (playPromise.current !== undefined) {
  //     playPromise.current
  //       .then(() => {
  //         audio.pause();
  //       })
  //       .catch((error) => {
  //         console.error("Error pausing audio:", error);
  //       });
  //   }
  // };

  const playNext = () => {
    if (canPlayNextTrack) {
      setNextTrack();
      setCanStartPlaying(true);
    }
    setIsPlaying(false);
  };

  const playPrev = () => {
    if (canPlayPrevTrack) {
      setPrevTrack();
      setCanStartPlaying(true);
    }
    setIsPlaying(false);
  };

  const handleError = () => {
    if (direction === "next") {
      playNext();
    } else {
      playPrev();
    }
  };

  // useEffect(() => {
  //   if (canStartPlaying) {
  //     audioRef.current?.play();
  //     setIsPlaying(true);
  //   }
  // }, [track, canStartPlaying]);

  useEffect(() => {
    if (!canStartPlaying) return;
    if (track && audioRef.current) {
      audioRef.current.setAttribute("src", `${API_BASE_URL}/files/${track.audioFile}`);
      audioRef.current.load();
      if (playPromise.current === undefined) {
        playPromise.current = audioRef.current.play();
        setIsPlaying(true);
      } else {
        playPromise.current
          .then(() => {
            audioRef.current?.play();
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Error playing audio:", error);
            setIsPlaying(false);
          });
      }
      audioRef.current.addEventListener("ended", playNext);
    }
  }, [track, canStartPlaying]);

  // useEffect(() => {
  //   if (isPlaying) {
  //     play();
  //   } else {
  //     pause();
  //   }
  // }, [isPlaying]);

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
          disabled={!canPlayNextTrack}
          className="w-auto h-auto p-0 pr-0 pl-0 cursor-pointer"
        >
          <CircleChevronRight
            className={cn(["size-8", canPlayNextTrack ? "text-primary" : "text-muted-foreground"])}
          />
        </Button>
      </div>
      <audio
        ref={audioRef}
        // src={`${API_BASE_URL}/files/${track.audioFile}`}
        onError={handleError}
      />
    </section>
  );
};
