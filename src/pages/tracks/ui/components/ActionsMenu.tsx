import { PropsWithChildren, useState } from "react";
import { DeleteTrackButton, EditTrackButton } from "@/features/tracks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui";
import { Track } from "@/entities/track";

interface Props extends PropsWithChildren {
  track: Track;
}

export const ActionsMenu: React.FC<Props> = ({ track, children }) => {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <EditTrackButton track={track} onCloseDialog={closeMenu} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <DeleteTrackButton trackId={track.id} onCloseDialog={closeMenu} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
