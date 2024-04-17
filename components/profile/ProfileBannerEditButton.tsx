"use client";

import {
  useState,
  MouseEvent,
  useCallback,
  useRef,
  useEffect,
  DragEvent,
} from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import CloseButton from "../CloseButton";
import { useUploadThing } from "@/utils/uploadthing";
import { updateUser } from "@/lib/actions/user.actions";
import Button from "../Button";
import { useToast } from "@/components/ui/use-toast";
import { deleteFiles, getBlurData } from "@/lib/actions/image.actions";
import { ImageDataArrayType } from "@/types/car.index";

const ProfileBannerEditButton = ({
  bannerImage,
}: {
  bannerImage: ImageDataArrayType;
}) => {
  const { toast } = useToast();
  const [isRendered, setIsRendered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [image, setImage] = useState<string | null>(bannerImage.url);
  const [file, setFile] = useState<File | null>(null);
  const { startUpload } = useUploadThing("media");

  // Function to handle the file drop

  const onDrop = useCallback((acceptedFiles: any) => {
    if (isUploading) return;
    setFile(acceptedFiles[0]);
    const imageURL = URL.createObjectURL(acceptedFiles[0]);
    setImage(imageURL);
  }, []);

  // Submit Handler

  const handleSubmit = async () => {
    // Check if the image has changed
    const hasImageChanged = image !== bannerImage.url;
    // If the image has not changed or there is no file, return
    if (!hasImageChanged || !file) return;

    try {
      setIsUploading(true);
      // Delete the previous images for uploadthing
      await deleteFiles([bannerImage.key]);
      // Start uploading the new image
      const imgRes = await startUpload([file]);
      // If there is no image, return
      if (!imgRes || !imgRes[0].url) return;
      // Get the blur data
      const { blurDataURL, width, height } = await getBlurData(imgRes[0].url);

      // Create the image data
      const imageData = {
        url: imgRes[0].url,
        key: imgRes[0].key,
        blurDataURL,
        width,
        height,
      };

      // Update the user
      await updateUser({
        userData: {
          bannerImage: imageData,
        },
      });
    } catch (error) {
      // If there is an error, show a toast
      toast({
        variant: "destructive",
        title: "Failed to update profile",
        description: "Please try again later",
      });
    } finally {
      // Reset the state
      setShowEditModal(false);
      setIsUploading(false);
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // Function to handle the file input click
  const handleButtonClick = () => {
    if (isUploading) return;
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const getConditionalRootProps = () => {
    if (isUploading) {
      return {
        onClick: (e: MouseEvent) => e.stopPropagation(),
        onDragOver: (e: DragEvent) => e.preventDefault(),
        onDrop: (e: DragEvent) => e.preventDefault(),
      };
    } else {
      return getRootProps();
    }
  };

  // Set the isRendered state to true

  useEffect(() => {
    setIsRendered(true);
  }, []);

  // If the component is not rendered, return a disabled button
  if (!isRendered)
    return (
      <button
        disabled
        type="button"
        className="flex-center base-10 md:base-14 absolute bottom-4 right-4 h-6 w-16 rounded-md bg-white/30 text-white md:bottom-6 md:right-10 md:h-10 md:w-28"
      >
        Edit Cover
      </button>
    );

  return (
    <Dialog
      open={showEditModal}
      onOpenChange={() => setShowEditModal((prev) => !prev)}
    >
      <DialogTrigger>
        <button
          type="button"
          className="flex-center base-10 md:base-14 absolute bottom-4 right-4 h-6 w-16 rounded-md bg-white/30 text-white md:bottom-6 md:right-10 md:h-10 md:w-28"
        >
          Edit Cover
        </button>
      </DialogTrigger>
      <DialogContent className="flex w-full max-w-[500px]">
        <div className="bg-white_gray-850 flex h-fit w-full max-w-[500px] flex-col gap-8 rounded-ten px-4 py-8 md:p-8">
          <div className="flex-between w-full">
            <div className="flex flex-col gap-2">
              <span className="text-gray-900_white bold-18 md:bold-20">
                Edit Cover Image
              </span>
              <span className="base-14 text-gray-400">
                Please select a new cover image
              </span>
            </div>
            <DialogClose>
              <CloseButton />
            </DialogClose>
          </div>
          <div className="flex w-full flex-col gap-5">
            <label className="semibold-14 md:semibold-16 text-gray-900_white">
              Upload Image
            </label>
            {image && (
              <Image
                src={image}
                blurDataURL={
                  bannerImage.blurDataURL ?? "/fallback/no-user-image.png"
                }
                placeholder="blur"
                alt="Profile Image"
                height={150}
                width={86}
                className="h-[8rem] w-full object-cover"
              />
            )}
            <div
              {...getConditionalRootProps()}
              className={`flex-center h-44 w-full flex-col rounded-ten border border-dashed border-gray-400 ${isDragActive && "bg-white-200_gray-800"} ${isUploading && "cursor-not-allowed"}`}
            >
              <input
                {...getInputProps()}
                className="hidden"
                disabled={isUploading}
                ref={fileInputRef}
              />
              <button
                type="button"
                onClick={handleButtonClick}
                disabled={isUploading}
              >
                <FiUpload className="text-2xl text-purple" />
              </button>
              <p className="medium-14 text-gray-blue-100 mt-4">
                Drag and drop an image, or{" "}
                <span className="text-purple" onClick={handleButtonClick}>
                  Browse
                </span>
              </p>
              <span className="base-14 text-gray-400_white-100 mt-2">
                High resolution images (png, jpg, gif)
              </span>
            </div>
            <Button
              height="h-14"
              width="w-full"
              handleClick={handleSubmit}
              disabled={isUploading}
              className={isUploading ? "animate-pulse" : ""}
            >
              {isUploading ? "Updating Profile..." : "Update Profile"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileBannerEditButton;
