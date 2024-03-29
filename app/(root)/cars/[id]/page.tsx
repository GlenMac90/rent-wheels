import { validateUserSession } from "@/lib/actions/user.actions";
import { getCarById } from "@/lib/actions/car.actions";
import CreateCarForm from "@/components/form/CreateCarForm";

const EditCar = async ({ params }: { params: { id: string } }) => {
  await validateUserSession();
  const carData = await getCarById({ carId: params.id });
  console.log(carData);

  return (
    <main className="page-styles">
      <CreateCarForm editCarData={carData} />
    </main>
  );
};

export default EditCar;
