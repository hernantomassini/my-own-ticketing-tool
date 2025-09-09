"use client"

import { setLocale } from "@/actions/setLocale";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Locale, useTranslations } from "next-intl";
import { useTransition } from "react";

export default function LocaleSwitcher({ currentLocale }: { currentLocale: Locale } = { currentLocale: 'en'}) {
  const t = useTranslations("layout-header.language-selector");
  const [, startTransition] = useTransition();

  const handleLocaleChange = (locale: Locale) => {
    startTransition(async () => {
      await setLocale(locale);
    });
  }

  return (
    <>
      <Select defaultValue='en' value={currentLocale} onValueChange={handleLocaleChange} >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={t('language')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">{t('en')}</SelectItem>
          <SelectItem value="es">{t('es')}</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
