"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageDataArrayType } from "@/types/car.index";

const ImageGallery = ({ imageData }: { imageData: ImageDataArrayType[] }) => {
  const [activeImage, setActiveImage] = useState(imageData[0]);

  return (
    <div className="flex size-full flex-col gap-6">
      <Image
        src={activeImage.url}
        blurDataURL={activeImage.blurDataURL}
        height={180}
        width={270}
        placeholder="blur"
        priority
        alt="Main image of car"
        className="aspect-video w-full rounded-ten border border-blue-50 bg-white object-cover"
      />
      <div className="flex w-full justify-between gap-5">
        {/* Secondary Images */}

        {imageData.length > 1 &&
          imageData.map((image: any) => {
            const isActive = activeImage === image;
            const { url, blurDataURL, width, height } = image;
            return (
              <div key={url} className="flex aspect-video w-full">
                <Image
                  src={url}
                  height={width}
                  blurDataURL={blurDataURL}
                  width={height}
                  placeholder="blur"
                  priority
                  alt="Image picture"
                  className={`flex w-full cursor-pointer rounded-ten object-cover ${isActive && "border border-blue-500 p-0.5"}`}
                  onClick={() => setActiveImage(image)}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ImageGallery;
