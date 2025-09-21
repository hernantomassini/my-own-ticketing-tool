"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DeleteResult } from "@/models/actions-params/delete-result.model";
import { cn } from "@/lib/utils";

type DeleteAction = (
  prev: DeleteResult,
  formData: FormData
) => Promise<DeleteResult>;

interface DeleteButtonProps {
  id: string;
  action: DeleteAction;
  title: string;
  className?: string;
}

export default function DeleteButton({ id, action, title, className }: DeleteButtonProps) {
  const t = useTranslations('shared');
  const [result, submitDelete, pending] = useActionState(action, null);
  const router = useRouter();

  useEffect(() => {
    if (result?.ok) {
      router.refresh();
    }
  }, [result, router]);

  return (
    <div
      className={cn(
        'absolute right-2 top-2 z-10',
        className
      )}
    >
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="z-40 cursor-pointer h-8 w-8 rounded-full"
            onClick={(e) => { e.stopPropagation();}}
            aria-label={title}
            title={title}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
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
    </div>
  )
}
