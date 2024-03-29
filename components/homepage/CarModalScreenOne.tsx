"use client";

import { useState } from "react";
import Image from "next/image";

import Button from "../Button";
import Stars from "./Stars";
import { CarModalScreenOneProps } from "@/types/car.index";

const CarModalScreenOne = ({
  data,
  handleClick,
  handleClose,
  handleButtonClick,
}: CarModalScreenOneProps) => {
  const {
    images,
    name,
    description,
    type,
    transmission,
    peopleCapacity,
    fuelCapacity,
    dailyPrice,
  } = data;

  const [activeImage, setActiveImage] = useState(images[0]);

  const reviewCount = 55;
  const rating = 4;

  return (
    <div
      onClick={handleClick}
      className="bg-white_gray-850 relative flex h-fit w-full max-w-[22.5rem] flex-col gap-6 rounded-ten p-4 lg:max-w-5xl lg:flex-row lg:p-8"
    >
      <button
        className="bg-white_gray-850 absolute -top-5 right-2 size-6 lg:hidden"
        onClick={handleClose}
      >
        <Image
          src="/icons/close.svg"
          height={25}
          width={25}
          alt="button to close modal"
          className="shrink-0 dark:grayscale dark:invert"
        />
      </button>
      <div className="flex size-full flex-col gap-6">
        <Image
          src={activeImage}
          height={180}
          width={270}
          priority
          alt="Main image of car"
          className="aspect-video w-full rounded-ten border border-blue-50 bg-white object-cover"
        />
        <div className="flex w-full justify-between gap-5">
          {images.length > 1 &&
            images.map((image: string) => {
              const isActive = activeImage === image;
              return (
                <div key={image} className="flex aspect-video w-full">
                  <Image
                    src={image}
                    height={62}
                    width={67}
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
      <div className="flex w-full flex-col justify-between gap-4">
        <div className="flex w-full justify-between">
          <div className="flex flex-col gap-1.5 lg:gap-2">
            <h2 className="bold-20 lg:bold-32 text-gray-900_white">{name}</h2>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <Stars rating={rating} />
                <span className="medium-12 lg:medium-14 text-gray-700_white-200">
                  {reviewCount} reviews
                </span>
              </div>
            </div>
          </div>
          <button onClick={handleClose} className="hidden self-start lg:flex">
            <Image
              src="/icons/close.svg"
              height={25}
              width={25}
              alt="button to close modal"
              className="shrink-0 dark:grayscale dark:invert"
            />
          </button>
        </div>
        <p className="light-12 lg:light-20 text-gray-700_white-200">
          {description}
        </p>
        <div className="flex-between w-full gap-11">
          <div className="flex w-full flex-col gap-4">
            <div className="flex-between w-full">
              <label className="light-12 lg:light-20 text-gray-400">
                Type Car
              </label>
              <span className="base-12 lg:base-20 text-gray-700_white-200">
                {type}
              </span>
            </div>
            <div className="flex-between w-full">
              <label className="light-12 lg:light-20 text-gray-400">
                Trans.
              </label>
              <span className="base-12 lg:base-20 text-gray-700_white-200">
                {transmission}
              </span>
            </div>
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="flex-between w-full">
              <label className="light-12 lg:light-20 text-gray-400">
                Capacity
              </label>
              <span className="base-12 lg:base-20 text-gray-700_white-200">
                {peopleCapacity} Person
              </span>
            </div>
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
