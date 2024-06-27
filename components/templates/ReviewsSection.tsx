import ReviewCard from "../molecules/ReviewCard";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

const ReviewsSection = ({ reviews }: any) => {
  return (
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
  );
};

export default ReviewsSection;
