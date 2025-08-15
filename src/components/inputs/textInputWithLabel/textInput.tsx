import { Input } from "@/components/ui/input";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  type: string;
  id: string;
  actionComponent?: React.ReactNode;
  required?: boolean;
}
export default function FormField({
  title,
  type,
  id,
  actionComponent,
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
      <Input data-testid="input-field" type={type} id={id} {...props} />
    </div>
  );
}
