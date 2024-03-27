import CreateCarForm from "@/components/form/CreateCarForm";
import { validateUserSession } from "@/lib/actions/user.actions";

const CreateNewCar = async () => {
  await validateUserSession();
  return (
    <main className="page-styles">
      <CreateCarForm />
    </main>
  );
};

export default CreateNewCar;
