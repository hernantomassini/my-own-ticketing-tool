import 'server-only'

import LogoutButton from "./home/components/LogoutButton";
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

      <main className="m-8">{children}</main>
    </>
  );
}
