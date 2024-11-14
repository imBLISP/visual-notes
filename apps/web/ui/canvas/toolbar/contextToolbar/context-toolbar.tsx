import { DefaultSizeStyle, track, useEditor } from "tldraw";
import { NoteTool } from "@/ui/canvas/toolbar/contextToolbar/items/note-tool"
import { DeleteTool } from "@/ui/canvas/toolbar/contextToolbar/items/delete-tool"
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@repo/utils";


const ShowContextToolbar = track(() => {
	const editor = useEditor();
	const selectedShapes = editor.getSelectedShapes();

	const hideToolbar = !selectedShapes || selectedShapes.length > 1 || selectedShapes.length === 0

	return (
		<>
			<div
				className={cn("transition-opacity duration-100 opacity-0 absolute pointer-events-auto left-[20px] top-[300px] rounded-sm border bg-white", hideToolbar ? "opacity-0" : "opacity-100")}
				onPointerDown={(e) => e.stopPropagation()}
			>
				<div className="flex flex-col gap-[2px] p-[2px]">
					<NoteTool />
					<DeleteTool />
				</div>
			</div>
		</>
	);
});

			export function ContextToolbar() {
	return (
			<>
				<ShowContextToolbar />
			</>
			);
}
