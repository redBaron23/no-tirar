import { FaStar } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";

interface Props {
  score: number;
}

const AverageRatingCard = ({ score }: Props) => {
  return (
    <div className="flex flex-col gap-2 rounded-lg border bg-white p-4 shadow-md">
      <div className="w-100 flex items-center justify-between">
        <div className="flex items-center">
          <FaStar className="text-xl text-green-500" />
          <span className="ml-2 text-xl font-semibold">{score}</span>
        </div>
        <IoMdInformationCircleOutline className="text-xl text-gray-500" />
      </div>
      <p className="text-sm text-gray-500">Puntaje promedio</p>
    </div>
  );
};

export default AverageRatingCard;
