import { useGenresQuery } from "@/shared/api";
import { Button, DialogClose, DialogFooter, TrackForm } from "@/shared/ui";
import { useAddTrackMutation } from "../api/useAddTrackMutation";
import { CreateTrackRequest } from "@/entities/track";
import { Loader2 } from "lucide-react";

interface Props {
  onSubmited: () => void;
}

export const AddTrackForm: React.FC<Props> = ({ onSubmited }) => {
  const { genresData = [] } = useGenresQuery();
  const { mutate, isPending } = useAddTrackMutation({ onSubmited });
  const handleSubmit = (values: CreateTrackRequest) => {
    mutate({
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
      actions={
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="submit" variant="default" disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : "Submit"}
          </Button>
        </DialogFooter>
      }
    />
  );
};
