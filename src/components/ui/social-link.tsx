import Link from "next/link"
import { Button } from "./button"
import { SocialLinkProps } from "@/models/social-link-props.model"

function SocialLink({
  href,
  label,
  icon : Icon
}: SocialLinkProps) {
  return (
    <Button variant="ghost" size="icon" asChild>
      <Link
        href={href}
        aria-label={label}
        title={label}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon />
      </Link>
    </Button>
  )
}

export { SocialLink }
