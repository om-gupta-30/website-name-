import { useRef } from "react";
import { playTap, playHover } from "@/lib/sound";

const variantClasses = {
  primary: "cta-primary",
  secondary: "cta-secondary",
};

const sizeClasses = {
  md: "px-8 py-3 text-base",
  sm: "px-5 py-2 text-sm",
  xs: "px-4 py-1.5 text-xs",
};

export default function CTAButton({
  href = "#",
  children,
  variant = "primary",
  size = "md",
  className = "",
  comingSoon = false,
  message = "Coming soon",
  ...rest
}) {
  const variantClass = variantClasses[variant] ?? variantClasses.primary;
  const sizeClass = sizeClasses[size] ?? sizeClasses.md;
  const lastHover = useRef(0);

  const handleClick = (event) => {
    if (comingSoon) {
      event.preventDefault();
      alert(message);
      return;
    }
    // Allow normal navigation for non-coming-soon links
    playTap();
  };

  const handleHover = () => {
    const now = Date.now();
    if (now - lastHover.current > 400) {
      playHover();
      lastHover.current = now;
    }
  };

  return (
    <a
      href={href}
      className={`${variantClass} ${sizeClass} ${className}`}
      onClick={handleClick}
      onPointerEnter={handleHover}
      {...rest}
    >
      <span className="relative z-[2]">{children}</span>
    </a>
  );
}

