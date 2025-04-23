import { CirclePlus } from "lucide-react";
import { Button } from "@/shared/ui";
import { AddTrackForm } from "./AddTrackForm";
import { useState } from "react";
import { AddTrackDialog } from "./AddTrackDialog";

export const AddTrackButton = () => {
  const [open, setOpen] = useState(false);
  const handleSubmitted = () => setOpen(false);
  return (
    <AddTrackDialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button className="flex items-center gap-x-2 cursor-pointer xs:w-auto w-full" data-testid="create-track-button">
          <CirclePlus />
          <span>Add a track</span>
        </Button>
      }
    >
      <AddTrackForm onSubmitted={handleSubmitted} />
    </AddTrackDialog>
  );
};
