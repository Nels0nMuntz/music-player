import {
  CircleChevronLeft,
  CircleChevronRight,
  CirclePause,
  CirclePlay,
  Loader2,
  Music4,
} from "lucide-react";
import { useAudioPlayerData } from "@/pages/tracks/lib/useAudioPlayerData";
import AudioProgressBar from "./AudioProgressBar";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib";
import { AudioPlayerSkeleton } from "./AudioPlayerSkeleton";
import { API_BASE_URL } from "@/shared/configs";

export const AudioPlayer = () => {
  const {
    isInitialized,
    currentTrack,
    hasPrevious,
    hasNext,
    isReady,
    duration,
    currrentProgress,
    buffered,
    audioRef,
    isPlaying,
    setCurrrentProgress,
    setDuration,
    setIsReady,
    handleBufferProgress,
    playPrev,
    playNext,
    togglePlay,
    setIsPlaying,
    handleError,
  } = useAudioPlayerData();

  if (!isInitialized) {
    return <AudioPlayerSkeleton />;
  }

  return (
    <div
      key={currentTrack?.id}
      className="w-full max-w-2xl mx-auto flex flex-col items-center p-6 rounded-4xl shadow-player border-2 border-primary"
      aria-disabled={isInitialized ? "false" : "true"}
    >
      <div className="my-4">
        {currentTrack?.coverImage ? (
          <img
            src={currentTrack.coverImage}
            width={144}
            height={144}
            className="w-36 h-36 rounded-xl"
          />
        ) : (
          <div className="w-36 h-36 rounded-xl border-primary border-2 flex items-center justify-center shrink-0 bg-gradient-to-br from-[#A678D5] to-[#F6F1FA]">
            <Music4 className="text-primary size-12" />
          </div>
        )}
      </div>
      {currentTrack && (
        <>
          <h3 className="font-medium text-xl text-center max-w-60 mx-auto">{currentTrack.title}</h3>
          <div className="font-medium text-sm text-muted-foreground max-w-60 mx-auto">
            {(currentTrack.genres || []).join(", ")}
          </div>
        </>
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
          disabled={!currentTrack || !hasPrevious}
          className="w-auto h-auto p-0 pr-0 pl-0 cursor-pointer"
        >
          <CircleChevronLeft
            className={cn(["size-8", hasPrevious ? "text-primary" : "text-muted-foreground"])}
          />
        </Button>
        <Button
          variant="link"
          disabled={!isReady}
          onClick={togglePlay}
          className="w-auto h-auto p-0 pr-0 pl-0 cursor-pointer"
        >
          {!isReady && currentTrack ? (
            <Loader2 className="size-12 text-primary animate-spin" />
          ) : isPlaying ? (
            <CirclePause className="size-12 text-primary" />
          ) : (
            <CirclePlay className="size-12 text-primary" />
          )}
        </Button>
        <Button
          variant="link"
          onClick={playNext}
          disabled={!currentTrack || !hasNext}
          className="w-auto h-auto p-0 pr-0 pl-0 cursor-pointer"
        >
          <CircleChevronRight
            className={cn(["size-8", hasNext ? "text-primary" : "text-muted-foreground"])}
          />
        </Button>
      </div>
      {currentTrack && (
        <audio
          ref={audioRef}
          preload="metadata"
          onDurationChange={(e) => setDuration(e.currentTarget.duration)}
          onEnded={playNext}
          onPlaying={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onCanPlay={() => {
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
          <source src={`${API_BASE_URL}/files/${currentTrack.audioFile}`} />
        </audio>
      )}
    </div>
  );
};
