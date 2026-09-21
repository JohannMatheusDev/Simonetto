# Tour em vídeo da home

A home abre com a logo, as "portas" se abrem e aparece a fachada. Conforme a pessoa rola a página, o vídeo avança como um drone percorrendo o showroom.

Tecnicamente o vídeo não é tocado como `<video>`: ele vira uma sequência de imagens WebP desenhadas num `<canvas>` de acordo com o scroll (GSAP ScrollTrigger + Lenis). É o que deixa o "scrub" liso em qualquer navegador, inclusive iPhone.

Enquanto não existir vídeo, o tour usa as fotos reais da loja com zoom e troca por capítulo.

## Percurso do drone

Logo da fachada (câmera se afastando) → entra pelas portas → hall → passagem junto às vitrines → sala e jantar → cozinha (final).

São 4 cenas, cerca de 30 segundos no total. Salas de reunião, corredor dos materiais, escada, segundo andar e quarto ficaram de fora desta versão; as fotos e o roteiro deles estão guardados e dá para emendar depois, sem refazer o que já estiver pronto.

### Fotos de referência

| Foto | O que mostra | Uso |
| ---- | ------------ | --- |
| Logo | Logo da fachada bem de perto (tirar) | Primeiro frame da cena 1 |
| Fachada | Fachada inteira limpa (passo 1) | Fim da cena 1, início da cena 2 |
| Hall | Hall com parede ripada, logo e sofá curvo | Fim da cena 2, início da cena 3 |
| Foto 1 (IMG 3947) | Lado do hall, passagem junto às vitrines | Referência da cena 3 |
| Foto 2 | Sala, jantar e cozinha | Fim da cena 3, início da cena 4 |
| Cozinha | Ilha com banquetas verdes (`foto6.jpg` ou uma nova) | Último frame do vídeo |

### Capítulos do site (`lib/tour.ts`)

| Capítulo | Cena |
| -------- | ---- |
| 1 · Milimetricamente você | 1 |
| 2 · O showroom | 2 |
| 3 · Salas & living | 3 |
| 4 · Cozinhas & gourmet | 4 |
| 5 · Seu projeto (chamada para visita) | fim da cena 4 |

## Passo 1 — preparar as imagens

As fotos do celular são verticais e o vídeo do site é horizontal (16:9). Antes de gerar o vídeo, passe cada foto usada como frame por um editor de imagem com IA:

```text
Expand this vertical photo into a horizontal 16:9 image, extending the room naturally on both sides with the same architecture, materials, lighting and perspective. Keep everything that already exists exactly the same. Remove clutter and personal items: laptops, backpacks, bags, boxes, cables, plastic bags, exit signs and security cameras. Make the space spotless and styled like a luxury interior magazine shoot, all lights on, vertical lines perfectly straight. Photorealistic, high detail.
```

Para a fachada inteira, use a `foto0.png` (print do Street View, que não pode ir para o site) como base:

```text
Edit this photo into a clean, professional architectural photograph of the same building. Keep the exact architecture, proportions, materials and the "Simonetto" sign unchanged. Remove the car, the people and any watermark; clean the paved parking lot. Correct the perspective so vertical lines are straight, camera at eye level, centered on the glass entrance. Golden hour light with soft warm sun from the left, clear sky with a subtle gradient, the logo letters softly backlit, warm interior lights glowing behind the glass and sheer white curtains. Photorealistic, high detail, 16:9.
```

## Prompts de vídeo

Gere cada cena separadamente (6 a 8 s cada), em 16:9, 1080p ou mais, **sem áudio**, numa ferramenta com primeiro e último frame. O último frame de uma cena é o primeiro da próxima, então as 4 cenas se encaixam num voo contínuo.

O drone nunca aparece: quem se move é a câmera. Os prompts falam sempre em "the camera" e proíbem drone, hélices, sombra e reflexo dele nos vidros.

### Qual IA usar (pesquisa de setembro de 2026)

1. **Gemini Omni Flash** (Google), no app Gemini ou no Flow: primeiro lugar no ranking de imagem para vídeo sem áudio da Artificial Analysis, com primeiro e último frame, extensão de clipe e saída em 16:9 até 4K (com upscale).
2. **Seedance 2.5** (ByteDance), no Dreamina/CapCut: clipes de até 30 s em 4K e até 50 imagens de referência, o que ajuda a manter a loja fiel. Tem créditos grátis diários. Confirme no app se o modo primeiro e último frame está liberado para o 2.5.
3. **MiniMax H3** (Hailuo): 2K nativo a 24 fps, primeiro e último frame, clipes de 4 a 15 s.

Evite o Sora 2, que está sendo descontinuado. Veo 3.1 e Kling 3.0 ainda funcionam, mas ficaram atrás no ranking atual. Antes de gerar tudo, teste a cena mais difícil (a da entrada, que atravessa o vidro) nas 2 ou 3 primeiras opções e fique com a que menos deformar móveis e vidros.

Para extrair o último frame de um clipe:

```bash
ffmpeg -sseof -0.1 -i cena1.mp4 -frames:v 1 cena1-ultimo-frame.png
```

### Prompt completo (voo inteiro)

Use em ferramentas que geram vídeos longos ou têm a função de estender o clipe. Se a ferramenta gerar só de 5 a 10 s ou tiver limite de caracteres, use os prompts por cena.

```text
A single continuous, photorealistic first-person POV shot of a high-end planned-furniture showroom in southern Brazil, seen entirely through the camera of a cinematic FPV drone and filmed as one uninterrupted take. The drone itself is never shown: the viewer only sees what its camera sees, with no drone, propellers, shadow or reflection of it anywhere in the frame. The camera starts on the logo of the facade, pulls back to reveal the building, flies in through the front doors, crosses the entrance hall and the living and dining area, and ends in the kitchen. Total duration about 30 seconds.

CAMERA RULES
The camera moves exactly like a gimbal-stabilized cinema FPV drone camera: smooth, precise and calm. The only change of direction happens at the very beginning, when the pull-back from the logo eases seamlessly into a forward glide; from then on the forward speed is perfectly constant. Gentle wide curves through doorways, minimal banking, no roll, no sudden turns, no cuts, no transitions, no shaking. Outside it starts at the height of the logo (about 6 m) and descends to eye level (1.5 m) before the doors; inside it stays at eye level. Natural 20-24mm lens look, no fisheye distortion.

TIMELINE
00:00-00:06 LOGO AND PULL-BACK. Golden hour, clear sky with a soft warm gradient. Tight, centered close-up of the dark metal "Simonetto" logo, softly backlit, on a wall of light gray concrete-look panels in an irregular vertical pattern. The camera pulls back and descends, revealing the full two-story facade: the gray paneled volume on the left, a slim black steel fin, and on the right a black speckled granite top band, white horizontal bands, a ribbon of dark-framed upper windows, a terracotta orange fascia with small warm downlights and a full-height glass storefront with black frames and sheer white curtains glowing with warm light. Black planters, small trees and ornamental grasses line a paved parking lot.

00:06-00:11 INTO THE STORE. The pull-back eases into a forward glide. The camera descends to eye level, passes under the terracotta canopy and flies straight through the glass sliding doors as they glide open.

00:11-00:17 ENTRANCE HALL. A bright reception hall: curved floor-to-ceiling oak veneer walls, a white fluted wall with a small black "Simonetto" logo, a rounded white boucle loveseat, a round white coffee table on a round gray rug, nesting side tables and a tall vase of dried pampas grass. The camera curves right along the curved oak wall into a bright passage beside the full-height storefront windows with black frames and long linen sheer curtains, soft bright daylight outside.

00:17-00:24 LIVING AND DINING. The passage opens into a large integrated space under an oak veneer drop ceiling with a glowing warm LED cove and a perforated backlit grid panel. In the foreground, a light gray textured rug, a white modular sofa and an organic walnut coffee table with pastel ceramic vases. Beyond, an organic dark bronze dining table on two cylindrical pedestals, surrounded by six cognac leather armchairs with walnut legs, with brass candle holders on top and two glowing white disc pendant lights above. The camera glides past the sofa toward the dining table.

00:24-00:30 KITCHEN AND FINAL FRAME. Past the dining table, a designer kitchen: tall light taupe handleless cabinets, graphite upper cabinets, a black stone backsplash, a dark island with a black countertop and olive green upholstered bar stools, an oven tower inside a warmly backlit oak niche with white tableware, tall black-framed glass cabinets with vertical LED lights and a dark gray wall with a lit bar niche. The camera arcs gently around the island, eases to a stop only in the last second and holds a centered, perfectly still final frame.

LIGHTING AND COLOR
Golden-hour daylight outside. Inside, soft natural daylight through sheer curtains mixed with warm 3000K LED coves, backlit niches, glowing pendants and recessed downlights. Consistent exposure and white balance from start to end, no flicker. Premium warm-neutral grade: light greige, oak and walnut wood, white, matte black, cognac leather and olive green accents. Realistic reflections on glass and stone; crisp wood grain, boucle, leather and fluted textures.

TECHNICAL AND CLEANLINESS
Photorealistic architectural cinematography, 16:9, 4K or 1080p, 24 fps, no audio. Every space is spotless and styled like a magazine shoot: no people, no personal items, no laptops, bags, boxes or plastic bags, no exit signs, no security cameras. No on-screen text, captions or watermarks. The drone is never visible, and no camera or drone is reflected in glass, mirrors or glossy surfaces. The "Simonetto" signs, furniture, walls and glass stay sharp, stable and undistorted throughout.
```

### Estilo (cole no final de cada prompt por cena)

```text
First-person POV camera move, as if filmed by an invisible gimbal-stabilized FPV drone that never appears in frame, smooth constant speed, gentle wide curves, minimal banking, no roll, no cuts, no shake. Photorealistic architectural cinematography, natural daylight mixed with warm 3000K LED lighting, consistent exposure with no flicker, warm-neutral premium color grade, sharp textures, 24 fps, 16:9. Spotless styled spaces, no people, no personal items, no text, no watermarks.
```

### Negative prompt (se a ferramenta tiver esse campo)

```text
people, humans, hands, animals, moving cars, text, captions, watermark, distorted logo, warped furniture, morphing objects, melting geometry, bending glass, flicker, strobing lights, camera shake, handheld wobble, fast motion, speed ramp, cuts, transitions, fisheye distortion, heavy motion blur, clutter, laptop, backpack, plastic bags, boxes, exit signs, security cameras, visible drone, quadcopter, propellers, drone shadow, drone or camera reflection in glass or mirrors, low resolution
```

### Cena 1 · Logo → fachada

Primeiro frame: logo de perto. Último frame: fachada inteira limpa.

```text
Tight, centered close-up of the dark metal "Simonetto" logo, softly backlit at golden hour, mounted on a wall of light gray concrete-look panels in an irregular vertical pattern. The camera smoothly pulls back and descends in one continuous move, revealing the full two-story facade of a modern furniture showroom: a slim black steel fin, a black speckled granite top band, white horizontal bands, a ribbon of dark-framed upper windows, a terracotta orange fascia with small warm downlights and a full-height glass storefront with sheer white curtains glowing with warm light, with black planters and ornamental grasses along a paved parking lot. It ends wide and centered on the building. The logo and architecture stay perfectly sharp and undistorted.
```

### Cena 2 · Fachada → portas → hall

Primeiro frame: fachada inteira limpa. Último frame: foto do hall.

```text
Starting wide in front of the facade, the camera glides forward and descends to eye level, passes under the terracotta orange canopy and flies straight through glass sliding doors with slim black frames as they glide open, entering a bright reception hall: curved floor-to-ceiling oak veneer walls with fine grooves, a central white fluted wall with a small black "Simonetto" logo, a rounded white boucle loveseat, a round white drum coffee table on a round light gray rug, a tall vase of dried pampas grass and a black metal shelf niche with trailing green plants. It settles into a centered view of the logo wall. The logo, furniture and wall panels stay sharp and undistorted.
```

### Cena 3 · Hall → vitrines → sala e jantar

Primeiro frame: foto do hall. Último frame: foto 2.

```text
Starting in the reception hall, the camera curves right along the curved oak veneer wall and glides into a bright passage beside full-height storefront windows with black frames and long linen sheer curtains, soft bright daylight outside, passing a round gray rug and small nesting side tables. The passage opens into a large integrated living and dining space under an oak veneer drop ceiling with a glowing warm LED cove and a perforated backlit grid panel: a light gray textured rug, a white modular sofa, an organic walnut coffee table with pastel ceramic vases, and an organic dark bronze dining table with six cognac leather armchairs and brass candle holders under two glowing white disc pendants, with the kitchen visible beyond.
```

### Cena 4 · Jantar → cozinha (final)

Primeiro frame: foto 2. Último frame: foto da cozinha.

```text
The camera glides past the organic dark bronze dining table with cognac leather armchairs and approaches a designer kitchen: tall light taupe handleless cabinets with a warm LED line along the ceiling, a recessed block of dark graphite upper cabinets over a black stone backsplash, a dark island with a black countertop and four olive green upholstered bar stools with thin black metal legs, an oven tower inside a warmly backlit oak niche with white tableware, tall black-framed glass cabinets with vertical LED lights and an oak ceiling with a perforated backlit square grid panel above. The camera arcs gently around the island, eases to a stop only in the last second and holds a centered, perfectly still final frame.
```

## Dicas para um resultado bom no scroll

- **Velocidade constante é o mais importante.** No site, quem controla o tempo é o scroll; acelerações e cortes no vídeo parecem "pulos".
- **Sem pessoas** (o guia da marca também recomenda ambientes sem pessoas) e **sem texto na tela**. Os textos do site entram por cima.
- Arrume os ambientes antes de fotografar de novo, ou limpe as fotos no passo 1. Tudo que aparece na foto a IA tende a manter.
- Gere algumas variações de cada cena e escolha a que tiver menos "derretimento" de móveis e vidros.
- Opcional: gere também versões verticais 9:16 para o celular usando as fotos originais. Sem elas, o script faz um recorte central do vídeo horizontal.

## Juntar as cenas e colocar no site

1. Junte as 4 cenas em sequência, **sem transições**, no CapCut, DaVinci ou Premiere. Exporte em 1920x1080, 24 fps, H.264.
2. Salve em `videos/tour.mp4` (a pasta `videos/` é ignorada pelo git).
3. Rode:

   ```bash
   npm run tour:frames -- videos/tour.mp4 --frames 300
   # com versão vertical:
   npm run tour:frames -- videos/tour.mp4 --mobile videos/tour-vertical.mp4 --frames 300
   ```

   O script gera `public/tour/desktop` e `public/tour/mobile` e atualiza `lib/tour-manifest.json`. A home passa a usar o vídeo automaticamente.

| Opção | Padrão | O que faz |
| ----- | ------ | --------- |
| `--frames` | 300 | Frames do desktop (mais frames = mais fluido e mais pesado) |
| `--mobile-frames` | 180 | Frames do celular |
| `--width` / `--mobile-width` | 1920 / 720 | Largura das imagens |
| `--quality` | 72 | Qualidade do WebP (0–100) |
| `--mobile <arquivo>` | — | Vídeo vertical próprio para o celular |
| `--no-mobile` | — | Não gera versão de celular |

Como referência, 300 frames em 1920px ficam em torno de 20–30 MB no total. O carregamento é progressivo: o tour começa a funcionar com cerca de 1/8 dos frames e fica mais fluido enquanto o resto baixa.

## Ajustar os capítulos ao vídeo

Em `lib/tour.ts`, cada capítulo tem `start` e `end` (0 a 1 do scroll). Com 4 cenas de mesma duração, cada cena ocupa 25% do scroll: cena 1 de 0 a 0,25; cena 2 de 0,25 a 0,5; cena 3 de 0,5 a 0,75; cena 4 de 0,75 a 1. O capítulo da cozinha e o da chamada para visita dividem a cena 4. Se as durações saírem diferentes, calcule `start = duração das cenas anteriores / duração total`.

`TOUR_SCROLL_SCREENS` define quantas alturas de tela o tour dura (padrão 6).
