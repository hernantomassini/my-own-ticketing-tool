"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useEffect, useState } from 'react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useIsDesktop } from '@/hooks/useIsDesktop';

type Props = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  title: string;
  description: string;
  showTitle?: boolean;
  showDescription?: boolean;
};

export function ResponsiveDialog({
  trigger,
  children,
  footer,
  title,
  description,
  showTitle = false,
  showDescription = false,
}: Props) {
  const [open, setOpen] = useState(false)
  const isDesktop = useIsDesktop();

  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, []);

  if (!mounted) return null;

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          {(title || description) && (
            <DialogHeader>

              { showTitle && (<DialogTitle>{title}</DialogTitle>)}
              { !showTitle && (
                <VisuallyHidden asChild>
                  <DialogTitle>{title}</DialogTitle>
                </VisuallyHidden>
              )}

              { showDescription && (<DialogDescription>{description}</DialogDescription>)}
              { !showDescription && (
                <VisuallyHidden asChild>
                  <DialogDescription>{description}</DialogDescription>
                </VisuallyHidden>
              )}

            </DialogHeader>
          )}
          {children}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {trigger}
      </DrawerTrigger>
      <DrawerContent>
        {(title || description) && (
          <DrawerHeader>
            {title && <DrawerTitle>{title}</DrawerTitle>}
            {description && <DrawerDescription>{description}</DrawerDescription>}
          </DrawerHeader>
        )}
        {children}

        {footer && (
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              {footer}
            </DrawerClose>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
}
