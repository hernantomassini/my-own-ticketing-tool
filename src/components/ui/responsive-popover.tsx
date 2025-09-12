import 'client-only'

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import { DrawerContainer } from "./drawer-container";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  trigger: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  title?: string;
  description?: string;
};

export function ResponsivePopover({
  open,
  setOpen,
  trigger,
  children,
  footer,
  title,
  description,
}: Props) {
  const isDesktop = useIsDesktop();

  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, []);

  if (!mounted) return null;

  if (isDesktop) {
    return (
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          {trigger}
        </PopoverTrigger>
        <PopoverContent>
          {children}
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <DrawerContainer
      trigger={trigger}
      footer={footer}
      title={title}
      description={description}
    >
      {children}
    </DrawerContainer>
  )
}
