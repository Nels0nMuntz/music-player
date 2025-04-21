import React, { PropsWithChildren } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui";

interface Props extends PropsWithChildren {
  title: string;
  trigger: React.ReactNode;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

export const EditTrackDialog: React.FC<Props> = ({ title, trigger, open, children, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
