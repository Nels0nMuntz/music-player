import { PropsWithChildren } from "react";
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
import { Loader2 } from "lucide-react";

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
  const { mutate, isPending } = useDeleteTrackMutation({ onSuccess: onDeleted });
  const handleDelete = () => mutate(trackId);
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
          <Button variant="destructive" onClick={handleDelete} className="min-w-24" data-testid="confirm-delete">
            {isPending ? <Loader2 className="animate-spin" /> : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
