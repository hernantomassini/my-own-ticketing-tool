"use client"

import BoardButton from "./BoardButton";
import { useTranslations } from "next-intl";

type ButtonProps = React.ComponentProps<'button'>;

export default function AddBoardButton(props: ButtonProps) {
  const t = useTranslations("home");
  const addBoardText = t('add-board');

  const icon = <span className="text-4xl">+</span>;

  return(
    <BoardButton
      icon={icon}
      label={addBoardText}
      {...props}
    />
  );
}
