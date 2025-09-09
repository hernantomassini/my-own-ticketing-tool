'use client';

import { useMemo, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { supabaseBrowser } from '@/lib/supabase-browser';
import { useTranslations } from 'next-intl';

export function AnonymousLoginButton() {
  const t = useTranslations("login");
  const [pending, startTransition] = useTransition();

  const router = useRouter();
  const supabase = useMemo(() => supabaseBrowser(), []);

  const handleClick = () =>
    startTransition(async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session) {
        const { error } = await supabase.auth.signInAnonymously();

        if (error) {
          // TODO: Implement Sentry - Show toaster error
          return;
        }
      }

      router.replace('/home');
    });

  return (
    <Button onClick={handleClick} className="cursor-pointer mt-5 w-full">
      {pending ? t('logging-in') : t('login-as-a-guest') }
    </Button>
  );
}
