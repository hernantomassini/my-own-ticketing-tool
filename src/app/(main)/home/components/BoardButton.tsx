import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type ButtonProps = React.ComponentProps<'button'>;

type BoardButtonProps = {
  icon?: React.ReactNode,
  href?: string
  label: string,
} & ButtonProps;

export default function BoardButton({ href, icon, label, className, ...props}: BoardButtonProps) {
  const commonClasses = cn(
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

  if (href) {
    return (
      <Button
        asChild
        variant="outline"
        className={commonClasses}
        {...props}
      >
        <Link href={href} aria-label={label} title={label}>
          {content}
        </Link>
      </Button>
    )
  } else {
    return (
      <Button
        type="button"
        variant="outline"
        aria-label={label}
        title={label}
        className={commonClasses}
        {...props}
      >
        {content}
      </Button>
    )
  }
}
