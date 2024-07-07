import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import GoogleAddressInput from "../GoogleAddressInput";

type Props = {
  control: Control<any>;
  name: string;
  label: string;
};

const FormGoogleAddressInput = ({ control, name, label }: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <GoogleAddressInput {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormGoogleAddressInput;
