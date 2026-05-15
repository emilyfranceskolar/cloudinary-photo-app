import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlert } from "lucide-react";

export default function AlertFail() {
  return (
    <div className="w-full space-y-4">
      <Alert className="border-none bg-white text-destructive">
        <OctagonAlert className="size-4" />
        <AlertTitle>
          Unable to process your request. Please try again later.
        </AlertTitle>
      </Alert>
    </div>
  );
}
