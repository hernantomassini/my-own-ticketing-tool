'use client'

import { useTranslations } from "next-intl";
import AddBoardButton from "./AddBoardButton";
import AddBoardContent from "./AddBoardContent";
import { ResponsivePopover } from '@/components/ui/responsive-popover';
import { useState } from "react";

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
      <AddBoardContent
        onSuccess={onSuccess}
      />
    </ResponsivePopover>
  );
}

