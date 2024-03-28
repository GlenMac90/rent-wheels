"use server";

import { getServerSession } from "next-auth";
import { getUserByEmail } from "./actions/user.actions";

export async function authoriseUser() {
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email) {
    return null;
  }

  const { id: userId } = await getUserByEmail(session.user.email);

  return {
    userEmail: session.user.email,
    userId,
  };
}
