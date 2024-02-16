import Image from "next/image";

import Button from "../Button";
import { profileDummyData } from "@/constants";

const ProfilePageHeader = () => {
  const { name, jobTitle, profileImage, bannerImage } = profileDummyData;

  return (
    <header className="flex w-full flex-col rounded-ten">
      <div className="relative flex h-36 w-full md:h-48">
        <Image
          src={bannerImage}
          alt="Banner Image"
          fill
          className="rounded-t-ten object-cover"
        />
        <Image
          src={profileImage}
          alt="Profile Image"
          height={160}
          width={160}
          className="absolute -bottom-9 left-4 size-[4.375rem] shrink-0 rounded-full md:-bottom-24 md:left-8 md:size-40"
        />
        <button
          type="button"
          className="flex-center base-10 md:base-14 absolute bottom-4 right-4 h-6 w-16 rounded-md bg-white/30 text-white md:bottom-6 md:right-10 md:h-10 md:w-28"
        >
          Edit Cover
        </button>
      </div>
      <div className="bg-white_gray-850 flex w-full flex-col gap-2 rounded-b-ten px-4 pb-6 pt-11 md:flex-row md:justify-between md:py-8 md:pl-56 md:pr-10">
        <div className="flex flex-col gap-1">
          <span className="text-gray-900_white bold-20">{name}</span>
          <span className="base-14 text-blue-100">{jobTitle}</span>
        </div>
        <Button height="h-9 md:h-12" width="w-28 md:w-32" className="self-end">
          Edit Profile
        </Button>
      </div>
    </header>
  );
};

export default ProfilePageHeader;
