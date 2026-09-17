"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import Logo from "./Logo";
import { nav, site } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [overHero, setOverHero] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Header transparente enquanto estiver sobre o hero escuro da página ([data-hero])
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      setOverHero(hero ? hero.getBoundingClientRect().bottom > 80 : false);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  const toggleMenu = (open: boolean) => {
    setMenuOpen(open);
    if (open) lenis?.stop();
    else lenis?.start();
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const dark = overHero || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow] duration-500 ${
        dark
          ? "bg-linear-to-b from-ink/50 to-transparent text-paper"
          : "bg-paper/90 text-ink shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
        <Link href="/" onClick={() => toggleMenu(false)} aria-label={`${site.name} — início`}>
          <Logo white={dark} eager className="w-36 transition-[filter] duration-500 md:w-44" />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative py-2 text-[11px] font-medium uppercase tracking-[0.22em] transition-opacity hover:opacity-100 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-gold after:transition-transform after:duration-500 ${
                isActive(item.href) ? "opacity-100 after:scale-x-100" : "opacity-70 after:scale-x-0 hover:after:scale-x-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contato"
            className="rounded-full bg-gold px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold-light"
          >
            Agendar visita
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => toggleMenu(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          className="relative z-10 flex size-11 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`h-px w-6 bg-current transition-transform duration-300 ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-current transition-transform duration-300 ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      <div
        className={`fixed inset-0 -z-10 flex flex-col justify-between bg-ink px-6 pb-10 pt-28 text-paper transition-opacity duration-500 md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => toggleMenu(false)}
              className={`text-3xl font-light ${isActive(item.href) ? "text-gold" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="space-y-1 text-sm text-paper/60">
          <p>{site.address.street}</p>
          <p>
            {site.address.city} - {site.address.state}
          </p>
          <p>{site.whatsapp}</p>
        </div>
      </div>
    </header>
  );
}
