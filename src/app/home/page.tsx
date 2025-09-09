"use client"

import { useTranslations } from "next-intl";
import ResponsiveCreateBoardButton from "./components/ResponsiveCreateBoardButton";

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <div className="flex flex-col items-center md:items-start">

      <span className="text-3xl">{t('title')}</span>

      <div className="m-8">
        <ResponsiveCreateBoardButton />
      </div>
    </div>

    // <div>
    //   <h1>Board</h1>
    //   <ul>
    //     {columns.map((col) => (
    //       <li key={col.id}>{col.title}</li>
    //     ))}
    //   </ul>
    // </div>
  );
}
