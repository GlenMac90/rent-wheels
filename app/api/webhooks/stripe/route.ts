/* eslint-disable camelcase */
import { NextResponse } from "next/server";
import stripe from "stripe";

import { confirmTransaction } from "@/lib/actions/transaction.actions";

// Stripe webhook handler

export async function POST(request: Request) {
  // Retrieve the event by verifying the signature using the raw body and secret
  const body = await request.text();
  const sig = request.headers.get("stripe-signature")!;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  // define the event
  let event;

  // Verify the event by constructing the event
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  // Handle the event
  const eventType = event.type;

  // Handle the checkout.session.completed event
  if (eventType === "checkout.session.completed") {
    const { metadata } = event.data.object;
    const transactionId = metadata!.transactionId;

    // update the transaction status of transaction in database is payment is successful
    try {
      const updatedTransaction = await confirmTransaction(transactionId);
      return NextResponse.json({ message: "Success", updatedTransaction });
    } catch (error) {
      console.error(error);
    }
  }
  return new Response("", { status: 200 });
}
