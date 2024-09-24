import { Operation} from "@/lib/zod"

export function update(
  data: any,
  destinationId: string,
  destinationTable: "blocks" | "workspaces",
): Operation {
  return {
    args: { ...data },
    path: [],
    command: "update",
    pointer: {
      id: destinationId,
      table: destinationTable,
    },
  };
}
