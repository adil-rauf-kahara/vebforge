"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface ReviewCardProps {
  review: {
    quote: string;
    name: string;
    title: string;
    avatar: string;
  };
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const nameParts = review.name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  return (
    <Card className="bg-[#0d0d0d] cursor-pointer transition-all duration-700 border-[#1f1f1f] border-[1px] backdrop-blur-sm w-[380px] flex-shrink-0 hover:shadow-[1px_1px_1px_rgba(112,190,250,0.4)] hover:border hover:border-[#70BEFA]">
      <CardContent className="p-10">
        <div
          className="mb-3 rounded-md p-5"
          style={{
            boxShadow: "inset 0px 0px 1px rgba(192, 192, 192, 0.6)", // Very thin silver shadow
          }}
        >
          <p className="text-gray-400 text-sm">&quot;{review.quote}&quot;</p>
        </div>
        <div
          className="flex items-center gap-3 px-6 py-4 rounded-md"
          style={{
            boxShadow: "inset 0px 0px 1px rgba(192, 192, 192, 0.6)",
          }}
        >
          <Avatar className="h-10 w-10 border border-gray-700">
            <AvatarImage src={review.avatar} alt={review.name} />
            <AvatarFallback className="bg-gray-800 text-gray-400">
              {firstName.charAt(0)}
              {lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">
              <span className="bg-gradient-to-r from-white to-[#70BEFA] bg-clip-text text-transparent">
                {firstName} {lastName}
              </span>
            </p>
            <p className="text-xs text-gray-400">{review.title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
