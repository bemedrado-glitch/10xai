"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type Message = { role: "user" | "assistant"; content: string };

const MAX_USER_TURNS = 10;

export function BernieChat() {
  const t = useTranslations("bernie");

  const GREETING: Message = {
    role: "assistant",
    content: t("greeting"),
  };

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = () => {
      setOpen(true);
      setTimeout(() => inputRef.current?.focus(), 200);
    };
    window.addEventListener("talk-to-bernie", handler);
    return () => window.removeEventListener("talk-to-bernie", handler);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  const userTurnsUsed = messages.filter((m) => m.role === "user").length;
  const turnsRemaining = Math.max(0, MAX_USER_TURNS - userTurnsUsed);
  const limitReached = userTurnsUsed >= MAX_USER_TURNS;

  async function send() {
    const text = input.trim();
    if (!text || sending || limitReached) return;

    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setSending(true);
    setError(null);

    setMessages([...next, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) {
        throw new Error(t("errorOffline", { status: res.status }));
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : t("errorGeneric"));
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {/* Floating launcher */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex h-14 items-center gap-3 rounded-full bg-[var(--color-ink)] pl-3 pr-5 shadow-lg shadow-black/20 transition-all hover:bg-[var(--color-ink-900)] hover:scale-[1.02]"
          aria-label={t("openLabel")}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-gold)] font-display text-lg font-black text-[var(--color-cream)]">
            B
          </span>
          <span className="font-medium text-[var(--color-cream)]">
            {t("label")}
          </span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className="fixed inset-x-2 bottom-2 z-40 flex h-[88vh] max-h-[calc(100vh-1rem)] flex-col overflow-hidden rounded-2xl border border-[var(--color-ink-300)] bg-[var(--color-cream-50)] shadow-2xl md:inset-x-auto md:bottom-6 md:right-6 md:h-[640px] md:max-h-[calc(100vh-3rem)] md:w-[380px] md:max-w-[calc(100vw-3rem)]"
          role="dialog"
          aria-label={`${t("label")} – 10XAI ${t("subtitle")}`}
        >
          {/* Header */}
          <header className="flex items-center justify-between border-b border-[var(--color-ink-300)] bg-[var(--color-ink)] px-4 py-3 text-[var(--color-cream)]">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-gold)] font-display text-base font-black text-[var(--color-cream)]">
                B
              </span>
              <div className="leading-tight">
                <p className="font-display text-sm font-bold">{t("label")}</p>
                <p className="text-xs text-[var(--color-ink-300)]">{t("subtitle")}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded p-1 text-[var(--color-cream)] transition-colors hover:bg-[var(--color-ink-900)]"
              aria-label={t("closeLabel")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </header>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto bg-[var(--color-cream)] px-4 py-4">
            <ul className="space-y-3">
              {messages.map((m, i) => (
                <li key={i} className={m.role === "user" ? "ml-auto max-w-[85%]" : "mr-auto max-w-[90%]"}>
                  <div
                    className={
                      m.role === "user"
                        ? "rounded-2xl rounded-tr-sm bg-[var(--color-ink)] px-4 py-2.5 text-sm text-[var(--color-cream)]"
                        : "rounded-2xl rounded-tl-sm border border-[var(--color-ink-300)] bg-[var(--color-cream-50)] px-4 py-2.5 text-sm text-[var(--color-ink)]"
                    }
                  >
                    {m.content || (
                      <span className="inline-flex gap-1">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--color-ink-500)] [animation-delay:-0.3s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--color-ink-500)] [animation-delay:-0.15s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--color-ink-500)]" />
                      </span>
                    )}
                  </div>
                </li>
              ))}
              {error && (
                <li className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-xs text-red-700">
                  {error}
                </li>
              )}
            </ul>
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="flex items-end gap-2 border-t border-[var(--color-ink-300)] bg-[var(--color-cream-50)] p-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={limitReached ? t("inputPlaceholderLimit") : t("inputPlaceholder")}
              disabled={sending || limitReached}
              className="flex-1 rounded-lg border border-[var(--color-ink-300)] bg-[var(--color-cream)] px-3 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-500)] focus:border-[var(--color-gold)] focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={sending || !input.trim() || limitReached}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-gold)] text-[var(--color-cream)] transition-colors hover:bg-[var(--color-gold-600)] disabled:opacity-40"
              aria-label={t("sendLabel")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
          <p className="border-t border-[var(--color-ink-300)] bg-[var(--color-cream-100)] px-4 py-2 text-[10px] uppercase tracking-widest text-[var(--color-ink-500)]">
            {t("footerLine", { remaining: turnsRemaining, max: MAX_USER_TURNS })}
          </p>
        </div>
      )}
    </>
  );
}
