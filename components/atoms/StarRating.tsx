import React from "react";
import { FaStar } from "react-icons/fa";

interface Props {
  stars: number;
  reviews: number;
}

const StarRating = ({ stars, reviews }: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <FaStar className="text-yellow-500" />
      <span>{stars}</span>
      <span>({reviews})</span>
    </div>
  );
};

export default StarRating;
