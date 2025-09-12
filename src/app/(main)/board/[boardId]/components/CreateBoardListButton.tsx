"use client"

import { createBoardList } from "@/actions/boardList/create";
import GenericPopoverContent from "@/components/GenericPopoverContent";
import { Button } from "@/components/ui/button";
import { ResponsivePopover } from "@/components/ui/responsive-popover";
import { useTranslations } from "next-intl";
import { useState } from "react";

type ButtonProps = React.ComponentProps<'button'>;

export interface CreateBoardListButtonProps {
  boardId: string;
}

type CreateBoardListButtonComponentProps = CreateBoardListButtonProps & ButtonProps;

export default function CreateBoardListButton({ boardId ,...props }: CreateBoardListButtonComponentProps) {
  const t = useTranslations("board");

  const [open, setOpen] = useState(false);

  const onSuccess = () => {
    setOpen(false);
  };

  const trigger = (
    <Button
      type="button"
      className="cursor-pointer"
      {...props}
    >
      {t('add-list')}
    </Button>
  );

  const wrappedAction = createBoardList.bind(null, { boardId });

  return(
    <ResponsivePopover
      title={t('add-list')}
      trigger={trigger}
      open={open}
      setOpen={setOpen}
    >
      <GenericPopoverContent<string | null>
        placeholder={t('list-name')}
        action={wrappedAction}
        onSuccess={onSuccess}
      />
    </ResponsivePopover>
  );
}
