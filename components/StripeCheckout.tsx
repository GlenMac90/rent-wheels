"use client";

import {
  TransactionDataProps,
  checkoutTransaction,
} from "@/lib/actions/transaction.actions";
import Button from "./Button";

const StripeCheckout = ({ transaction }: TransactionDataProps) => {
  const { id, price } = transaction;
  const onCheckout = async () => {
    const transaction = {
      id,
      price,
    };
    await checkoutTransaction({ transaction });
  };
  return (
    <form action={onCheckout} method="POST" className="h-fit">
      <Button submit className="p-3">
        Checkout
      </Button>
    </form>
  );
};

export default StripeCheckout;
