'use client'

import { createBoard } from "@/actions/createBoard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Board } from "@/models/board.model";
import { useTranslations } from "next-intl";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AddBoardContentProps {
  onSuccess?: () => void;
}

export default function AddBoardContent({ onSuccess }: AddBoardContentProps) {
  const t = useTranslations('home');
  const router = useRouter();

  const [board, submitCreateBoard, pending] = useActionState<Board | null, FormData>(createBoard, null);

  useEffect(() => {
    if (board) {
      onSuccess?.();
      router.refresh();
    }
  }, [board, onSuccess, router]);

  return (
    <form action={submitCreateBoard} className="space-y-4 m-4 md:m-0">
      <Input name="name" type="text" placeholder={t('board-name')} required />

      <Button className="w-full" type="submit" disabled={pending}>
        {pending ? t('creating') : t('create')}
      </Button>
    </form>
  );
}
