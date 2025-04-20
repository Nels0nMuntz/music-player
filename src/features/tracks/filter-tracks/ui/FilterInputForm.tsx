import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { filterFormSchema } from "../model/schemas/filterFormSchema";
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input } from "@/shared/ui";
import { FilterFormValues } from "../model/types/filterFormValues";

interface Props {
  filter: string;
  onSubmit: (values: FilterFormValues) => void;
  onReset: () => void;
}

export const FilterInputForm: React.FC<Props> = ({ filter, onSubmit, onReset }) => {
  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterFormSchema),
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
                <Input
                  className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                  {...field}
                />
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
