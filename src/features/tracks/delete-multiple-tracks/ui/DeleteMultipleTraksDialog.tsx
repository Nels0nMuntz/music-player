import { PropsWithChildren } from "react";
import { Loader2 } from "lucide-react";
import { useSelections } from "@/shared/model";
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
import { useDeleteMultipleTracksMutation } from "../api/useDeleteMultipleTracksMutation";

interface Props extends PropsWithChildren {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onDeleted: () => void;
}

export const DeleteMultipleTracksDialog: React.FC<Props> = ({
  open,
  children,
  onOpenChange,
  onDeleted,
}) => {
  const selection = useSelections();
  const trackIds = Object.keys(selection);
  const { mutate, isPending } = useDeleteMultipleTracksMutation({ onSuccess: onDeleted });
  const handleDelete = () => mutate(trackIds);
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the selected tracks from your
            library.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" className="bg-white min-w-24">
              Cancel
            </Button>
          </AlertDialogCancel>
          <Button variant="destructive" onClick={handleDelete} className="min-w-24">
            {isPending ? <Loader2 className="animate-spin" /> : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
