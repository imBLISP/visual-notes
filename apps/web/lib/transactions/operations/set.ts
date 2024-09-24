import { Operation } from "@/lib/zod";

export function set(
  data: any, 
  destinationId: string, 
  path: string[] = [],
  table: "blocks" | "workspaces",
): Operation {
  return {
    args: { ...data },
    path: path,
    command: "set",
    pointer: {
      id: destinationId,
      table: table,
    },
  };
}
