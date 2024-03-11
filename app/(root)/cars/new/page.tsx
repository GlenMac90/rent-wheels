import CreateCarForm from "@/components/form/CreateCarForm";
import { getUserByEmail } from "@/lib/actions/user.actions";

const CreateNewCar = async () => {
  const { id: mockId } = await getUserByEmail("glen.mccallum@live.co.uk");
  console.log(mockId);
  return (
    <main className="page-styles">
      <CreateCarForm mockId={mockId} />
    </main>
  );
};

export default CreateNewCar;
