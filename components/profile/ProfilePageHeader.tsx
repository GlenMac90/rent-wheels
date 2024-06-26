import Image from "next/image";

import { ProfilePageHeaderProps } from "@/types/user.index";
import { ProfileBannerEditButton, ProfileInfoEditButton } from ".";

const ProfilePageHeader = ({ data }: { data: ProfilePageHeaderProps }) => {
  const { image, bannerImage, name, role } = data;

  return (
    <header className="flex w-full flex-col rounded-ten shadow-md">
      <div className="relative flex h-36 w-full md:h-48">
        <Image
          src={bannerImage.url}
          blurDataURL={bannerImage.blurDataURL ?? "/fallback/no-user-image.png"}
          placeholder="blur"
          alt="Banner Image"
          fill
          className="rounded-t-ten object-cover"
        />
        <Image
          src={image?.url ?? "/fallback/no-user-image.png"}
          blurDataURL={image?.blurDataURL ?? "/fallback/no-user-image.png"}
          placeholder="blur"
          alt="Profile Image"
          height={160}
          width={160}
          className="absolute -bottom-9 left-4 size-[4.375rem] shrink-0 rounded-full md:-bottom-24 md:left-8 md:size-40"
        />
        <ProfileBannerEditButton bannerImage={bannerImage} />
      </div>
      <div className="bg-white_gray-850 flex w-full flex-col gap-2 rounded-b-ten px-4 pb-6 pt-11 md:flex-row md:justify-between md:py-8 md:pl-56 md:pr-10">
        <div className="flex flex-col gap-1">
          <span className="text-gray-900_white bold-20">
            {name || "Your name"}
          </span>
          <span className="base-14 text-blue-100">{role || "Job Role"}</span>
        </div>
        <ProfileInfoEditButton profileImage={image} name={name} role={role} />
      </div>
    </header>
  );
};

export default ProfilePageHeader;
