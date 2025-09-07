import { ComponentType, SVGProps } from "react";
type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export interface SocialLinkProps {
  href: string;
  label: string;
  icon: IconType,
}