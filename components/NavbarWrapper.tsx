"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

/** Routes sur lesquelles le header global ne doit PAS apparaître */
const HIDDEN_ROUTES = ["/fdm-inscription"];

export default function NavbarWrapper() {
  const pathname = usePathname();
  if (HIDDEN_ROUTES.some((r) => pathname.startsWith(r))) return null;
  return <Navbar />;
}
