import { getServerSession } from "next-auth";

export async function authoriseUser() {
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email) {
    return null;
  }
  return {
    userEmail: session.user.email,
  };
}
