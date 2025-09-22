import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { TicketSummary } from "@/models/summary/ticket-summary.model";
import { getTranslations } from "next-intl/server";
import EditTicketModal from "./EditTicketModal";

interface TicketButtonProp {
  ticket: TicketSummary;
}

export default async function TicketButton({ ticket }: TicketButtonProp) {
  const t = await getTranslations('board');

  const trigger = (
    <Button className="w-full justify-start cursor-pointer dark:bg-gray-700 bg-gray-50 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600">
      {ticket.title}
    </Button>
  );

  return (
    <ResponsiveDialog
      trigger={trigger}
      title={t('new-ticket-title')}
      description={t('new-ticket-description')}
      showTitle
      showDescription={false}
    >
      <EditTicketModal
        ticket={ticket}
      />
    </ResponsiveDialog>
  );
}
