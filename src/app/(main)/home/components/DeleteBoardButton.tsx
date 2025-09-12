"use client"

import { deleteBoard } from "@/actions/deleteBoard";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface DeleteBoardButtonProps {
  id: string;
}

export default function DeleteBoardButton({ id }: DeleteBoardButtonProps) {
  const t = useTranslations('home');
  const [result, submitDelete, pending] = useActionState(deleteBoard, null);
  const router = useRouter();

  useEffect(() => {
    if (result?.ok) {
      router.refresh();
    }
  }, [result, router]);

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="z-40 cursor-pointer h-8 w-8 rounded-full"
            onClick={(e) => { e.stopPropagation();}}
            aria-label={t('delete-board-title')}
            title={t('delete-board-title')}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('delete-board-title')}</AlertDialogTitle>
            <AlertDialogDescription>{t('delete-board-description')}</AlertDialogDescription>
          </AlertDialogHeader>

          <form action={submitDelete}>
            <input type="hidden" name="id" value={id}></input>

            <AlertDialogFooter>
              <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button type="submit" disabled={pending}>
                  { pending ? t('deleting') : t('delete')}
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>

        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
