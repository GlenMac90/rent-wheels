"use client";

import {
  TransactionDataProps,
  checkoutTransaction,
} from "@/lib/actions/transaction.actions";
import React from "react";

const StripeCheckout = ({ transaction }: TransactionDataProps) => {
  const { id, userId, carId, price, rentalPeriod } = transaction;
  const onCheckout = async () => {
    const transaction = {
      id,
      userId,
      carId,
      price,
      rentalPeriod,
    };
    await checkoutTransaction({ transaction });
  };
  return (
    <form action={onCheckout} method="POST">
      <section>
        <button type="submit" className="rounded bg-purple p-6" role="link">
          Buy Now
        </button>
      </section>
    </form>
  );
};

export default StripeCheckout;
