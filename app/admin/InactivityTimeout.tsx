"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase-browser";

const INACTIVITY_LIMIT = 5 * 60 * 1000;

export default function InactivityTimeout() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    let timeoutId: ReturnType<typeof setTimeout>;
    let loggingOut = false;

    function resetTimer() {
      if (loggingOut) return;

      clearTimeout(timeoutId);

      timeoutId = setTimeout(async () => {
        if (loggingOut) return;
        loggingOut = true;

        await supabase.auth.signOut();

        router.replace("/login?reason=timeout");
        router.refresh();
      }, INACTIVITY_LIMIT);
    }

    const events = [
      "mousedown",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer, { passive: true });
    });

    resetTimer();

    return () => {
      clearTimeout(timeoutId);

      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [router]);

  return null;
}
