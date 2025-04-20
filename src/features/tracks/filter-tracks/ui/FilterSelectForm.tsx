import { useForm } from "react-hook-form";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { FilterFormValues } from "../model/types/filterFormValues";

interface Props {
  filter: string;
  options: string[];
  onSubmit: (values: FilterFormValues) => void;
  onReset: () => void;
}

export const FilterSelectForm: React.FC<Props> = ({ filter, options, onSubmit, onReset }) => {
  const form = useForm<FilterFormValues>({
    defaultValues: {
      value: filter,
    },
  });
  const hadleReset = () => {
    form.setValue("value", "");
    onReset();
  };

  const currentValue = form.watch("value");
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem value={option} key={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" disabled={!filter} type="button" onClick={hadleReset}>
            Reset
          </Button>
          <Button variant="default" disabled={!currentValue} type="submit">
            Apply
          </Button>
        </div>
      </form>
    </Form>
  );
};
