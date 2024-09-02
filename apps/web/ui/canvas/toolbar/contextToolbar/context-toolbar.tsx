import { DefaultSizeStyle, track, useEditor } from "@tldraw/tldraw";
import { NoteTool } from "@/ui/canvas/toolbar/contextToolbar/items/note-tool"
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect } from "react";


const ShowContextToolbar = track(() => {
	const editor = useEditor();
	const selectedShapes = editor.getSelectedShapes();
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const blockId = selectedShapes[0]?.meta.id;

	useEffect(() => {
		const params = new URLSearchParams(searchParams);
		if (blockId) {
			params.set("blockId", blockId);
		}
		else {
			params.delete("blockId");
		}
		router.replace(`${pathname}?${params.toString()}`);
	}, [selectedShapes, router, pathname, searchParams, blockId]);

	if (!selectedShapes || selectedShapes.length > 1 || selectedShapes.length === 0) {
		return null;
	}

	return (
		<div
			className="absolute pointer-events-auto left-[20px] top-[300px] rounded-sm border bg-white"
			onPointerDown={(e) => e.stopPropagation()}
		>
			<div className="flex flex-col gap-[2px] p-[2px]">
				<NoteTool />
			</div>
		</div>
	);
});

export function ContextToolbar() {
	return (
		<>
			<ShowContextToolbar />
		</>
	);
}
