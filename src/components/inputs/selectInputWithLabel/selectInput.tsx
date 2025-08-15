import { cn } from "@/lib/utils";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  title: string;
  id: string;
  actionComponent?: React.ReactNode;
  children: React.ReactNode;
  required?: boolean;
}
export default function SelectWithLabel({
  title,
  id,
  actionComponent,
  children,
  className,
  required = false,
  ...props
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="label-wrapper">
        <label data-testid="label" htmlFor={id}>
          {title}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {actionComponent && actionComponent}
      </div>
      <select
        className={cn(
          "bg-black text-white peer border-input focus-visible:border-ring focus-visible:ring-ring/50 has-[option[disabled]:checked]:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-full cursor-pointer appearance-none items-center rounded-md border text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          props.multiple
            ? "[&_option:checked]:bg-accent py-1 *:px-3 *:py-1"
            : "h-9 ps-3 pe-8",
          className
        )}
        id={id}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
