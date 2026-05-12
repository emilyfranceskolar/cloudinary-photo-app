"use client";

import { useEffect } from "next/navigation";
import { useRouter } from "react";

export function ForceRefresh() {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  });

  return <></>;
}
