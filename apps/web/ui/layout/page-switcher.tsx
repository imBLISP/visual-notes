"use client";

import { Popover, PopoverTrigger, PopoverContent, Button } from "@repo/ui";
import useWorkspacePages from "@/lib/swr/use-pages";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import Link from "next/link";
import { cn } from "@repo/utils";

export default function PageSwitcher() {
  const { slug } = useParams() as { slug: string };

  const { pages } = useWorkspacePages(slug);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const selected = useMemo(() => {
    const selectedPage = pages?.find(
      (page) => page.id == searchParams.get("page")
    );
    if (slug && pages && selectedPage) {
      return {
        ...selectedPage,
      };
    } else {
      return {
        id: "page_id",
        name: "page_name",
        content: [],
      };
    }
  }, [slug, pages]) as {
    id: string;
    name: string;
    content: string[];
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">{selected.name}</Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-y-4 w-40">
          {pages?.map(({ id, properties }) => (
            <Link
              key={id}
              href={pathname + "?" + createQueryString("page", id)}
            >
              <div
                className={cn(
                  { "bg-neutral-100": selected.id == id },
                  "p-1 rounded-md"
                )}
              >
                {properties.title}
              </div>
            </Link>
          ))}
        </PopoverContent>
      </Popover>
    </>
  );
}
