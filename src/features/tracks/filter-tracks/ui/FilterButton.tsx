import { ListFilter, ListFilterPlus } from "lucide-react";
import { Button } from "@/shared/ui";

interface Props {
  label: string;
  filter: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const FilterButton: React.FC<Props> = ({ label, filter, onClick }) => {
  return (
    <Button variant="ghost" className="cursor-pointer" onClick={onClick}>
      {filter ? (
        <ListFilter size={16} className="text-foreground" />
      ) : (
        <ListFilterPlus size={16} className="text-muted-foreground" />
      )}
      <span className="sr-only">{label}</span>
    </Button>
  );
};
