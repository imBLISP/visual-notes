import { db } from "@/lib/drizzle";
import {blocksTable} from "@/lib/schema";
import { createClient } from "@/lib/supabase";

export async function getWorkspaces(): Promise<
  Array<{
    id: number;
    type: string;
  }>
> {
  return db.select().from(blocksTable);
}

export default async function WorkspaceSwitcher() {
  // const supabase = createClient();
  // const { data: notes } = await supabase.from("Blocks").select();
  // console.log(notes);

  const data = await getWorkspaces();
  console.log(data)

  return (
    <div>
      {/* <pre>{JSON.stringify(notes, null, 2)}</pre> */}
    </div>
  );
}
