import { redirect } from "next/navigation";

import { getCarById } from "@/lib/actions/car.actions";
import CreateCarForm from "@/components/form/CreateCarForm";

const EditCar = async ({ params }: { params: { id: string } }) => {
  const carData = await getCarById({ carId: params.id });

  if (!carData) {
    redirect("/");
  }

  return (
    <main className="page-styles px-6">
      <CreateCarForm editCarData={carData} />
    </main>
  );
};

export default EditCar;
