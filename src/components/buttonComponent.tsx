import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  size?: number;
  icon?: React.ReactNode;
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}
export default function ButtonComponent(props: Props) {
  const {
    size = 16,
    icon = (
      <ArrowRightIcon
        className="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
        size={size}
        aria-hidden="true"
      />
    ),
    text,
    disabled = false,
    onClick,
  } = props;
  return (
    <Button
      className={cn(
        `group`,
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
      {icon}
    </Button>
  );
}
