import { CirclePlus } from "lucide-react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui";
import { AddTrackForm } from "./AddTrackForm";
import { useState } from "react";

export const AddTrackButton = () => {
  const [open, setOpen] = useState(false);
  const handleSubmitted = () => setOpen(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-x-2 cursor-pointer">
          <CirclePlus />
          <span>Add a track</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a track</DialogTitle>
        </DialogHeader>
        <AddTrackForm onSubmited={handleSubmitted} />
      </DialogContent>
    </Dialog>
  );
};
