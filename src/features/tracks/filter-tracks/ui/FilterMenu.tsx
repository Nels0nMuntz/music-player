import { PropsWithChildren } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui";

interface Props extends PropsWithChildren {
  open: boolean;
  trigger: React.ReactNode;
  onOpenChange: (value: boolean) => void;
}

export const FilterMenu: React.FC<Props> = ({ trigger, open, children, onOpenChange }) => {
  return (
    <Popover open={open} onOpenChange={onOpenChange} >
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent className="w-60">{children}</PopoverContent>
    </Popover>
  );
};
