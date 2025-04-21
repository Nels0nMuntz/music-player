import { useState } from "react";
import { Button } from "@/shared/ui";
import { CircleX } from "lucide-react";
import { DeleteFileDialog } from "./DeleteFileDialog";

interface Props {
  trackId: string;
}

export const DeleteFileButton: React.FC<Props> = ({ trackId }) => {
  const [open, setOpen] = useState(false);
  const handleDeleted = () => setOpen(false);
  return (
    <DeleteFileDialog
      trackId={trackId}
      open={open}
      onOpenChange={setOpen}
      onDeleted={handleDeleted}
    >
      <Button size="icon" variant="outline" className="cursor-pointer">
        <CircleX />
      </Button>
    </DeleteFileDialog>
  );
};
