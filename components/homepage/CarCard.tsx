import Image from "next/image";
import Link from "next/link";
import { TbSteeringWheel } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";

import { ICar } from "@/lib/models/car.model";
import { LikeButton, MoreInfoButton } from ".";

const CarCard = ({
  canEdit = false,
  data,
}: {
  canEdit?: boolean;
  data: ICar;
}) => {
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

  return (
    <div className="bg-white_gray-850 w-full min-w-60 flex-col rounded-ten p-4 shadow-md md:min-w-80 md:p-6 lg:min-w-full">
      <div className="flex-between w-full">
        {/* Car title and name */}

        <div className="flex flex-col gap-1">
          <span className="bold-16 md:bold-20 text-gray-900_white">{name}</span>
          <span className="base-12 md:bold-14 text-gray-400">{type}</span>
        </div>

        {/* Edit or Like button depending on whether the user owns the car */}

        {canEdit ? (
          <Link href={`/cars/${data.id}`} className="self-start">
            <FaRegEdit className="text-gray-900_white text-xl" />
          </Link>
        ) : (
          <LikeButton likedStatus={data.isLikedByCurrentUser} carId={carId} />
        )}
      </div>

      {/* Car image */}

      <Image
        src={imageData[0]?.url || "/dummy-images/dummy-car-one.png"}
        blurDataURL={imageData[0]?.blurDataURL ?? "/dummy-car-one.png"}
        width={imageData[0]?.width ?? 40}
        height={imageData[0]?.height ?? 80}
        placeholder="blur"
        alt={`Image of ${name}`}
        className="my-4 w-full rounded-lg object-contain md:my-8"
      />

      {/* Car details */}

      <div className="flex-between medium-12 md:medium-14 gap-4 text-gray-400">
        {/* Fuel capacity */}

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

        {/* Transmission type */}

        <div className="flex items-center gap-1 capitalize md:gap-1.5">
          <span className="md:text-2xl">
            <TbSteeringWheel />
          </span>
          {transmission}
        </div>

        {/* People capacity */}

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
        {/* Price */}

        <p className="text-gray-900_white semibold-16 md:semibold-20">
          ${dailyPrice}/
          <span className="semibold-12 md:semibold-14 text-gray-400"> day</span>
        </p>

        {/* Button to begin modal sequence */}

        {!canEdit && <MoreInfoButton data={data} />}
      </div>
    </div>
  );
};

export default CarCard;
