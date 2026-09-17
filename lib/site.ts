// Dados da loja usados em todo o site. Revise os itens marcados com TODO antes de publicar.

export const site = {
  name: "Simonetto Guarapuava",
  slogan: "Milimetricamente você",
  description:
    "Showroom Simonetto Móveis Planejados em Guarapuava-PR. Cozinhas, salas, dormitórios e ambientes corporativos projetados sob medida, milímetro a milímetro.",
  // TODO: confirmar o domínio definitivo
  url: "https://simonettoguarapuava.com.br",
  address: {
    street: "Rua Marechal Floriano Peixoto, 1861",
    district: "Centro",
    city: "Guarapuava",
    state: "PR",
    zip: "85010-250",
  },
  phone: "(42) 3304-4379",
  whatsapp: "(42) 99860-4155",
  whatsappNumber: "5542998604155",
  // TODO: confirmar e-mail de atendimento (este é o que consta no site oficial da Simonetto)
  email: "leonardo@silvereng.com.br",
  // TODO: confirmar horário de funcionamento
  hours: "Segunda a sexta, das 8h às 18h",
  instagram: "https://www.instagram.com/simonettoguarapuava",
  instagramHandle: "@simonettoguarapuava",
  officialSite: "https://www.simonetto.com.br",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Simonetto+Guarapuava+Rua+Marechal+Floriano+Peixoto+1861+Guarapuava",
  mapsEmbed:
    "https://www.google.com/maps?q=R.+Mal.+Floriano+Peixoto,+1861+-+Centro,+Guarapuava+-+PR,+85010-250&output=embed",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/quem-somos", label: "Quem somos" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

export function whatsappLink(
  message = "Olá! Vim pelo site e gostaria de agendar uma visita ao showroom da Simonetto Guarapuava.",
) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Números oficiais da marca (simonetto.com.br/conheca-a-empresa)
export const brandNumbers = [
  { value: 40, suffix: " anos", label: "de história no mercado moveleiro" },
  { value: 50, suffix: " mil m²", label: "de parque fabril em Ampére-PR" },
  { value: 80, prefix: "≈", suffix: "", label: "revendas pelo Brasil" },
  { value: 17, suffix: " estados", label: "com presença Simonetto" },
];

// TODO: substituir pelos dados reais de quem está à frente da Simonetto Guarapuava
export const team: { name: string; role: string; bio: string; photo?: string }[] = [
  {
    name: "Nome do responsável",
    role: "Sócio-diretor",
    bio: "Escreva aqui uma breve apresentação: trajetória, o que motivou trazer a Simonetto para Guarapuava e como acompanha cada projeto.",
  },
  {
    name: "Nome do responsável",
    role: "Projetos e atendimento",
    bio: "Apresente quem conduz os projetos: formação, experiência e o cuidado no atendimento do primeiro contato até a montagem.",
  },
];
