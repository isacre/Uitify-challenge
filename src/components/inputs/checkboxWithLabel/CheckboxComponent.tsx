import { useId } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function CheckboxComponent(props: {
  checked: boolean;
  setChecked: (checked: boolean) => void;
  label: string;
}) {
  const id = useId();
  const { checked, setChecked, label } = props;
  return (
    <div className="flex items-center gap-2">
      <Checkbox id={id} checked={checked} onCheckedChange={setChecked} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
}
