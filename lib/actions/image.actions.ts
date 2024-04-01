"use server";

import sharp from "sharp";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const deleteFiles = async (imagePaths: string[]) => {
  try {
    await utapi.deleteFiles(imagePaths);
  } catch (error) {
    console.error("Failed to delete images:", error);
  }
};

export const getBlurData = async (url: string) => {
  const buffer = await fetch(url).then((res) => res.arrayBuffer());
  const { width, height } = await sharp(buffer).metadata();
  const imageBuffer = await sharp(buffer).resize(10, 10).webp().toBuffer();
  const blurDataURL = `data:image/webp;base64,${imageBuffer.toString(
    "base64"
  )}`;

  return { width, height, blurDataURL };
};
