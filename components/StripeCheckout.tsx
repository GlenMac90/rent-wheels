"use client";

import {
  TransactionDataProps,
  checkoutTransaction,
} from "@/lib/actions/transaction.actions";

const StripeCheckout = ({ transaction }: TransactionDataProps) => {
  const { id, price, rentalPeriod } = transaction;
  const onCheckout = async () => {
    const transaction = {
      id,
      price,
    };
    await checkoutTransaction({ transaction });
  };
  console.log(rentalPeriod);
  return (
    <form action={onCheckout} method="POST" className="flex">
      <section className="flex flex-col">
        <label>{price}</label>
        <button type="submit" className="rounded bg-purple p-6" role="link">
          Proceed To Checkout
        </button>
      </section>
    </form>
  );
};

export default StripeCheckout;
