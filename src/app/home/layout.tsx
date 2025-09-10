import 'server-only'

import LogoutButton from "./components/LogoutButton";
import PreferencesMenu from '@/components/PreferencesMenu';

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <header className="flex items-center justify-between px-4 py-2 border-b">
        <span className="font-bold">Ticketing Tool</span>
        <div className="flex items-center gap-4 cursor-pointer">
          <PreferencesMenu />
          <LogoutButton />
        </div>
      </header>

      <main className="p-4">{children}</main>
    </>
  );
}
