import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./tailwind/form";
import { Input } from "./tailwind/input";

interface Props {
  control: Control<any>;
  name: string;
  label: string;
  inputTestId?: string;
  errorTextTestId?: string;
}

export const TextField: React.FC<Props> = ({ control, name, label, inputTestId, errorTextTestId }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input className="border-primary focus-visible:ring-primary" data-testid={inputTestId} {...field} />
          </FormControl>
          <FormMessage data-testid={errorTextTestId}/>
        </FormItem>
      )}
    />
  );
};
