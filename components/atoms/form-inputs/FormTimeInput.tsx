import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";

type Props = {
  control: Control<any>;
  name: string;
  placeholder: string;
};

const FormTimeInput = ({ control, name, placeholder }: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              placeholder={placeholder}
              type="time"
              value={field.value || ""}
              onChange={(e) => field.onChange(e.target.value)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormTimeInput;
