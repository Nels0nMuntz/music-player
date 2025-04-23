import { PropsWithChildren } from "react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@/shared/ui";
import { useDeleteTrackMutation } from "../api/useDeleteTrackMutation";
import {
  usePlaylistCurrentTrackIndex,
  usePlaylistTracks,
  usePlaylistActions,
} from "@/shared/model";

interface Props extends PropsWithChildren {
  trackId: string;
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onDeleted: () => void;
}

export const DeleteTrackDialog: React.FC<Props> = ({
  trackId,
  open,
  children,
  onOpenChange,
  onDeleted,
}) => {
  const tracks = usePlaylistTracks();
  const trackIndex = usePlaylistCurrentTrackIndex();
  const { pushTrackToQueue } = usePlaylistActions();
  const { mutate, isPending } = useDeleteTrackMutation({ onSuccess: onDeleted });
  const handleDelete = () => {
    const currentTrack = tracks[trackIndex];
    if (!currentTrack) {
      mutate(trackId);
      return;
    }
    if (currentTrack.id === trackId) {
      const nextTrack = tracks[trackIndex + 1];
      if (nextTrack) {
        pushTrackToQueue(nextTrack);
      }
    } else {
      pushTrackToQueue(currentTrack);
    }
    mutate(trackId);
  };
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent data-testid="confirm-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the track from your library.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" className="bg-white min-w-24" data-testid="cancel-delete">
              Cancel
            </Button>
          </AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="min-w-24"
            data-testid="confirm-delete"
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
