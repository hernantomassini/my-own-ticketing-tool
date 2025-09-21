"use client"

import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { changeBoardListName } from "@/actions/boardList/changeName";

interface InlineInputProps {
  id: string;
  title: string;
}

export default function InlineInput({ id, title: previousTitle }: InlineInputProps) {
  const [newTitle, setNewTitle] = useState(previousTitle);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setNewTitle(previousTitle), [previousTitle]);

  useEffect(() => {
    if (editing) {
      const i = inputRef.current;

      if (i) {
        i.focus();
        i.select();
      }
    }
  }, [editing]);

  const commitTitleChange = async () => {
    if (saving) return;

    const newTitleValue = newTitle.trim();

    if (newTitleValue === previousTitle) {
      setEditing(false);
      return;
    }

    setSaving(true);

    const { ok, error } = await changeBoardListName(id, newTitleValue);

    if (error || !ok) {
      setNewTitle(previousTitle);
      // TODO: show toaster
      return;
    }

    setEditing(false);
    setSaving(false);
  };

const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') e.currentTarget.blur();
    if (e.key === 'Escape') {
      setNewTitle(previousTitle);
      setEditing(false);
    }
  }

  const startEdition = () => {
    setEditing(true);
  }

  return (
    <>
      { editing ? (

        <Input
          ref={inputRef}
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={commitTitleChange}
          onKeyDown={handleKeyDown}
          disabled={saving}
        />

      ) : (
        <p
          onClick={startEdition}
          className=" whitespace-normal break-words"
        >
          {newTitle}
        </p>
      )}
    </>
  )
}
