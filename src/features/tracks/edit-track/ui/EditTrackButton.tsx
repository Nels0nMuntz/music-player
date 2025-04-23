import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/shared/ui";
import { Track } from "@/entities/track";
import { EditTrackDialog } from "./EditTrackDialog";
import { EditTrackForm } from "./EditTrackForm";
import { forwardRef } from "react";

interface Props {
  track: Track;
  onCloseDialog: () => void;
}

export const EditTrackButton = forwardRef<HTMLButtonElement, Props>(({ track, onCloseDialog }, ref) => {
  const [open, setOpen] = useState(false);
  const handleSubmitted = () => {
    setOpen(false);
    onCloseDialog();
  };
  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (value === false) onCloseDialog();
  };
  return (
    <EditTrackDialog
      open={open}
      onOpenChange={handleOpenChange}
      title={track.title}
      trigger={
        <Button
          ref={ref}
          variant="ghost"
          className="w-full flex items-center gap-x-4"
          data-testid={`edit-track-${track.id}`}
        >
          <Pencil className="shrink-0" />
          <span className="grow text-left">Edit</span>
        </Button>
      }
    >
      <EditTrackForm track={track} onUpdated={handleSubmitted} />
    </EditTrackDialog>
  );
});
