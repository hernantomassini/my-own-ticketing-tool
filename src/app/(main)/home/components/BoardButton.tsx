import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import DeleteBoardButton from "./DeleteBoardButton";

type ButtonProps = React.ComponentProps<'button'>;

type BoardButtonProps = {
  icon?: React.ReactNode,
  href?: string
  label: string,
  boardId: string;
  deletable: boolean;
} & ButtonProps;

export default function BoardButton({ href, icon, label, className, boardId, deletable, ...props}: BoardButtonProps) {
  const commonClasses = cn(
    "relative",
    "cursor-pointer group h-36 w-36 rounded-xl",
    "border-2 border-dashed hover:border-solid",
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

  const deleteButton = (
    <>
      {deletable && boardId && (
        <div className="absolute right-2 top-2 z-10">
          <DeleteBoardButton id={boardId} />
        </div>
      )}
    </>
  )

  if (href) {
    return (
      <>
        <Button
          asChild
          variant="outline"
          className={commonClasses}
          {...props}
        >
          <div className="flex flex-col">
            {deleteButton}
            <Link href={href} aria-label={label} title={label}>
              {content}
            </Link>
          </div>
        </Button>
      </>
    )
  } else {
    return (
      <>
        <Button
          type="button"
          variant="outline"
          aria-label={label}
          title={label}
          className={commonClasses}
          {...props}
        >
          <div className="flex flex-col">
            {deleteButton}
            {content}
          </div>
        </Button>
      </>
    )
  }
}
