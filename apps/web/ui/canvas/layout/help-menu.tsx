import { Button } from "@repo/ui";
import { HelpCircle } from "lucide-react";

export function HelpMenu() {
  return (
    <>
      <div className="absolute left-[20px] bottom-[10px] rounded-sm border bg-white">
        <Button variant="ghost" className="p-0 w-10 h-10 flex items-center justify-center rounded-sm">
          <HelpCircle size={16} />
        </Button>
      </div>
    </>
  )
}   