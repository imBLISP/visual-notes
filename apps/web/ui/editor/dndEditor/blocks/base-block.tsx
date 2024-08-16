import { GripVertical } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@repo/utils";
import { useState } from "react";
import { Block } from "@/lib/types"
import { useSortable } from "@dnd-kit/sortable";

// props
interface EditorBlockProps {
    blockId: string,
    allBlocks: Block[],
    activeId: string,
    clone: Boolean,
    children: React.ReactNode
}

// Component
export default function BaseBlock({ blockId, allBlocks, activeId, clone = false, children }: EditorBlockProps) {
    // hovering will be used for opacity transition
    const [hovering, setHovering] = useState(false);
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: blockId,
        animateLayoutChanges: always,
    });

    return (
        <>
            <div
                ref={setNodeRef}
                style={{
                    transition,
                    transform: clone ? CSS.Translate.toString(transform) : "",
                }}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
            >
                <div>
                    <div>
                        <GripVertical
                            size={15}
                            style={{ outlineStyle: "none" }}
                            {...listeners}
                            {...attributes}
                        />
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}

function always() {
    return true;
}
