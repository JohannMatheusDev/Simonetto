// Envio de eventos para a medição. Se a pessoa não aceitou os cookies, ou se não
// existe NEXT_PUBLIC_GA_ID configurado, o gtag nunca é carregado e estas funções não
// fazem nada: por isso ninguém precisa checar consentimento antes de chamar.

type Gtag = (command: "event" | "config" | "js", target: string | Date, params?: Record<string, unknown>) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  window.gtag?.("event", name, params);
}
