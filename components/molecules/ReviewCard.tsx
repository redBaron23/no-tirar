"use client";

import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { StarIcon } from "lucide-react";

interface Props {
  name: string;
  rating: string;
  review: string;
}

const ReviewCard = ({ name, rating, review }: Props) => (
  <Card className="mx-auto w-full max-w-sm">
    <CardHeader className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar className="h-10 w-10 border">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-medium">{name}</h3>
          <p className="text-muted-foreground text-sm">Verified Customer</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <StarIcon className="h-5 w-5 fill-yellow-500" />
        <span className="text-lg font-medium">{rating}</span>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{review}</p>
    </CardContent>
  </Card>
);

export default ReviewCard;
