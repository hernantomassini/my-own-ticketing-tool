"use client"

import { Button } from "@/components/ui/button"
import { supabaseBrowser } from "@/lib/supabase-browser";
import { LogOutIcon } from "lucide-react"
import { useRouter } from "next/navigation";
import { useMemo, useTransition } from "react";

export default function LogoutButton() {

  const supabase = useMemo(() => supabaseBrowser(), []);
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await supabase.auth.signOut()
      router.push('/login');
    });
  };

  return (
    <Button
      onClick={handleLogout}
      className="cursor-pointer"
      variant="ghost"
      size="icon"
      aria-label="Log out"
      disabled={pending}
    >
      <LogOutIcon />
    </Button>
  )
}
