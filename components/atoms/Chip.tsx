type Props = {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
};

const Chip = ({ label, isSelected, onClick }: Props) => {
  return (
    <div>
      <span
        onClick={onClick}
        className={`cursor-pointer rounded-full border px-4 py-2 text-center ${
          isSelected
            ? "border-green-500 bg-green-100 text-green-800"
            : "border-gray-400 bg-gray-100 text-gray-800"
        }`}
      >
        {label}
      </span>
    </div>
  );
};

export default Chip;
