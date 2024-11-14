
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    Input
} from "@repo/ui"

export default function TitleEditable({ title, onTitleChange }: { title: string, onTitleChange: (title: string) => void }) {
    return (
        <Popover>
            <PopoverTrigger>
                {title}
            </PopoverTrigger>
            <PopoverContent className="p-2">
                <Input defaultValue={title} onChange={(e) => {
                    onTitleChange(e.target.value);
                }} />
            </PopoverContent>
        </Popover>
    )
}