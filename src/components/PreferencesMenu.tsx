import 'server-only'

import { Locale } from "next-intl";
import { getLocale } from 'next-intl/server';
import LocaleSwitcher from './LocaleSwitcher';
import ThemeSelector from './ThemeSelector';

export default async function PreferencesMenu() {
  const locale: Locale = (await getLocale());

  return (
    <>
      <LocaleSwitcher
        currentLocale={locale}
      />
      <ThemeSelector/>
    </>
  );
}
