# Simonetto Guarapuava

Site do showroom Simonetto Móveis Planejados em Guarapuava-PR. Next.js 16 (App Router), Tailwind CSS 4, GSAP + ScrollTrigger e Lenis.

```bash
npm run dev          # desenvolvimento em http://localhost:3000
npm run build        # build de produção
npm run lint
npm run tour:frames -- videos/tour.mp4   # converte o vídeo do tour em frames
```

## Páginas

| Rota | Conteúdo |
| ---- | -------- |
| `/` | Intro com a logo, tour da loja controlado pelo scroll, ambientes, história, blog e CTA |
| `/quem-somos` | História oficial da Simonetto e quem está à frente da loja de Guarapuava |
| `/blog` e `/blog/[slug]` | Artigos sobre por que investir em móveis planejados |
| `/contato` | Formulário que abre o WhatsApp, canais de atendimento e mapa |

## Onde editar

- `lib/site.ts`: endereço, telefones, WhatsApp, e-mail, horário, números da marca e equipe.
- `lib/posts.ts`: artigos do blog.
- `lib/tour.ts`: textos e tempos dos capítulos do tour.
- `docs/tour-video.md`: roteiro, prompts para IA de vídeo e como colocar o vídeo no site.

Antes de publicar, revise os itens marcados com `TODO` em `lib/site.ts` (domínio, e-mail, horário e dados da equipe).
