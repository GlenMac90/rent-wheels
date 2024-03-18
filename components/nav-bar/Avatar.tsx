import Image from "next/image";
import Link from "next/link";

const Avatar = ({ profileImage }: { profileImage: string | null }) => {
  return (
    <Link href="/profile">
      <Image
        src={profileImage ?? "/fallback/text-avatar.png"}
        height={28}
        width={28}
        alt="Profile Image"
        className="shrink-0 rounded-full"
      />
    </Link>
  );
};

export default Avatar;
