import {NextRequest} from "next/server"
import {parse} from "./utils/parse"

export default async function AppMiddleware(req: NextRequest) {
  const { path, fullPath, searchParamsString } = parse(req);
}