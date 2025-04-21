import { Loader2 } from "lucide-react";
import { useGenresQuery } from "@/entities/genres";
import { CreateTrackRequest, Track } from "@/entities/track";
import { Button, DialogClose, DialogFooter, TrackForm } from "@/shared/ui";
import { useEditTrackMutation } from "../api/useEditTrackMutation";

interface Props {
  track: Track;
  onSubmitted: () => void;
}

export const EditTrackForm: React.FC<Props> = ({ track, onSubmitted }) => {
  const { genresData = [] } = useGenresQuery();
  const { mutate, isPending } = useEditTrackMutation({ onSubmitted });
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
      values={{
        title: track.title,
        artist: track.artist,
        album: track.album,
        genres: track.genres.map((item) => ({ label: item, value: item })),
        coverImage: track.coverImage,
      }}
      actions={
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="submit" variant="default" disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : "Update"}
          </Button>
        </DialogFooter>
      }
    />
  );
};
