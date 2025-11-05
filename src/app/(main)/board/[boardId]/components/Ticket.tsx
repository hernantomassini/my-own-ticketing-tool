"use client"

import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { TicketSummary } from "@/models/summary/ticket-summary.model";
import EditTicketModal from "./EditTicketModal";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface TicketButtonProp {
  ticket: TicketSummary;
  boardId: string;
}

export default function TicketButton({ ticket, boardId }: TicketButtonProp) {
  const t = useTranslations('board');

  const [open, setOpen] = useState(false);

  const onSuccess = () => {
    setOpen(false);
  }

  const trigger = (
    <Button className="w-full justify-start cursor-pointer dark:bg-gray-700 bg-gray-50 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600">
      {ticket.title}
    </Button>
  );

  return (
    <ResponsiveDialog
      trigger={trigger}
      title={t('update-ticket')}
      description={t('update-ticket-description')}
      showTitle
      showDescription={false}
      open={open}
      setOpen={setOpen}
    >
      <EditTicketModal
        ticket={ticket}
        boardId={boardId}
        onSuccess={onSuccess}
      />
    </ResponsiveDialog>
  );
}
