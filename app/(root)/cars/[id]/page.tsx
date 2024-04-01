import { validateUserSession } from "@/lib/actions/user.actions";
import { getCarById } from "@/lib/actions/car.actions";
import CreateCarForm from "@/components/form/CreateCarForm";
import { redirect } from "next/navigation";

const EditCar = async ({ params }: { params: { id: string } }) => {
  await validateUserSession();
  const carData = await getCarById({ carId: params.id });

  if (!carData) {
    redirect("/");
  }

  return (
    <main className="page-styles">
      <CreateCarForm editCarData={carData} />
    </main>
  );
};

export default EditCar;
