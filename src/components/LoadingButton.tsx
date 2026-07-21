import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

import { cn } from "@/lib/utils";

interface LoadingButtonProps extends React.ComponentProps<"button"> {
  isLoading: boolean;
  children: React.ReactNode;
}

export const LoadingButton = ({
  isLoading,
  children,
  disabled,
  className,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      className={cn("flex items-center gap-2", className)}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Loader2 className="size-5 animate-spin" />}
      {children}
    </Button>
  );
};
