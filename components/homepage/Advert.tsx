import Image from "next/image";

const Advert = ({
  title,
  description,
  left = false,
}: {
  title: string;
  description: string;
  left?: boolean;
}) => {
  return (
    <div
      className={`${left ? "flex bg-[url('/advert-bg-1.png')]" : "hidden bg-[url('/advert-bg-2.png')] md:flex"} h-[14.5rem] w-full flex-col justify-between rounded-ten p-4 text-white md:h-[22.5rem] md:p-6`}
    >
      <div className="flex flex-col gap-3 md:gap-4">
        <h1 className="semibold-20 sm:semibold-32">{title}</h1>
        <p className="medium-12 sm:medium-16">{description}</p>
      </div>
      <Image
        src={left ? "/advert-car-1.png" : "/advert-car-2.png"}
        height={left ? 116 : 108}
        width={left ? 406 : 340}
        alt="Image car displayed in the advert section at the top of the page"
        className="max-h-[3.5rem] self-center object-contain sm:max-h-[6.75rem] md:self-end"
      />
    </div>
  );
};

export default Advert;
