import 'server-only'

import { redirect } from "next/navigation";

export default function Page() {
  redirect("/login");
}
