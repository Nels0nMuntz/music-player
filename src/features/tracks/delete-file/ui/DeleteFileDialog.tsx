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
import { Loader2 } from "lucide-react";
import { useDeleteFileMutation } from "../api/useDeleteFileMutation";

interface Props extends PropsWithChildren {
  trackId: string;
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onDeleted: () => void;
}

export const DeleteFileDialog: React.FC<Props> = ({
  trackId,
  open,
  children,
  onOpenChange,
  onDeleted,
}) => {
  const { mutate, isPending } = useDeleteFileMutation({ onSuccess: onDeleted });
  const handleDelete = () => mutate(trackId);
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the audio file.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" className="bg-white min-w-24 cursor-pointer">
              Cancel
            </Button>
          </AlertDialogCancel>
          <Button variant="destructive" onClick={handleDelete} className="min-w-24 cursor-pointer">
            {isPending ? <Loader2 className="animate-spin" /> : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
