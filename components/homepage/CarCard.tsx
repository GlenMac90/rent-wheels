"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { TbSteeringWheel } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";

import Button from "../Button";
import CarCardModal from "./CarCardModal";
import { ICar } from "@/lib/models/car.model";
import { toggleLike } from "@/lib/actions/car.actions";

const CarCard = ({
  canEdit = false,
  data,
}: {
  canEdit?: boolean;
  data: ICar;
}) => {
  const path = usePathname();
  const [liked, setLiked] = useState(data.isLikedByCurrentUser);
  const [showModal, setShowModal] = useState(false);
  const {
    id: carId,
    name,
    type,
    imageData,
    fuelCapacity,
    transmission,
    peopleCapacity,
    dailyPrice,
  } = data;

  const { url, blurDataURL, width, height } = imageData[0];

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLikeClick = async () => {
    try {
      const updatedCar = await toggleLike({ carId, path });
      setLiked(updatedCar.likedStatus);
    } catch (error) {
      console.error("Error toggling like status", error);
    }
  };

  return (
    <>
      <div className="bg-white_gray-850 w-full min-w-60 flex-col rounded-ten p-4 md:min-w-80 md:p-6 lg:min-w-full">
        <div className="flex-between w-full">
          <div className="flex flex-col gap-1">
            <span className="bold-16 md:bold-20 text-gray-900_white">
              {name}
            </span>
            <span className="base-12 md:bold-14 text-gray-400">{type}</span>
          </div>
          {canEdit ? (
            <Link href="/cars/123" className="self-start">
              <FaRegEdit className="text-gray-900_white text-xl" />
            </Link>
          ) : (
            <button className="self-start" onClick={handleLikeClick}>
              <Image
                src={
                  liked ? "/icons/liked-heart.svg" : "/icons/unliked-heart.png"
                }
                height={24}
                width={24}
                alt={`Icon showing the liked status of the car which is currently ${liked}`}
                className="shrink-0"
              />
            </button>
          )}
        </div>
        <Image
          src={url}
          blurDataURL={blurDataURL}
          width={width}
          height={height}
          placeholder="blur"
          alt={`Image of ${name}`}
          className="my-4 w-full rounded-lg object-contain md:my-8"
        />
        <div className="flex-between medium-12 md:medium-14 gap-4 text-gray-400">
          <figure className="flex items-center gap-1 md:gap-1.5">
            <Image
              src="/icons/fuel.svg"
              height={14}
              width={14}
              alt={`image display fuel capacity of ${name}: ${fuelCapacity} liters`}
              className="h-3.5 shrink-0 md:size-6"
            />
            {fuelCapacity}L
          </figure>
          <div className="flex items-center gap-1 md:gap-1.5">
            <span className="md:text-2xl">
              <TbSteeringWheel />
            </span>
            {transmission}
          </div>
          <div className="flex items-center gap-1 whitespace-nowrap md:gap-1.5">
            <Image
              src="/icons/capacity.svg"
              height={14}
              width={14}
              alt={`image display fuel capacity of ${name}: ${fuelCapacity} liters`}
              className="h-3.5 shrink-0 md:size-6"
            />
            {peopleCapacity} People
          </div>
        </div>
        <div className="flex-between mt-6 w-full">
          <p className="text-gray-900_white semibold-16 md:semibold-20">
            ${dailyPrice}/
            <span className="semibold-12 md:semibold-14 text-gray-400">
              {" "}
              day
            </span>
          </p>
          {!canEdit && (
            <Button
              height="h-11"
              width="w-[7.25rem]"
              handleClick={() => setShowModal(true)}
            >
              More Info
            </Button>
          )}
        </div>
      </div>
      {showModal && (
        <CarCardModal handleCloseModal={handleCloseModal} data={data} />
      )}
    </>
  );
};

export default CarCard;
