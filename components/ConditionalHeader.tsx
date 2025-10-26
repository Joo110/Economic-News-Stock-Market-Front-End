// components/ConditionalHeader.tsx
'use client';

import { usePathname } from "next/navigation";
import HeaderWrapper from "@/components/HeaderWrapper";

export default function ConditionalHeader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideHeader = pathname.startsWith("/login") || pathname.startsWith("/Signup");

  return hideHeader ? <>{children}</> : <HeaderWrapper>{children}</HeaderWrapper>;
}