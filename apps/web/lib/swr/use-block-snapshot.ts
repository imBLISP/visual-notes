
import { Block } from "@/lib/zod";
import { fetcher } from "@repo/utils";
import useSWR from "swr";

export default function useBlockSnapshot(blockId: string | null) {

    const { data, error, mutate } = useSWR<{ snapshot: Block['snapshot'] }>(
        blockId ? `/api/blocks/${blockId}/snapshot` : null,
        fetcher,
        {
            dedupingInterval: 30000,
            onSuccess: (data: { snapshot: Block['snapshot'] }) => {
                console.log("@useBlockSnapshot: onSuccess", data)
                return data;
            }
        }
    );

    return {
        snapshot: data?.snapshot,
        error,
        loading: !data?.snapshot && !error,
        mutate,
    };
}