import { Loader2 } from "lucide-react";
import { useGenresQuery } from "@/entities/genres";
import { CreateTrackRequest } from "@/entities/track";
import { Button, DialogClose, DialogFooter, TrackForm } from "@/shared/ui";
import { useAddTrackMutation } from "../api/useAddTrackMutation";

interface Props {
  onSubmitted: () => void;
}

export const AddTrackForm: React.FC<Props> = ({ onSubmitted }) => {
  const { genresData = [] } = useGenresQuery();
  const { mutate, isPending } = useAddTrackMutation({ onSuccess: onSubmitted });
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
      isSubmitting={isPending}
      // actions={
      //   <DialogFooter className="sm:justify-end">
      //     <DialogClose asChild>
      //       <Button type="button" variant="secondary" className="min-w-24">
      //         Close
      //       </Button>
      //     </DialogClose>
      //     <Button type="submit" variant="default" disabled={isPending} className="min-w-24">
      //       {isPending ? <Loader2 className="animate-spin" /> : "Create"}
      //     </Button>
      //   </DialogFooter>
      // }
    />
  );
};
