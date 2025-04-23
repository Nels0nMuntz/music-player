import { Loader2 } from "lucide-react";
import { useGenresQuery } from "@/entities/genres";
import { CreateTrackRequest, Track } from "@/entities/track";
import { Button, DialogClose, DialogFooter, TrackForm } from "@/shared/ui";
import { useEditTrackMutation } from "../api/useEditTrackMutation";

interface Props {
  track: Track;
  onUpdated: () => void;
}

export const EditTrackForm: React.FC<Props> = ({ track, onUpdated }) => {
  const { genresData = [] } = useGenresQuery();
  const { mutate, isPending } = useEditTrackMutation({ onSuccess: onUpdated });
  const handleSubmit = (values: CreateTrackRequest) => {
    mutate({
      id: track.id,
      title: values.title.trim(),
      artist: values.artist.trim(),
      album: values.album?.trim(),
      coverImage: values.coverImage?.trim(),
      genres: values.genres,
    });
  };
  return (
    <TrackForm
      onSubmit={handleSubmit}
      genres={genresData}
      isSubmitting={isPending}
      values={{
        title: track.title,
        artist: track.artist,
        album: track.album,
        genres: track.genres.map((item) => ({ label: item, value: item })),
        coverImage: track.coverImage,
      }}
    />
  );
};
