'use client'

import { createBoard } from "@/actions/createBoard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations('home');

  return (
    <Button className="w-full " type="submit" disabled={pending}>
      {pending ? t('creating') : t('create')}
    </Button>
  );
}

export default function AddBoardContent() {
  const t = useTranslations('home');

  return (
    <form action={createBoard} className="space-y-4 m-4 md:m-0">
      <Input name="name" type="text" placeholder={t('board-name')} required />
      <SubmitButton />
    </form>
  );
}
