import { Workspace } from "@/lib/types";
import { fetcher } from "@repo/utils";
import useSWR from "swr";

export default function useWorkspaces() {
  const { data: workspaces, error } = useSWR<Workspace[]>(
    "/api/workspaces",
    fetcher,
    {
      dedupingInterval: 30000,
    }
  );

  return {
    workspaces,
    error,
    loading: !workspaces && !error,
  };
}
