import { getLocale } from "next-intl/server";
import { Locale } from "next-intl";

import LocaleSwitcher from "./components/LocaleSwitcher";
import LogoutButton from "./components/LogoutButton";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale: Locale = (await getLocale());

  return (
    <>
      <header className="flex items-center justify-between px-4 py-2 border-b">
        <span className="font-bold">My Board</span>
        <div className="flex items-center gap-4 cursor-pointer">
          <LocaleSwitcher
            currentLocale={locale}
          />

          <LogoutButton />
        </div>
      </header>

      <main className="p-4">{children}</main>
    </>
  );
}
