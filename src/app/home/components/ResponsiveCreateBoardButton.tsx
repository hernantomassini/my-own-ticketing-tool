"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import AddBoardButton from "./AddBoardButton";
import AddBoardContent from "./AddBoardContent";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useEffect, useState } from "react";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useTranslations } from "next-intl";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function ResponsiveCreateBoardButton() {
  const t = useTranslations('home');
  const isDesktop = useIsDesktop();

  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, []);

  if (!mounted) return null;

  if (isDesktop) {
    return(
      <>
        <Popover>
          <PopoverTrigger asChild>
            <AddBoardButton />
          </PopoverTrigger>
          <PopoverContent>
            <AddBoardContent />
          </PopoverContent>
        </Popover>
      </>
    );
  } else {
    return (
      <Drawer aria-describedby={undefined}>
        <DrawerTrigger asChild>
          <AddBoardButton />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t('add-board')}</DrawerTitle>
          </DrawerHeader>

          <VisuallyHidden asChild>
            <DrawerDescription>{t('add-board-description')}</DrawerDescription>
          </VisuallyHidden>

          <AddBoardContent />
        </DrawerContent>
      </Drawer>
    )
  }
}
