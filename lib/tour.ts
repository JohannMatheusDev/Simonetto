import manifest from "./tour-manifest.json";

// Sequência de frames gerada por `npm run tour:frames` (veja docs/tour-video.md).
// Enquanto o manifest estiver vazio, o tour usa as fotos reais da loja como fallback.
export type TourSource = {
  path: string;
  count: number;
  width: number;
  height: number;
  ext: string;
};

export const tourManifest = manifest as {
  desktop: TourSource | null;
  mobile: TourSource | null;
};

export const hasTourFrames = Boolean(tourManifest.desktop?.count);

export function frameUrl(source: TourSource, index: number) {
  return `${source.path}/${String(index + 1).padStart(4, "0")}.${source.ext}`;
}

// Quanto o usuário precisa rolar para percorrer o tour inteiro (em alturas de tela)
export const TOUR_SCROLL_SCREENS = 6;

export type TourChapter = {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  // Trecho do scroll (0 a 1) em que o capítulo aparece. Ajuste para bater com as cenas do vídeo.
  start: number;
  end: number;
  align: "left" | "right";
  // Foto exibida enquanto os frames do vídeo não existem
  fallbackImage: string;
  fallbackPosition?: string;
};

// Um capítulo por cena do vídeo (shots 1 a 5 em docs/tour-video.md)
export const tourChapters: TourChapter[] = [
  {
    id: "fachada",
    eyebrow: "Simonetto Guarapuava",
    title: "Milimetricamente *você.*",
    text: "Bem-vindo ao nosso showroom. Role a página e faça um passeio pela loja.",
    start: 0,
    end: 0.18,
    align: "left",
    fallbackImage: "/images/loja/fachada.jpg",
    fallbackPosition: "50% 30%",
  },
  {
    id: "entrada",
    eyebrow: "O showroom",
    title: "Ambientes completos para *sentir* o projeto",
    text: "Na Rua Marechal Floriano Peixoto, 1861, cada espaço foi montado para você ver, tocar e imaginar a sua casa.",
    start: 0.2,
    end: 0.38,
    align: "right",
    fallbackImage: "/images/loja/living-cozinha.jpg",
  },
  {
    id: "living",
    eyebrow: "Salas & living",
    title: "Painéis, nichos e luz *sob medida*",
    text: "Marcenaria que organiza, integra e valoriza o ambiente onde a vida acontece.",
    start: 0.4,
    end: 0.58,
    align: "left",
    fallbackImage: "/images/loja/living.jpg",
  },
  {
    id: "cozinha",
    eyebrow: "Cozinhas & gourmet",
    title: "Cada milímetro pensado para a sua *rotina*",
    text: "Ilhas, torres quentes, adegas e armários planejados para quem recebe e para quem cozinha todos os dias.",
    start: 0.6,
    end: 0.78,
    align: "right",
    fallbackImage: "/images/loja/cozinha-ilha.jpg",
  },
  {
    id: "projeto",
    eyebrow: "Seu projeto",
    title: "Vamos desenhar o *seu* ambiente?",
    text: "Agende uma visita e conheça de perto os acabamentos, materiais e soluções Simonetto.",
    start: 0.8,
    end: 1,
    align: "left",
    fallbackImage: "/images/loja/sala-reuniao.jpg",
  },
];
