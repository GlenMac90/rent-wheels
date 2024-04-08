/* eslint-disable camelcase */
import { NextResponse } from "next/server";
import stripe from "stripe";

import { confirmTransaction } from "@/lib/actions/transaction.actions";

export async function POST(request: Request) {
  const body = await request.text();
  console.log("BODY:" + body);
  const sig = request.headers.get("stripe-signature")!;
  console.log("SIG:" + sig);
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  console.log("SECRET:" + endpointSecret);

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    console.log("EVENT:" + event);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  const eventType = event.type;
  console.log("EVENT TYPE:" + eventType);

  if (eventType === "checkout.session.completed") {
    console.log(eventType);
    const { metadata } = event.data.object;
    const transactionId = metadata!.transactionId;
    console.log("TRANSACTION ID:" + transactionId);

    try {
      const updatedTransaction = await confirmTransaction(transactionId);
      console.log("UPDATED TRANSACTION:" + updatedTransaction);
      return NextResponse.json({ message: "Success", updatedTransaction });
    } catch (error) {
      console.error(error);
    }
  }
  return new Response("", { status: 200 });
}
