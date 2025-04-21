import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/shared/ui";
import { Track } from "@/entities/track";
import { EditTrackDialog } from "./EditTrackDialog";
import { EditTrackForm } from "./EditTrackForm";

interface Props {
  track: Track;
  onCloseDialog: () => void;
}

export const EditTrackButton: React.FC<Props> = ({ track, onCloseDialog }) => {
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
        <Button variant="ghost" className="w-full flex items-center gap-x-2">
          <Pencil className="shrink-0" />
          <span className="grow text-center">Edit</span>
        </Button>
      }
    >
      <EditTrackForm track={track} onSubmitted={handleSubmitted} />
    </EditTrackDialog>
  );
};
