import 'server-only'

import { Locale } from "next-intl";
import { getLocale } from 'next-intl/server';
import LocaleSwitcher from './LocaleSwitcher';

export default async function PreferencesMenu() {
  const locale: Locale = (await getLocale());

  return (
    <>
      <LocaleSwitcher
        currentLocale={locale}
      />
    </>
  );
}
