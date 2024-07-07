import Counter from "@/components/molecules/Counter";
import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../../ui/form";

type Props = {
  control: Control<any>;
  name: string;
  label: string;
  maxQuantity: number;
};

const FormCounter = ({ control, name, label, maxQuantity }: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Counter
              quantity={field.value}
              onChangeQuantity={(newQuantity) => field.onChange(newQuantity)}
              maxQuantity={maxQuantity}
              borderRadius="rounded-md"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default FormCounter;
