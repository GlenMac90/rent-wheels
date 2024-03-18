import CreateCarForm from "@/components/form/CreateCarForm";
import {
  getUserByEmail,
  validateUserSession,
} from "@/lib/actions/user.actions";

const CreateNewCar = async () => {
  await validateUserSession();

  const { id: mockId } = await getUserByEmail("glen.mccallum@live.co.uk");
  console.log(mockId);
  return (
    <main className="page-styles">
      <CreateCarForm mockId={mockId} />
    </main>
  );
};

export default CreateNewCar;
