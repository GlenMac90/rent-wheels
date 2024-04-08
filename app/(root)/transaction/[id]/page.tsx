import StripeCheckout from "@/components/StripeCheckout";
import { getTransactionById } from "@/lib/actions/transaction.actions";
import { redirect } from "next/navigation";

const Transaction = async ({ params }: { params: { id: string } }) => {
  const transaction = await getTransactionById(params.id);

  if (!transaction) {
    redirect("/");
  }

  return (
    <main className="page-styles">
      <div className="flex-center">
        <StripeCheckout transaction={transaction} />
      </div>
    </main>
  );
};

export default Transaction;
