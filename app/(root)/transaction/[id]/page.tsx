import { getTransactionById } from "@/lib/actions/transaction.actions";
import { redirect } from "next/navigation";

const Transaction = async ({ params }: { params: { id: string } }) => {
  const transaction = await getTransactionById(params.id);

  if (!transaction) {
    redirect("/");
  }

  const { userId, carId, price } = transaction;

  console.log(userId, carId, price);
  return (
    <div className="page-styles">
      <div className="flex-center">We are on the transaction page</div>
    </div>
  );
};

export default Transaction;
