"use client"

import { Button } from "@/components/ui/button"
import { LogOutIcon } from "lucide-react"
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LogoutButton() {

  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(() => {
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
