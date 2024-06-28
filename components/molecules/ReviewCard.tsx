import { FaStar } from "react-icons/fa";
import dayjs from "dayjs";

interface Props {
  restaurantName: string;
  reviewText: string;
  rating: number;
  dateTime: string;
}

const ReviewCard = ({
  restaurantName,
  reviewText,
  rating,
  dateTime,
}: Props) => {
  const parsedDate = dayjs(dateTime);
  const formattedDate = parsedDate.format("DD/MM/YY");
  const formattedTime = parsedDate.format("hh:mm A");

  return (
    <div className="flex max-w-xs flex-col rounded-lg border bg-white p-4 shadow-md">
      <div className="flex">
        {Array.from({ length: rating }).map((_, index) => (
          <FaStar key={index} className="text-xl text-green-500" />
        ))}
      </div>
      <h3 className="mt-2 text-lg font-semibold">{restaurantName}</h3>
      <p className="mt-1 text-sm text-gray-700">{reviewText}</p>
      <p className="mt-2 text-xs text-gray-500">
        {formattedDate} · {formattedTime}
      </p>
    </div>
  );
};

export default ReviewCard;
