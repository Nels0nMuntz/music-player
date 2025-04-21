import React, { PropsWithChildren } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui";

interface Props extends PropsWithChildren {
  trigger: React.ReactNode;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

export const AddTrackDialog: React.FC<Props> = ({ trigger, open, children, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a track</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
