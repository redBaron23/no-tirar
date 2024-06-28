import { FiChevronRight } from "react-icons/fi";
import AverageRatingCard from "../molecules/AverageRatingCard";
import ReviewCard from "../molecules/ReviewCard";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

const ReviewsSection = ({ reviews }: any) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Evaluacion
        </h2>
        <span className="flex cursor-pointer items-center text-gray-500 hover:underline">
          Más <FiChevronRight className="ml-1" />
        </span>
      </div>
      <AverageRatingCard score={4.8} />
      <Carousel>
        <CarouselContent>
          {reviews &&
            reviews.map((review: any, index: number) => (
              <CarouselItem key={index}>
                <ReviewCard {...review} />
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ReviewsSection;
