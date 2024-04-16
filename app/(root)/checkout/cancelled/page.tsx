import TransactionResult from "@/components/TransactionResult";

const Checkout = async () => {
  return (
    <main className="page-styles">
      <TransactionResult status={"cancelled"} />
    </main>
  );
};

export default Checkout;
