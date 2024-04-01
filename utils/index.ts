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

export const formatImageData = (imageData: any) => {
  return imageData.map((image: any) => ({
    url: image.url,
    key: image.key,
    blurDataURL: image.blurDataURL,
    width: image.width,
    height: image.height,
  }));
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
    imageData: formatImageData(data.imageData),
    isLikedByCurrentUser,
  };
};

export async function imageURLToFile({ imageURL }: { imageURL: string }) {
  try {
    const response = await fetch(imageURL);
    if (!response.ok) throw new Error("Network response was not ok.");

    const imageBlob = await response.blob();

    const file = new File([imageBlob], "image.jpg", {
      type: imageBlob.type,
    });

    return file;
  } catch (error) {
    console.error("Error converting image URL to file:", error);
    return null;
  }
}

// carTitle: z
//     .string()
//     .min(1, 'Car title is required')
//     .max(50, 'Car title must be under 50 characters'),
//   carType: z.enum(['Sport', 'SUV', 'Sedan', 'Coupe', 'Hatchback'], {
//     required_error: 'Car type is required',
//   }),
//   rentPrice: z
//     .number({
//       required_error: 'Rent price is required',
//       invalid_type_error: 'Rent price must be a number',
//     })
//     .positive('Rent price must be a positive number')
//     .int('Rent price must be an integer')
//     .min(1, 'Rent price must be at least $1')
//     .max(1000, 'Rent price must be under $1,000'),
//   capacity: z
//     .number({
//       required_error: 'Capacity is required',
//       invalid_type_error: 'Capacity must be a number',
//     })
//     .positive('Capacity must be a positive number')
//     .int('Capacity must be an integer')
//     .min(1, 'Capacity must be at least 1 person')
//     .max(15, 'Capacity must be under 15 persons'),
//   transmission: z.enum(['Automatic', 'Manual'], {
//     required_error: 'Transmission type is required',
//   }),
//   location: z
//     .string()
//     .min(1, 'Location is required')
//     .max(50, 'City name must be under 50 characters'),
//   fuelCapacity: z
//     .number({
//       required_error: 'Fuel capacity is required',
//       invalid_type_error: 'Fuel capacity must be a number',
//     })
//     .positive('Fuel capacity must be a positive number')
//     .int('Fuel capacity must be an integer')
//     .min(1, 'Fuel capacity must be at least 1 liter')
//     .max(120, 'Fuel capacity must be under 120 liters'),
//   description: z
//     .string()
//     .min(20, 'Description must be at least 20 characters')
//     .max(250, 'Description must be under 250 characters'),
// });
