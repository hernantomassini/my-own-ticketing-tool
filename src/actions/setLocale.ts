'use server';

import {cookies} from 'next/headers';
import { Locale } from 'next-intl';

export async function setLocale(nextLocale: Locale) {
  const c = await cookies();
  c.set('locale', nextLocale);
}
