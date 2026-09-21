"use client";

import { useSyncExternalStore } from "react";
import { readConsent, subscribeConsent, type Consent } from "@/lib/consent";

// No servidor não dá para saber a escolha, então lá o retorno é undefined e só
// depois da hidratação vem o valor real. Quem usa este hook precisa tratar os três
// casos: undefined (ainda não sabemos), null (não escolheu) e a escolha feita.
export function useConsent(): Consent | undefined {
  return useSyncExternalStore(subscribeConsent, readConsent, () => undefined);
}
