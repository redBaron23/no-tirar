import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../../ui/form";
import AtomicSelect from "../AtomicSelect";

type Option = {
  key: string;
  value: string;
};

type Props = {
  control: Control<any>;
  name: string;
  label: string;
  options: Option[];
  placeholder: string;
  disabled?: boolean;
};

const FormSelect = ({
  control,
  name,
  label,
  options,
  placeholder,
  disabled = false,
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <AtomicSelect
              options={options}
              disabled={disabled}
              onValueChange={field.onChange}
              value={field.value}
              placeholder={placeholder}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default FormSelect;
