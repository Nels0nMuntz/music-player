import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/shared/ui";
import { DeleteTrackDialog } from "./DeleteTrackDialog";

interface Props {
  trackId: string;
  onCloseDialog: () => void;
}

export const DeleteTrackButton: React.FC<Props> = ({trackId, onCloseDialog}) => {
  const [open, setOpen] = useState(false);
  const handleDeleted = () => {
    setOpen(false);
    onCloseDialog();
  };
  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (value === false) onCloseDialog();
  };
  return (
    <DeleteTrackDialog trackId={trackId} open={open} onOpenChange={handleOpenChange} onDeleted={handleDeleted}>
      <Button variant="ghost" className="w-full flex items-center gap-x-4">
        <Trash2 className="shrink-0 text-destructive" />
        <span className="grow text-left text-destructive">Delete</span>
      </Button>
    </DeleteTrackDialog>
  );
};
