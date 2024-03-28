import queryString from "query-string";

import { SearchProps } from "@/types/searchpage.index";
import { ICar } from "@/lib/models/car.model";

export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed, add 1
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export function modifySearchParams(
  params: string,
  change: Partial<SearchProps>
) {
  const parsedParams = queryString.parse(params);

  Object.assign(parsedParams, change);
  return queryString.stringify(parsedParams, {
    skipEmptyString: true,
  });
}

export function formatUrlDate(date: string) {
  const dateParts = date.split("/");
  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1;
  const year = parseInt(dateParts[2], 10);
  const newDate = new Date(year, month, day);
  return newDate;
}

export type CarType = "sedan" | "suv" | "coupe" | "mpv" | "hatchback" | "sport";

const typesKeyArray: Record<CarType, string> = {
  sedan: "Sedan",
  suv: "SUV",
  coupe: "Coupe",
  mpv: "MPV",
  hatchback: "Hatchback",
  sport: "Sport",
};

export const formatTypes = (queryString: string | undefined) => {
  if (queryString === undefined) {
    return ["Sport", "Sedan", "SUV", "Coupe", "MPV", "Hatchback"];
  } else {
    const typeArray = queryString
      ?.split(",")
      .filter((type) => type.trim() !== "" && type in typesKeyArray);

    return typeArray.map((type) => {
      const key = type as CarType;
      return typesKeyArray[key];
    });
  }
};

export const formatCapacity = (queryString: string | undefined) => {
  if (queryString === undefined) {
    return [2, 4, 6, 8];
  } else {
    return queryString
      ?.split(",")
      .map((capacity) => parseInt(capacity, 10))
      .filter((capacity) => !isNaN(capacity));
  }
};

export const formatCarData = ({
  data,
  userId,
}: {
  data: any;
  userId: string | undefined;
}): ICar => {
  const isLikedByCurrentUser = data.likedBy.includes(userId);
  // @ts-ignore
  return {
    id: data._id.toString(),
    owner: data.owner.toString(),
    name: data.name,
    type: data.type,
    description: data.description,
    transmission: data.transmission,
    fuelCapacity: data.fuelCapacity,
    peopleCapacity: data.peopleCapacity,
    dailyPrice: data.dailyPrice,
    images: data.images,
    isLikedByCurrentUser,
  };
};
