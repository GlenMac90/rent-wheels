"use client";

import { useState } from "react";
import Image from "next/image";
import { DialogClose } from "@/components/ui/dialog";

import Button from "../Button";
import Stars from "./Stars";
import { CarModalScreenOneProps } from "@/types/car.index";

const CarModalScreenOne = ({
  data,
  handleClose,
  handleButtonClick,
}: CarModalScreenOneProps) => {
  const {
    imageData,
    name,
    description,
    type,
    transmission,
    peopleCapacity,
    fuelCapacity,
    dailyPrice,
  } = data;

  const [activeImage, setActiveImage] = useState(imageData[0]);

  const reviewCount = 55;
  const rating = 4;

  return (
    <div className="bg-white_gray-850 relative flex h-fit w-full max-w-[22.5rem] flex-col gap-6 rounded-ten p-4 lg:max-w-5xl lg:flex-row lg:p-8">
      {/* Close button for mobile screens */}

      <DialogClose className="bg-white_gray-850 absolute -top-5 right-2 size-6 lg:hidden">
        <button onClick={handleClose}>
          <Image
            src="/icons/close.svg"
            height={25}
            width={25}
            alt="button to close modal"
            className="shrink-0 dark:grayscale dark:invert"
          />
        </button>
      </DialogClose>

      {/* Image Gallery */}

      {/* Main Image */}

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

      {/* Car Details */}

      <div className="flex w-full flex-col justify-between gap-4">
        <div className="flex w-full justify-between">
          <div className="flex flex-col gap-1.5 lg:gap-2">
            <h2 className="bold-20 lg:bold-32 text-gray-900_white">{name}</h2>

            {/* Star Rating and number of reviews */}

            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <Stars rating={rating} />
                <span className="medium-12 lg:medium-14 text-gray-700_white-200">
                  {reviewCount} reviews
                </span>
              </div>
            </div>
          </div>

          {/* Close button for desktop screens */}

          <DialogClose className="hidden self-start lg:flex">
            <button onClick={handleClose}>
              <Image
                src="/icons/close.svg"
                height={25}
                width={25}
                alt="button to close modal"
                className="shrink-0 dark:grayscale dark:invert"
              />
            </button>
          </DialogClose>
        </div>

        {/* Description */}

        <p className="light-12 lg:light-20 text-gray-700_white-200">
          {description}
        </p>

        {/* Car Details */}

        <div className="flex-between w-full gap-11">
          <div className="flex w-full flex-col gap-4">
            {/* Car Type */}

            <div className="flex-between w-full">
              <label className="light-12 lg:light-20 text-gray-400">
                Type Car
              </label>
              <span className="base-12 lg:base-20 text-gray-700_white-200">
                {type}
              </span>
            </div>

            {/* Transmission */}

            <div className="flex-between w-full">
              <label className="light-12 lg:light-20 text-gray-400">
                Trans.
              </label>
              <span className="base-12 lg:base-20 text-gray-700_white-200 capitalize">
                {transmission}
              </span>
            </div>
          </div>
          <div className="flex w-full flex-col gap-4">
            {/* People Capacity */}

            <div className="flex-between w-full">
              <label className="light-12 lg:light-20 text-gray-400">
                Capacity
              </label>
              <span className="base-12 lg:base-20 text-gray-700_white-200">
                {peopleCapacity} Person
              </span>
            </div>

            {/* Fuel Capacity */}

            <div className="flex-between w-full">
              <label className="light-12 lg:light-20 text-gray-400">
                Gasoline
              </label>
              <span className="base-12 lg:base-20 text-gray-700_white-200">
                {fuelCapacity}L
              </span>
            </div>
          </div>
        </div>

        {/* Price */}

        <div className="flex-between w-full">
          <p className="bold-20 lg:bold-28 text-gray-900_white">
            ${dailyPrice}/{" "}
            <span className="semibold-12 lg:semibold-16 text-gray-400">
              day
            </span>
          </p>
          <Button
            height="h-[3rem]"
            width="w-[8rem]"
            handleClick={handleButtonClick}
          >
            Rent Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarModalScreenOne;
