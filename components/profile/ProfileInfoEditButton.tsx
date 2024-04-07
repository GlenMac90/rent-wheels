"use client";

import { useState, useRef, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import CloseButton from "../CloseButton";
import { profileFormSchema, ProfileFormFields } from "@/schemas";
import Button from "../Button";
import { useUploadThing } from "@/utils/uploadthing";
import { updateUser } from "@/lib/actions/user.actions";
import { useToast } from "@/components/ui/use-toast";
import { ProfileInfoEditButtonProps } from "@/types/user.index";
import { deleteFiles, getBlurData } from "@/lib/actions/image.actions";

const ProfileInfoEditButton = ({
  profileImage,
  name,
  role,
}: ProfileInfoEditButtonProps) => {
  const { toast } = useToast();
  const [isRendered, setIsRendered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>(profileImage.url);
  const [profileImageFile, setProfileImageFile] = useState<File[] | null>(null);
  const { startUpload } = useUploadThing("media");

  const handleButtonClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormFields>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      image: profileImage.url,
      name,
      role,
    },
  });

  const onSubmit: SubmitHandler<ProfileFormFields> = async (userData) => {
    const { image } = userData;
    let imageData = profileImage;

    const hasImageChanged = image !== profileImage.url;

    try {
      setIsUploading(true);

      if (hasImageChanged && profileImageFile) {
        await deleteFiles([profileImage.key]);
        const imgRes = await startUpload(profileImageFile);

        if (!imgRes || !imgRes[0].url) return;
        setImage(imgRes[0].url);
        const { blurDataURL, width, height } = await getBlurData(imgRes[0].url);

        imageData = {
          url: imgRes[0].url,
          key: imgRes[0].key,
          blurDataURL,
          width,
          height,
        };
      }

      await updateUser({
        userData: {
          image: imageData,
          name: userData.name,
          role: userData.role,
        },
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to update profile",
        description: "Please try again later",
      });
    } finally {
      setShowEditModal(false);
      setIsUploading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const filesArray = Array.from(e.target.files);
      const file = e.target.files[0];
      setProfileImageFile(filesArray);
      setImage(URL.createObjectURL(file));
      setValue("image", URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    setIsRendered(true);
  }, []);

  if (!isRendered)
    return (
      <Button
        height="h-9 md:h-12"
        width="w-28 md:w-32"
        className="self-end"
        disabled
      >
        Edit Profile
      </Button>
    );

  return (
    <Dialog
      open={showEditModal}
      onOpenChange={() => setShowEditModal((prev) => !prev)}
    >
      <DialogTrigger>
        <Button height="h-9 md:h-12" width="w-28 md:w-32" className="self-end">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="flex w-full max-w-[500px]">
        <div className="bg-white_gray-850 flex h-fit w-full max-w-[500px] flex-col gap-8 rounded-ten px-4 py-8 md:p-8">
          <div className="flex-between w-full">
            <div className="flex flex-col gap-2">
              <span className="text-gray-900_white bold-18 md:bold-20">
                Edit Profile
              </span>
              <span className="base-14 text-gray-400">
                Please enter your info
              </span>
            </div>
            <DialogClose>
              <CloseButton />
            </DialogClose>
          </div>
          <form
            className="flex w-full flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <Image
                  src={image ?? "/fallback/no-user-image.png"}
                  blurDataURL={
                    profileImage?.blurDataURL ?? "/fallback/no-user-image.png"
                  }
                  placeholder="blur"
                  alt="Profile Image"
                  height={86}
                  width={86}
                  className="size-[4.5rem] shrink-0 rounded-full object-cover md:size-[5.5rem]"
                />
                <input
                  {...register("image")}
                  className="hidden"
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleChange}
                  disabled={isUploading}
                />
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="flex-center semibold-12 md:semibold-16 z-50 rounded-lg px-3 py-2 text-purple"
                  disabled={isUploading}
                >
                  Upload new picture
                </button>
              </div>
              {errors.image && (
                <span className="light-12 text-red-500">
                  {errors.image.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="semibold-14 md:semibold-16 text-gray-900_white">
                Full Name
              </label>
              <div className="bg-white-200_gray-800 flex w-full rounded-lg p-4">
                <input
                  {...register("name")}
                  type="text"
                  className="bg-white-200_gray-800 text-gray-900_white w-full outline-none"
                  autoComplete="off"
                  disabled={isUploading}
                />
              </div>
              {errors.name && (
                <span className="light-12 text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="semibold-14 md:semibold-16 text-gray-900_white">
                Role
              </label>
              <div className="bg-white-200_gray-800 flex w-full rounded-lg p-4">
                <input
                  {...register("role")}
                  type="text"
                  className="bg-white-200_gray-800 text-gray-900_white w-full outline-none"
                  autoComplete="off"
                  disabled={isUploading}
                />
              </div>
              {errors.role && (
                <span className="light-12 text-red-500">
                  {errors.role.message}
                </span>
              )}
            </div>
            <Button
              height="h-14"
              width="w-full"
              submit
              className={isUploading ? "animate-pulse" : ""}
              disabled={isUploading}
            >
              {isUploading ? "Updating Profile..." : "Update Profile"}{" "}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileInfoEditButton;
