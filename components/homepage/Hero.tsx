import Advert from "./Advert";

const Hero = () => {
  return (
    <section className="flex w-full gap-8 ">
      <Advert
        title="The Best Platform for Car Rental"
        description="Ease of doing car rental safely and reliably, and at a low price."
        left
      />
      <Advert
        title="Easy way to rent a car at a low price"
        description="Providing cheap car rental services and safe and comfortable facilities."
      />
    </section>
  );
};

export default Hero;
