import 'server-only'

import LogoutButton from "./components/LogoutButton";
import { supabaseServer } from "@/lib/supabase-server";
import { redirect } from 'next/navigation';
import PreferencesMenu from '@/components/PreferencesMenu';

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await supabaseServer();

  const { data: { session }, error } = await supabase.auth.getSession();

 if (error || !session) {
    redirect('/login');
  }

  return (
    <>
      <header className="flex items-center justify-between px-4 py-2 border-b">
        <span className="font-bold">My Board</span>
        <div className="flex items-center gap-4 cursor-pointer">
          <PreferencesMenu />
          <LogoutButton />
        </div>
      </header>

      <main className="p-4">{children}</main>
    </>
  );
}
