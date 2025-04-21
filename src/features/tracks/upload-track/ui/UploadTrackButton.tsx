import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/shared/ui";
import { UploadTrackDialog } from "./UploadTrackDialog";

interface Props {
  trackId: string;
}

export const UploadTrackButton: React.FC<Props> = ({ trackId }) => {
  const [open, setOpen] = useState(false);
  return (
    <UploadTrackDialog trackId={trackId} open={open} onOpenChange={setOpen}>
      <Button size="icon" variant="outline" className="cursor-pointer">
        <span className="sr-only">Upload an audio file</span>
        <Upload />
      </Button>
    </UploadTrackDialog>
  );
};
