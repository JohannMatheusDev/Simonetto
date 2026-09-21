"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import { useConsent } from "./useConsent";

// Medição de visitas. Só carrega depois do "aceitar" e só se existir NEXT_PUBLIC_GA_ID
// no ambiente: enquanto a variável não for definida, o site não chama nada de fora e o
// banner de cookies controla apenas o mapa.
//
// Os cliques de contato são capturados aqui, num ouvinte só, em vez de espalhar onClick
// por cada botão: o link do WhatsApp aparece no header, no rodapé, no tour, no formulário
// e em todo banner de visita, e a conta de leads quebra quando alguém adiciona mais um
// lugar e esquece do evento.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function Analytics() {
  const consent = useConsent();
  const pathname = usePathname();
  const enabled = Boolean(GA_ID) && consent === "accepted";

  useEffect(() => {
    if (!enabled) return;

    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest?.("a");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      if (href.includes("wa.me")) trackEvent("clique_whatsapp", { pagina: pathname });
      else if (href.startsWith("tel:")) trackEvent("clique_telefone", { pagina: pathname });
      else if (href.startsWith("mailto:")) trackEvent("clique_email", { pagina: pathname });
      else if (href.includes("instagram.com")) trackEvent("clique_instagram", { pagina: pathname });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [enabled, pathname]);

  if (!enabled) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
