import { generateReactHelpers } from "@uploadthing/react";

import type { OurFileRouter } from "../../app/(api)/api/uploadthing/core";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
