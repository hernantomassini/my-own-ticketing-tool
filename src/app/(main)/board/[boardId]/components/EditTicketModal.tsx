"use client"

import { updateTicket } from "@/actions/ticket/updateTicket";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TicketSummary } from "@/models/summary/ticket-summary.model";
import { UserSummary } from "@/models/summary/user-summary.model";
import { useTranslations } from "next-intl";
import { useActionState, useEffect, useState } from "react";

interface EditTicketModalProps {
  ticket: TicketSummary;
  boardId: string;
  onSuccess?: () => void;
}

export default function EditTicketModal({ ticket, boardId, onSuccess }: EditTicketModalProps) {
  const t = useTranslations();

  const [users, setUsers] = useState<UserSummary[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(ticket?.assignedTo?.id ?? undefined);

  useEffect(() => {
    setTitle(ticket?.title);
  }, [ticket?.title]);

  useEffect(() => {
    if (ticket?.description) {
      setDescription(ticket?.description);
    }
  }, [ticket?.description]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/users", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load users");
        const data: UserSummary[] = await res.json();
        if (!cancelled) setUsers(data);
      } catch (err) {
        console.error(err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [ticket?.id]);

  const [state, submitAction, pending] = useActionState(updateTicket, null);

  useEffect(() => {
    if (state?.ok) {
      onSuccess?.();
    }
  }, [state, onSuccess]);

  return (
    <>
      <form action={submitAction} className="mt-3 space-y-3">
        <input type="hidden" name="ticket_id" value={ticket.id} />

        <Input required name="title" type="text" placeholder={t('board.ticket-name')} defaultValue={title}></Input>
        <Input required name="description" type="text" placeholder={t('board.ticket-description')} defaultValue={description}></Input>

        <Select value={selectedUserId} onValueChange={(val) => setSelectedUserId(val)} >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t('board.assigned-to')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="undefined">{t('board.none')}</SelectItem>
            {users.map((u) => (
              <SelectItem key={u.id} value={u.id}>
                {u.displayName}
                {u.isCurrentUser ? t('board.me') : ""}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <input type="hidden" name="assigned_user_id" value={selectedUserId ?? ""} />
        <input type="hidden" name="board_id" value={boardId} />

        <Button className="w-full" type="submit" disabled={pending}>
          {pending ? t('shared.updating') : t('shared.update')}
        </Button>
      </form>
    </>
  );
}
