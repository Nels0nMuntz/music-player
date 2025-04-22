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

  const isCurrent = currentTrack?.id === track.id;

  return (
    <Button
      size="icon"
      variant="outline"
      className="cursor-pointer relative bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${track.coverImage})` }}
      onClick={() => tooglePlaying(track)}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-white">
        <span className="sr-only">{isCurrent ? (isPlaying ? "Pause" : "Play") : "Play"}</span>
        {isCurrent && isPlaying ? <CirclePause /> : <CirclePlay />}
      </div>
    </Button>
  );
};
