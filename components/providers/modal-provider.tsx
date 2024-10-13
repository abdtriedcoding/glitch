"use client";

import { useEffect, useState } from "react";
import { AddServerModal } from "@/components/modals/add-server-modal";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return <AddServerModal />;
}
