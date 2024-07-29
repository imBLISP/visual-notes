import { Button } from "@repo/ui";
import {Settings as SettingsIcon} from "lucide-react"

export default function Settings() {

    return (
        <div>
            <Button variant="ghost" className="justify-center items-center">
            <SettingsIcon size={18} className="font-medium text-muted-foreground"/>
            </Button>
        </div>
    );
}