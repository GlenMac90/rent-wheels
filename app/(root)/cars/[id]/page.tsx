import { validateUserSession } from "@/lib/actions/user.actions";

const EditCar = async () => {
  await validateUserSession();

  return <div>Edit Car Page</div>;
};

export default EditCar;
