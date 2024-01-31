import Image from "next/image";

const Avatar = () => {
  return (
    <Image
      src="/text-avatar.png"
      height={28}
      width={28}
      alt="Profile Image"
      className="shrink-0 rounded-full"
    />
  );
};

export default Avatar;
