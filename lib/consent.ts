// Escolha do visitante sobre cookies. Fica no localStorage do navegador porque é
// preferência de quem está navegando, não dado nosso: nada disso vai para servidor.
// O evento existe para o banner, o mapa e a medição reagirem no mesmo instante da
// escolha; sem ele o visitante teria que recarregar a página para o mapa aparecer.

export const CONSENT_KEY = "simonetto:cookies";
export const CONSENT_EVENT = "simonetto:consent";

export type Consent = "accepted" | "declined" | null;

export function readConsent(): Consent {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    // Janela anônima ou navegador com armazenamento bloqueado: trata como sem escolha
    return null;
  }
}

export function writeConsent(value: Exclude<Consent, null>) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {}
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

export function subscribeConsent(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  // "storage" cobre a escolha feita em outra aba aberta do site
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}
