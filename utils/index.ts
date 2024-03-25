import queryString from "query-string";

import { SearchProps } from "@/types/searchpage.index";

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
