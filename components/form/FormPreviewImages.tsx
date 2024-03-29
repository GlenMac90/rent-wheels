"use client";

import { MouseEvent } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

const FormPreviewImages = ({
  imageUrlStrings,
  handleImageDelete,
}: {
  imageUrlStrings: string[];
  handleImageDelete: (index: number) => (e: MouseEvent) => void;
}) => {
  return (
    <div className="mt-6 flex w-full flex-wrap justify-center gap-4">
      {imageUrlStrings.map((image, index) => (
        <div key={image} className="relative flex">
          <button
            className="absolute right-1 top-1 bg-white/50 text-xl text-slate-600"
            onClick={handleImageDelete(index)}
            type="button"
          >
            <IoClose />
          </button>
          <Image
            src={image}
            alt="car image"
            width={180}
            height={180}
            className="w-full max-w-60 object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export default FormPreviewImages;
