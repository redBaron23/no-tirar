import React from "react";
import { FaStar } from "react-icons/fa";

interface Props {
  stars?: number;
  reviews?: number;
}

const StarRating = ({ stars, reviews }: Props) => {
  if (!stars) {
    return null;
  }

  return (
    <div className="flex items-center space-x-1 text-base">
      <FaStar className="text-green-700" />
      <div>{stars}</div>
      <span>({reviews})</span>
    </div>
  );
};

export default StarRating;
