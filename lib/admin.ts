import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

/** Админ эрхтэй session байвал буцаана, үгүй бол null. */
export async function getAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string }).role !== "admin") {
    return null;
  }
  return session;
}
