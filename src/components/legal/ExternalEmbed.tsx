// TODO: legal review
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { DEFAULT_LEGAL_LOCALE, isLegalLocale } from "@/config/legal";

const notices = {
  uk: "Після натискання сервіс отримає вашу IP-адресу та може використовувати cookies або сховище браузера.",
  // en and pl are machine-drafted.
  en: "After you click, this provider receives your IP address and may use cookies or browser storage.",
  pl: "Po kliknięciu dostawca otrzyma Twój adres IP i może używać plików cookie lub pamięci przeglądarki.",
};

export function ProviderNotice({ provider }: { provider: string }) {
  const segment = usePathname().split("/")[1];
  const locale = isLegalLocale(segment) ? segment : DEFAULT_LEGAL_LOCALE;
  return <p>{provider}. {notices[locale]}</p>;
}

type ExternalEmbedProps = {
  provider: "YouTube" | "Twitch" | "TikTok";
  id: string;
  title: string;
  className?: string;
};

export function ExternalEmbed({ provider, id, title, className }: ExternalEmbedProps) {
  const [src, setSrc] = useState<string>();
  const segment = usePathname().split("/")[1];
  const locale = isLegalLocale(segment) ? segment : DEFAULT_LEGAL_LOCALE;

  function load() {
    const encodedId = encodeURIComponent(id);
    switch (provider) {
      case "YouTube":
        setSrc(`https://www.youtube-nocookie.com/embed/${encodedId}`);
        break;
      case "Twitch": {
        const query = new URLSearchParams({ channel: id, parent: window.location.hostname, autoplay: "false" });
        setSrc(`https://player.twitch.tv/?${query}`);
        break;
      }
      case "TikTok":
        setSrc(`https://www.tiktok.com/player/v1/${encodedId}`);
        break;
    }
  }

  if (src) {
    return (
      <iframe className={className} src={src} title={title}
        referrerPolicy="strict-origin-when-cross-origin"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
    );
  }

  return (
    <div>
      <ProviderNotice provider={provider} />
      <button type="button" onClick={load}>
        {locale === "en" ? "Load" : locale === "pl" ? "Wczytaj" : "Завантажити"} {provider}
        <span className="sr-only"> — {title}</span>
      </button>
    </div>
  );
}
