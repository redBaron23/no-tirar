import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import GoogleAddressInput from "../GoogleAddressInput";

type Props = {
  control: any;
  addressName: string;
  label: string;
  onLatitudeChange: (lat: number, lng: number) => void;
};

const FormGoogleAddressInput = ({
  control,
  addressName,
  label,
  onLatitudeChange,
}: Props) => {
  return (
    <>
      <FormField
        control={control}
        name={addressName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <GoogleAddressInput
                value={field.value}
                onChange={(value, lat, lng) => {
                  field.onChange(value);
                  if (lat !== undefined && lng !== undefined) {
                    onLatitudeChange(lat, lng);
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default FormGoogleAddressInput;
