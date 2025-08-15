import { Loader2 } from "lucide-react";
import React from "react";

interface Props {
  height?: string;
}
export default function LoadingSpinner(props: Props) {
  const { height = "calc(100vh-6rem)" } = props;
  return (
    <div className={`flex justify-center items-center ${height} w-full `}>
      <Loader2 className="w-4 h-4 animate-spin" />
    </div>
  );
}
