import Image from "next/image";
import Link from "next/link";

const Avatar = () => {
  return (
    <Link href="/profile">
      <Image
        src="/fallback/text-avatar.png"
        height={28}
        width={28}
        alt="Profile Image"
        className="shrink-0 rounded-full"
      />
    </Link>
  );
};

export default Avatar;
