import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type AddBoardButtonProps = React.ComponentProps<'button'>;

export default function AddBoardButton({className, ...props}: AddBoardButtonProps) {
  const t = useTranslations("home");
  const addBoardText = t('add-board');

  return(
    <button
      {...props}
      type="button"
      aria-label={addBoardText}
      title={addBoardText}
      className={
        cn(
          'cursor-pointer flex h-36 w-36 justify-center items-center rounded-xl border-2 border-dashed hover:border-solid hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition',
          className
        )
      }
    >
      <div className="flex flex-col items-center gap-1">
        <span className="text-4xl">+</span>
        <span className="font-medium">{addBoardText}</span>
      </div>
    </button>
  );
}
