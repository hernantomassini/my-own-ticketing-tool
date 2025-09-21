"use client"

import { createTicket } from "@/actions/ticket/createTicket";
import GenericPopoverContent from "@/components/GenericPopoverContent";
import { Button } from "@/components/ui/button";
import { ResponsivePopover } from "@/components/ui/responsive-popover";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface AddTicketButtonProps {
  id: string;
}

export default function AddTicketButton({ id: boardListId }: AddTicketButtonProps) {
  const t = useTranslations('board');

  const [open, setOpen] = useState(false);

  const trigger = (
    <Button className="cursor-pointer">
      <Plus className="size-5" aria-hidden />
      <span>{t('new-ticket')}</span>
    </Button>
  );

  const onSuccess = () => {
    setOpen(false);
  }

  const wrappedAction = createTicket.bind(null, { boardListId });

  return (
    <ResponsivePopover
      title={t('add-ticket')}
      trigger={trigger}
      open={open}
      setOpen={setOpen}
    >
      <GenericPopoverContent<string | null>
        placeholder={t('ticket-name')}
        action={wrappedAction}
        onSuccess={onSuccess}
      />
    </ResponsivePopover>
  );
}
