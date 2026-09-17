import Link from "next/link";
import Logo from "./Logo";
import { nav, site, whatsappLink } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:grid-cols-[1.4fr_1fr_1fr] md:px-10">
        <div className="max-w-sm">
          <Logo white className="w-44" />
          <p className="mt-8 text-sm leading-relaxed text-paper/60">
            Revenda autorizada Simonetto Móveis Planejados em Guarapuava. Projetos residenciais e
            corporativos feitos sob medida, milímetro a milímetro.
          </p>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-gold">Navegação</p>
          <ul className="mt-6 space-y-3 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-paper/70 transition-colors hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-gold">Showroom</p>
          <address className="mt-6 space-y-3 text-sm not-italic text-paper/70">
            <a href={site.mapsLink} target="_blank" rel="noopener noreferrer" className="block hover:text-paper">
              {site.address.street}
              <br />
              {site.address.district}, {site.address.city} - {site.address.state}
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="block hover:text-paper">
              WhatsApp {site.whatsapp}
            </a>
            <a href={`tel:+55${site.phone.replace(/\D/g, "")}`} className="block hover:text-paper">
              Telefone {site.phone}
            </a>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="block hover:text-paper">
              {site.instagramHandle}
            </a>
          </address>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-paper/40 md:flex-row md:justify-between md:px-10">
          <p>
            © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
          </p>
          <a href={site.officialSite} target="_blank" rel="noopener noreferrer" className="hover:text-paper/70">
            simonetto.com.br
          </a>
        </div>
      </div>
    </footer>
  );
}
