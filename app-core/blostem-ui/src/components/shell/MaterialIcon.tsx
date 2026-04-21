import { cn } from "@/lib/utils";

type Props = {
  name: string;
  className?: string;
  fill?: boolean;
};

export function MaterialIcon({ name, className, fill }: Props) {
  return (
    <span
      className={cn("material-symbols-outlined", className)}
      style={fill ? { fontVariationSettings: "'FILL' 1" } : undefined}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}

