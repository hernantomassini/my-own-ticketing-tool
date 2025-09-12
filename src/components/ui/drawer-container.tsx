"use client"

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

type DrawerContainerProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  title?: string;
  description?: string;
};

export function DrawerContainer({
  trigger,
  children,
  footer,
  title,
  description,
}: DrawerContainerProps) {

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {trigger}
      </DrawerTrigger>
      <DrawerContent
        {...(!title ? { "aria-labelledby": undefined } : {})}
        {...(!description ? { "aria-describedby": undefined } : {})}
      >
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
