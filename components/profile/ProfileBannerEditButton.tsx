"use client";

import { useState, MouseEvent, useRef } from "react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ModalBackground from "../ModalBackground";
import CloseButton from "../CloseButton";
import { profileFormSchema, ProfileFormFields } from "@/schemas";
import Button from "../Button";

const ProfileBannerEditButton = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(
    "/dummy-profile-image.jpg"
  );

  const handleClick = () => {
    setShowEditModal(!showEditModal);
  };

  const handleInnerClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

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
  });

  const onSubmit: SubmitHandler<ProfileFormFields> = (data) => {
    console.log(data);
  };

  return (
    <>
      <button
        onClick={handleClick}
        type="button"
        className="flex-center base-10 md:base-14 absolute bottom-4 right-4 h-6 w-16 rounded-md bg-white/30 text-white md:bottom-6 md:right-10 md:h-10 md:w-28"
      >
        Edit Cover
      </button>
      {showEditModal && (
        <ModalBackground handleClose={handleClick}>
          <div
            className="bg-white_gray-850 flex h-fit w-full max-w-[500px] flex-col gap-8 rounded-ten px-4 py-8 md:p-8"
            onClick={handleInnerClick}
          >
            <div className="flex-between w-full">
              <div className="flex flex-col">
                <span className="text-gray-900_white bold-18 md:bold-20">
                  Edit Profile
                </span>
                <span className="base-14 text-gray-400">
                  Please enter your info
                </span>
              </div>
              <CloseButton handleClose={handleClick} />
            </div>
            <form
              className="flex w-full flex-col gap-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <Image
                    src={profileImage}
                    alt="Profile Image"
                    height={86}
                    width={86}
                    className="size-[4.5rem] shrink-0 rounded-full md:size-[5.5rem]"
                  />
                  <input
                    {...register("profileImage")}
                    className="hidden"
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        setProfileImage(URL.createObjectURL(file));
                        setValue("profileImage", URL.createObjectURL(file));
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleButtonClick}
                    className="flex-center bg-white-200_gray-800 semibold-12 md:semibold-16 rounded-lg px-3 py-2 text-blue-500 dark:text-blue-300"
                  >
                    Upload new picture
                  </button>
                </div>
                {errors.profileImage && (
                  <span className="light-12 text-red-500">
                    {errors.profileImage.message}
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
                    {...register("jobTitle")}
                    type="text"
                    className="bg-white-200_gray-800 text-gray-900_white w-full outline-none"
                    autoComplete="off"
                  />
                </div>
                {errors.jobTitle && (
                  <span className="light-12 text-red-500">
                    {errors.jobTitle.message}
                  </span>
                )}
              </div>
              <Button height="h-14" width="w-full" submit>
                Update Profile
              </Button>
            </form>
          </div>
        </ModalBackground>
      )}
    </>
  );
};

export default ProfileBannerEditButton;
