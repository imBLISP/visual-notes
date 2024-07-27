"use client";

import ModalProvider from "@/ui/modals/provider";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>;
}
