import { Alert, AlertTitle } from "@/components/ui/alert";
import { CircleFadingArrowUpIcon } from "lucide-react";

export default function AlertSuccess() {
  return (
    <div className="w-48 space-y-4">
      <Alert className="border-none bg-white text-emerald-500">
        <CircleFadingArrowUpIcon className="size-4" />
        <AlertTitle>Your action has been completed successfully.</AlertTitle>
      </Alert>
    </div>
  );
}
