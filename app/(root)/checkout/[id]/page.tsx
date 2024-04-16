import { getTransactionById } from "@/lib/actions/transaction.actions";
import TransactionResult from "@/components/TransactionResult";

const Checkout = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const transaction = await getTransactionById(params.id);

  const pendingStatus = transaction.pending ? "failed" : "success";

  return (
    <main className="page-styles">
      <TransactionResult
        status={pendingStatus}
        transactionId={params.id.toString()}
      />
    </main>
  );
};

export default Checkout;
