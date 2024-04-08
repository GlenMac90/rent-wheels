import StripeCheckout from "@/components/StripeCheckout";
import { getTransactionById } from "@/lib/actions/transaction.actions";
import { redirect } from "next/navigation";

const Transaction = async ({ params }: { params: { id: string } }) => {
  const transaction = await getTransactionById(params.id);

  if (!transaction) {
    redirect("/");
  }

  const { userId, carId, price } = transaction;

  console.log(userId, carId, price);
  return <StripeCheckout />;
};

export default Transaction;