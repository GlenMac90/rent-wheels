import { ICar } from "@/lib/models/car.model";
import CarCard from "../homepage/CarCard";

const ProfileRentedCars = ({ cars }: { cars: ICar[] }) => {
  console.log(cars);
  return (
    <section className="flex w-full flex-col gap-5">
      <h3 className="semibold-14 md:semibold-16 text-gray-400">Rented Cars</h3>
      <div className="flex flex-col gap-5 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cars.map((car) => (
          <CarCard key={car.id} data={car} />
        ))}
      </div>
    </section>
  );
};

export default ProfileRentedCars;
