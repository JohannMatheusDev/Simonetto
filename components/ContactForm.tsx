"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/site";

const environments = [
  "Cozinha",
  "Área gourmet",
  "Sala / living",
  "Dormitório",
  "Closet",
  "Banheiro",
  "Lavanderia",
  "Home office",
  "Corporativo",
];

const fieldClass =
  "w-full border-b border-ink/20 bg-transparent py-3 text-base outline-none transition-colors placeholder:text-mist/70 focus:border-gold";
const labelClass = "text-[11px] font-medium uppercase tracking-[0.25em] text-mist";

// Sem backend: monta a mensagem e abre o WhatsApp da loja já preenchido
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const chosen = data.getAll("ambientes").join(", ");

    const lines = [
      "Olá! Vim pelo site da Simonetto Guarapuava.",
      `Nome: ${data.get("nome")}`,
      `Telefone: ${data.get("telefone")}`,
      data.get("cidade") && `Cidade: ${data.get("cidade")}`,
      chosen && `Ambientes de interesse: ${chosen}`,
      data.get("mensagem") && `Mensagem: ${data.get("mensagem")}`,
    ].filter(Boolean);

    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-10">
      <div className="grid gap-10 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className={labelClass}>Nome*</span>
          <input name="nome" required autoComplete="name" className={fieldClass} placeholder="Seu nome" />
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>WhatsApp*</span>
          <input
            name="telefone"
            required
            type="tel"
            autoComplete="tel"
            className={fieldClass}
            placeholder="(42) 90000-0000"
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className={labelClass}>Cidade</span>
        <input name="cidade" autoComplete="address-level2" className={fieldClass} placeholder="Guarapuava - PR" />
      </label>

      <fieldset>
        <legend className={labelClass}>Ambientes de interesse</legend>
        <div className="mt-5 flex flex-wrap gap-2">
          {environments.map((item) => (
            <label key={item} className="cursor-pointer">
              <input type="checkbox" name="ambientes" value={item} className="peer sr-only" />
              <span className="inline-block rounded-full border border-ink/15 px-4 py-2 text-sm transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:ring-2 peer-focus-visible:ring-gold">
                {item}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="grid gap-2">
        <span className={labelClass}>Mensagem</span>
        <textarea
          name="mensagem"
          rows={4}
          className={`${fieldClass} resize-none`}
          placeholder="Conte um pouco sobre o seu projeto"
        />
      </label>

      <div className="flex flex-col items-start gap-4">
        <button
          type="submit"
          className="rounded-full bg-ink px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-paper transition-colors hover:bg-gold hover:text-ink"
        >
          Enviar pelo WhatsApp
        </button>
        <p className="text-sm text-mist" aria-live="polite">
          {sent
            ? "Abrimos o WhatsApp com a sua mensagem pronta. É só enviar!"
            : "Ao enviar, abriremos o WhatsApp com a sua mensagem já preenchida."}
        </p>
      </div>
    </form>
  );
}
