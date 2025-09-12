'use client'

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface GenericPopoverContentProps<State> {
  placeholder: string;
  onSuccess?: (state?: State) => void;
  action: (_prev: State | null, formData: FormData) => Promise<State>;
}

export default function GenericPopoverContent<State>({ placeholder, onSuccess, action }: GenericPopoverContentProps<State | null>) {
  const t = useTranslations('shared');
  const router = useRouter();

  const [state, submitAction, pending] = useActionState<State | null, FormData>(action, null);

  useEffect(() => {
    if (state) {
      onSuccess?.();
      router.refresh();
    }
  }, [state, onSuccess, router]);

  return (
    <form action={submitAction} className="space-y-4 m-4 md:m-0">
      <Input name="name" type="text" placeholder={placeholder} required />

      <Button className="w-full" type="submit" disabled={pending}>
        {pending ? t('creating') : t('create')}
      </Button>
    </form>
  );
}
