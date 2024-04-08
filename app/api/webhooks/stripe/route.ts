/* eslint-disable camelcase */
import { NextResponse } from "next/server";
import stripe from "stripe";

import { confirmTransaction } from "@/lib/actions/transaction.actions";

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook Error", error: err });
  }

  const eventType = event.type;

  if (eventType === "checkout.session.completed") {
    const session = event.data.object as any; // or as { transactionId: string; } for more specific typing
    const transactionId = session.transactionId;

    const updatedTransaction = await confirmTransaction(transactionId);
    return NextResponse.json({ message: "Success", updatedTransaction });
  }
}
