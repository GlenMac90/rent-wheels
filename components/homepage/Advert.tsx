import Image from "next/image";

import { AdvertProps } from "@/types/homepage.index";

const Advert = ({ title, description, left = false }: AdvertProps) => {
  return (
    // background image is different for left and right adverts

    <div
      className={`${left ? "flex bg-[url('/advert/advert-bg-1.png')]" : "hidden bg-[url('/advert/advert-bg-2.png')] md:flex"} h-[14.5rem] w-full flex-col justify-between rounded-ten bg-cover p-4 text-white shadow-md md:h-[22.5rem] md:p-6`}
    >
      {/* Advert title and description */}

      <div className="flex flex-col gap-3 md:gap-4">
        <h1 className="semibold-20 sm:semibold-32">{title}</h1>
        <p className="medium-12 sm:medium-16">{description}</p>
      </div>

      {/* Car image */}

      <Image
        src={left ? "/advert/advert-car-1.png" : "/advert/advert-car-2.png"}
        height={left ? 116 : 108}
        width={left ? 406 : 340}
        alt="Image car displayed in the advert section at the top of the page"
        className="max-h-[3.5rem] self-center object-contain sm:max-h-[6.75rem] md:self-end"
      />
    </div>
  );
};

export default Advert;
