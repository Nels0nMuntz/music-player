import React, { useState } from "react";
import { FilterSelectForm } from "./FilterSelectForm";
import { FilterInputForm } from "./FilterInputForm";
import { FilterFormValues } from "../model/types/filterFormValues";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@/shared/ui";
import { ListFilter, ListFilterPlus } from "lucide-react";

interface Props {
  testId?: string;
  title: string;
  filter: string;
  options?: string[];
  onChange: (value: string) => void;
}

export const TasksFilter: React.FC<Props> = ({ testId, title, filter, options, onChange }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleReset = () => {
    onChange("");
    setOpen(false);
  };
  const handleApply = (values: FilterFormValues) => {
    onChange(values.value);
    setOpen(false);
  };
  const isSelect = !!options?.length;
  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="cursor-pointer" onClick={handleOpen} data-testid={testId}>
          {filter ? (
            <ListFilter size={16} className="text-foreground" />
          ) : (
            <ListFilterPlus size={16} className="text-muted-foreground" />
          )}
          <span className="sr-only">{title}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60">
        <div className="space-y-2">
          <h4 className="font-medium leading-none text-sm">{title}</h4>
          {isSelect ? (
            <FilterSelectForm
              filter={filter}
              options={options}
              onReset={handleReset}
              onSubmit={handleApply}
            />
          ) : (
            <FilterInputForm filter={filter} onReset={handleReset} onSubmit={handleApply} />
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
