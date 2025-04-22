import { CirclePause, CirclePlay } from "lucide-react";
import { Track } from "@/entities/track";
import { Button } from "@/shared/ui";
import { usePlayerActions, useIsPlaying, useTrack } from "@/shared/model";

interface Props {
  track: Track;
}

export const PlayTrackButton: React.FC<Props> = ({ track }) => {
  const currentTrack = useTrack();
  const isPlaying = useIsPlaying();
  const { tooglePlaying } = usePlayerActions();
  return (
    <Button
      size="icon"
      variant="outline"
      className="cursor-pointer"
      onClick={() => tooglePlaying(track)}
    >
      {currentTrack?.id === track.id ? (
        <>
          <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
          {isPlaying ? <CirclePause /> : <CirclePlay />}
        </>
      ) : (
        <>
          <span className="sr-only">Play</span>
          <CirclePlay />
        </>
      )}
    </Button>
  );
};
