'use client'

import { useTranslations } from "next-intl";
import AddBoardButton from "./AddBoardButton";
import { ResponsivePopover } from '@/components/ui/responsive-popover';
import { useState } from "react";
import { Board } from "@/models/board.model";
import { createBoard } from "@/actions/board/create";

import GenericPopoverContent from "@/components/GenericPopoverContent";

export default function CreateBoardButton() {
  const t = useTranslations('home');

  const [open, setOpen] = useState(false);

  const onSuccess = () => {
    setOpen(false);
  };

  return (
    <ResponsivePopover
      title={t('add-board')}
      trigger={<AddBoardButton />}
      open={open}
      setOpen={setOpen}
    >
      <GenericPopoverContent<Board | null>
        placeholder={t('board-name')}
        action={createBoard}
        onSuccess={onSuccess}
      />
    </ResponsivePopover>
  );
}

