"use client";

import { useState, MouseEvent, useCallback, useRef, useEffect } from "react";
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

const ProfileBannerEditButton = ({ bannerImage }: { bannerImage: string }) => {
  const { toast } = useToast();
  const [isRendered, setIsRendered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [image, setImage] = useState<string | null>(bannerImage);
  const [file, setFile] = useState<File | null>(null);
  const { startUpload } = useUploadThing("media");

  const handleInnerClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const onDrop = useCallback((acceptedFiles: any) => {
    setFile(acceptedFiles[0]);
    const imageURL = URL.createObjectURL(acceptedFiles[0]);
    setImage(imageURL);
  }, []);

  const handleSubmit = async () => {
    const hasImageChanged = image !== "/dummy-profile-image.jpg";
    if (!hasImageChanged || !file) return;
    const imgRes = await startUpload([file]);
    if (!imgRes || !imgRes[0].url) return;
    const updatedUser = await updateUser({
      userEmail: "glen.mccallum@live.co.uk",
      userData: {
        bannerImage: imgRes[0].url,
      },
    });
    if (updatedUser.status !== 200) {
      toast({
        variant: "destructive",
        title: "Failed to update profile",
        description: "Please try again later",
      });
      return;
    }
    setShowEditModal(false);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleButtonClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  useEffect(() => {
    setIsRendered(true);
  }, []);

  if (!isRendered) return null;

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
        <div
          className="bg-white_gray-850 flex h-fit w-full max-w-[500px] flex-col gap-8 rounded-ten px-4 py-8 md:p-8"
          onClick={handleInnerClick}
        >
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
                alt="Profile Image"
                height={150}
                width={86}
                className="h-[8rem] w-full object-cover"
              />
            )}
            <div
              {...getRootProps()}
              className={`flex-center h-44 w-full flex-col rounded-ten border border-dashed border-gray-400 ${isDragActive && "bg-white-200_gray-800"}`}
            >
              <input
                {...getInputProps()}
                className="hidden"
                ref={fileInputRef}
              />
              <button type="button" onClick={handleButtonClick}>
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
            <Button height="h-14" width="w-full" handleClick={handleSubmit}>
              Update Profile
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileBannerEditButton;
