import { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import MoneyInput from "../MoneyInput";

type Props = {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  description?: string;
};

const FormMoneyInput = ({
  control,
  name,
  label,
  placeholder,
  description,
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <MoneyInput {...field} placeholder={placeholder} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormMoneyInput;
