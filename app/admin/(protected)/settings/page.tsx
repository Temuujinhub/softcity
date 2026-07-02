import { redirect } from "next/navigation";

// Тохиргоо хуудас «Контент» хуудсаар солигдсон.
export default function AdminSettingsPage() {
  redirect("/admin/content");
}
