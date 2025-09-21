"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import DeleteButton from "../../../../components/DeleteButton";
import { deleteBoard } from "@/actions/board/delete";
import { useTranslations } from "next-intl";

type ButtonProps = React.ComponentProps<'button'>;

type BoardButtonProps = {
  icon?: React.ReactNode,
  href?: string
  label: string,
  boardId?: string;
  deletable?: boolean;
} & ButtonProps;

export default function BoardButton({ href, icon, label, className, boardId, deletable, ...props}: BoardButtonProps) {
  const cardClasses = cn(
    "cursor-pointer group h-36 w-36 rounded-xl",
    "border-2 border-solid",
    "hover:bg-muted/40",
    "flex flex-col items-center justify-center gap-1",
    "font-medium",
    className
  );

  const content = (
    <>
      {icon}

      <span className="px-2 text-center whitespace-normal break-words text-sm md:text-base leading-snug">
        {label}
      </span>
    </>
  );

  const t = useTranslations('home');

  const deleteButton = (
    <>
      {deletable && boardId && <DeleteButton id={boardId} action={deleteBoard} title={t('delete-board-title')} />}
    </>
  )

  if (href) {
    return (
      <div className="relative inline-block">
        <Button
          asChild
          variant="outline"
          className={cardClasses}
          {...props}
        >
          <Link href={href} aria-label={label} title={label}>
            {content}
          </Link>
        </Button>

        {deleteButton}
      </div>
    )
  } else {
    return (
      <div className={cn("relative inline-block", className)}>
        <Button
          type="button"
          variant="outline"
          aria-label={label}
          title={label}
          className={cardClasses}
          {...props}
        >
          {content}
        </Button>

        {deleteButton}
      </div>
    )
  }
}
