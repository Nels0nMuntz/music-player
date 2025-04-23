import { CirclePause, CirclePlay } from "lucide-react";
import { Track } from "@/entities/track";
import { Button } from "@/shared/ui";
import {
  usePlaylistActions,
  usePlaylistCurrentTrackIndex,
  usePlaylistTracks,
  usePlaylistIsPlaying,
  usePlaylistAudioControl,
} from "@/shared/model";

interface Props {
  track: Track;
}

export const PlayTrackButton: React.FC<Props> = ({ track }) => {
  const tracks = usePlaylistTracks();
  const isPlaying = usePlaylistIsPlaying();
  const currentTrackIndex = usePlaylistCurrentTrackIndex();
  const audioControl = usePlaylistAudioControl();
  const { setCurrentTrackIndex } = usePlaylistActions();

  const isCurrentTrack = currentTrackIndex >= 0 ? tracks[currentTrackIndex].id === track.id : false;

  const handleClick = () => {
    if (!isCurrentTrack) {
      const trackIndex = tracks.length ? tracks.findIndex((item) => item.id === track.id) : -1;
      setCurrentTrackIndex(trackIndex);
    } else if (isPlaying) {
      audioControl?.pause();
    } else {
      audioControl?.play();
    }
  };

  return (
    <Button
      size="icon"
      variant="outline"
      className="cursor-pointer relative bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${track.coverImage})` }}
      onClick={handleClick}
      data-testid={`play-button-${track.id}`}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-white">
        <span className="sr-only">{isCurrentTrack ? (isPlaying ? "Pause" : "Play") : "Play"}</span>
        {isCurrentTrack && isPlaying ? <CirclePause /> : <CirclePlay />}
      </div>
    </Button>
  );
};
