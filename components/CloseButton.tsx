import Image from "next/image";

const CloseButton = ({ handleClose }: { handleClose?: () => void }) => {
  return (
    <button onClick={handleClose} className="self-start">
      <Image
        src="/icons/close.svg"
        height={25}
        width={25}
        alt="button to close modal"
        className="shrink-0 dark:grayscale dark:invert"
      />
    </button>
  );
};

export default CloseButton;
