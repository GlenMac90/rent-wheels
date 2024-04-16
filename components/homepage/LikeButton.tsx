"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { toggleLike } from "@/lib/actions/car.actions";

const LikeButton = ({
  likedStatus,
  carId,
}: {
  likedStatus: boolean | undefined;
  carId: string;
}) => {
  const [liked, setLiked] = useState(likedStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const path = usePathname();

  const handleLikeClick = async () => {
    try {
      if (isSubmitting) return;
      setIsSubmitting(true);
      const updatedCar = await toggleLike({ carId, path });
      setLiked(updatedCar.likedStatus);
    } catch (error) {
      console.error("Error toggling like status", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <button
      className="self-start"
      onClick={handleLikeClick}
      disabled={isSubmitting}
    >
      <Image
        src={liked ? "/icons/liked-heart.svg" : "/icons/unliked-heart.png"}
        height={24}
        width={24}
        alt={`Icon showing the liked status of the car which is currently ${liked}`}
        className="shrink-0"
      />
    </button>
  );
};

export default LikeButton;
