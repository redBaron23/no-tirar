import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { PhoneInput } from "../../ui/phone-input";

type Props = {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
};

const FormPhoneInput = ({ control, name, label, placeholder }: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <PhoneInput
              placeholder={placeholder}
              defaultCountry="AR"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormPhoneInput;
