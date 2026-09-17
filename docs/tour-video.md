# Tour em vídeo da home

A home abre com a logo, as "portas" se abrem e aparece a fachada. Conforme a pessoa rola a página, o vídeo avança como um drone percorrendo a loja inteira.

Tecnicamente o vídeo não é tocado como `<video>`: ele vira uma sequência de imagens WebP desenhadas num `<canvas>` de acordo com o scroll (GSAP ScrollTrigger + Lenis). É o que deixa o "scrub" liso em qualquer navegador, inclusive iPhone.

Enquanto não existir vídeo, o tour usa as fotos reais da loja com zoom e troca por capítulo.

## Percurso do drone

Logo da fachada (drone se afastando) → entra pelas portas → hall → corredor das vitrines → sala, jantar e cozinha → sala de reunião → corredor dos materiais → escada → segundo andar (expositor iluminado) → quarto (final).

### Fotos de referência

| Foto | O que mostra | Uso |
| ---- | ------------ | --- |
| Logo | Logo da fachada bem de perto (tirar) | Primeiro frame da cena 1 |
| Fachada | Fachada inteira limpa (passo 1) | Fim da cena 1, início da cena 2 |
| Hall | Hall com parede ripada, logo e sofá curvo | Fim da cena 2, início da cena 3 |
| Foto 1 (IMG 3947) | Lado do hall, passagem junto às vitrines | Referência da cena 3 |
| Foto 2 | Sala, jantar e cozinha | Fim da cena 3, início da cena 4 |
| Foto 3 | Portas de vidro da sala de reunião | Referência da cena 4 |
| Fotos 4 e 5 | Sala de reunião por dentro | Fim da cena 4, início da cena 5 |
| Foto 6 | Corredor dos materiais | Referência da cena 5 |
| Foto 7 | Escritório com parede verde | Referência da cena 5 (aparece de relance) |
| Foto 8 | Fim do corredor, aparador com quadro | Referência da cena 5 |
| Foto 9 | Parede de madeira escura ao lado da escada | Referência da cena 5 |
| Fotos 10 e 11 | Patamar da escada | **Não usar** (tem espelho e quadros guardados) |
| Foto 12 | Escada vista de baixo | Fim da cena 5, início da cena 6 |
| Foto 13 | Segundo andar, expositor iluminado | Fim da cena 6, início da cena 7 |
| Foto 14 | Quarto | Último frame do vídeo |

### Capítulos do site (`lib/tour.ts`)

| Capítulo | Cenas |
| -------- | ----- |
| 1 · Milimetricamente você | 1 |
| 2 · O showroom (hall, living e cozinha) | 2 e 3 |
| 3 · Atendimento (sala de reunião e materiais) | 4 e 5 |
| 4 · Segundo andar | 6 |
| 5 · Quarto + chamada para visita | 7 |

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

Gere cada cena separadamente (6 a 8 s cada), em 16:9, 1080p ou mais, **sem áudio**, numa ferramenta com primeiro e último frame. O último frame de uma cena é o primeiro da próxima, então as 7 cenas se encaixam num voo contínuo.

### Qual IA usar (pesquisa de setembro de 2026)

1. **Gemini Omni Flash** (Google), no app Gemini ou no Flow: primeiro lugar no ranking de imagem para vídeo sem áudio da Artificial Analysis, com primeiro e último frame, extensão de clipe e saída em 16:9 até 4K (com upscale).
2. **Seedance 2.5** (ByteDance), no Dreamina/CapCut: clipes de até 30 s em 4K e até 50 imagens de referência, o que ajuda a manter a loja fiel. Tem créditos grátis diários. Confirme no app se o modo primeiro e último frame está liberado para o 2.5.
3. **MiniMax H3** (Hailuo): 2K nativo a 24 fps, primeiro e último frame, clipes de 4 a 15 s.

Evite o Sora 2, que está sendo descontinuado. Veo 3.1 e Kling 3.0 ainda funcionam, mas ficaram atrás no ranking atual. Antes de gerar tudo, teste a cena mais difícil (a da escada) nas 2 ou 3 primeiras opções e fique com a que menos deformar móveis e vidros.

Para extrair o último frame de um clipe:

```bash
ffmpeg -sseof -0.1 -i cena1.mp4 -frames:v 1 cena1-ultimo-frame.png
```

### Prompt completo (voo inteiro)

Use em ferramentas que geram vídeos longos ou têm a função de estender o clipe. Se a ferramenta gerar só de 5 a 10 s ou tiver limite de caracteres, use os prompts por cena.

```text
A single continuous, photorealistic first-person POV shot of a two-story high-end planned-furniture showroom in southern Brazil, seen entirely through the camera of a cinematic FPV drone and filmed as one uninterrupted take. The drone itself is never shown: the viewer only sees what its camera sees, with no drone, propellers, shadow or reflection of it anywhere in the frame. The camera starts on the logo of the facade, pulls back to reveal the building, flies in through the front doors, glides across the whole ground floor, climbs the staircase and ends inside a bedroom on the second floor. Total duration about 60 seconds.

CAMERA RULES
The camera moves exactly like a gimbal-stabilized cinema FPV drone camera: smooth, precise and calm. The only change of direction happens at the very beginning, when the pull-back from the logo eases seamlessly into a forward glide; from then on the forward speed is perfectly constant. Gentle wide curves through doorways and corridors, minimal banking, no roll, no sudden turns, no cuts, no transitions, no shaking. Outside it starts at the height of the logo (about 6 m) and descends to eye level (1.5 m) before the doors; inside it stays at eye level, except while rising along the staircase. Natural 20-24mm lens look, no fisheye distortion.

TIMELINE
00:00-00:05 LOGO AND PULL-BACK. Golden hour, clear sky with a soft warm gradient. Tight, centered close-up of the dark metal "Simonetto" logo, softly backlit, on a wall of light gray concrete-look panels in an irregular vertical pattern. The camera pulls back and descends, revealing the full two-story facade: the gray paneled volume on the left, a slim black steel fin, and on the right a black speckled granite top band, white horizontal bands, a ribbon of dark-framed upper windows, a terracotta orange fascia with small warm downlights and a full-height glass storefront with black frames and sheer white curtains glowing with warm light. Black planters, small trees and ornamental grasses line a paved parking lot.

00:05-00:10 INTO THE STORE. The pull-back eases into a forward glide. The camera descends to eye level, passes under the terracotta canopy and flies straight through the glass sliding doors as they glide open.

00:10-00:15 ENTRANCE HALL. A bright reception hall: curved floor-to-ceiling oak veneer walls, a white fluted wall with a small black "Simonetto" logo, a rounded white boucle loveseat, a round white coffee table on a round gray rug, nesting side tables and a tall vase of dried pampas grass. The camera curves right along the curved oak wall into a bright passage beside the full-height storefront windows with black frames and long linen sheer curtains, soft bright daylight outside.

00:15-00:23 LIVING, DINING AND KITCHEN. The passage opens into a large integrated space under an oak veneer drop ceiling with a glowing warm LED cove and a perforated backlit grid panel. In the foreground, a light gray textured rug, a white modular sofa and an organic walnut coffee table with pastel ceramic vases. Beyond, an organic dark bronze dining table on two cylindrical pedestals, surrounded by six cognac leather armchairs with walnut legs, with brass candle holders on top and two glowing white disc pendant lights above. Behind it, a designer kitchen: tall light taupe handleless cabinets, graphite upper cabinets, a black stone backsplash, a dark island with olive green upholstered bar stools, an oven tower inside a warmly backlit oak niche, tall black glass cabinets and a dark gray wall with a lit bar niche. The camera glides past the dining table and along the island.

00:23-00:30 MEETING ROOM. The camera passes under an oak header and through black steel-framed glass sliding doors with grid mullions into a meeting room: beige paneled walls with thin reveals, a wall-mounted TV, a white rectangular table with four white upholstered swivel armchairs, white glass-front upper cabinets with warm backlit oak interiors holding amber glass vases, a fluted light backsplash with an LED-lit floating shelf, dark taupe shaker lower cabinets with brass knobs and a light oak ceiling box with recessed downlights. The camera circles gently around the table and leaves through the glass doors.

00:30-00:38 MATERIAL LIBRARY CORRIDOR. A long corridor. On the right, an illuminated wall of material samples on angled shelves (cabinet door samples, wood and laminate panels, color chips and edge-band fans) with a warm LED strip at floor level. On the left, black-framed glass sliding doors, through which an office with an olive green wall and a backlit black-framed fluted glass cabinet is briefly visible. Black track spotlights on the ceiling. At the end, greige handleless floor-to-ceiling panels with a hidden flush door, small warm step lights near the floor and a floating curved console with a white quartz top, a framed cream rope relief artwork, a woven lantern and ceramic fish sculptures. The camera turns gently past a tall figured walnut veneer wall toward the foot of the staircase.

00:38-00:46 STAIRCASE. The camera rises smoothly up a straight staircase with light gray porcelain steps, black granite nosings, white metal railings and gray walls, flying toward a walnut slatted wall with a potted olive tree at the top.

00:46-00:53 SECOND FLOOR. At the top, a bright showroom floor with recessed downlights, light porcelain tiles and walnut wall panels. In the center stands a freestanding illuminated aluminum-and-glass display cabinet with LED shelves full of home fragrances, glassware and gift boxes; behind it, walk-in closet systems with glass doors, warm lit interiors, terracotta drawers and a brass mushroom lamp. The camera glides around the display cabinet toward the bedroom.

00:53-01:00 BEDROOM AND FINAL FRAME. A cozy bedroom wrapped in a curved oak veneer shell that flows from the ceiling down into the headboard wall, traced by warm LED light lines. A double bed with a taupe satin quilted comforter, cream and white pillows and a cream cable-knit throw; a black-framed window with a sheer white curtain; a white boucle armchair with a knit throw, a round white ottoman with two cream boxes and an oak tripod floor lamp with a brass shade. The camera slowly approaches the bed, eases to a gentle stop only in the last second and holds a centered, perfectly still final frame.

LIGHTING AND COLOR
Golden-hour daylight outside. Inside, soft natural daylight through sheer curtains mixed with warm 3000K LED coves, backlit niches, glowing pendants and recessed downlights. Consistent exposure and white balance from start to end, no flicker. Premium warm-neutral grade: light greige, oak and walnut wood, white, matte black, cognac leather and olive green accents. Realistic reflections on glass and stone; crisp wood grain, boucle, leather and fluted textures.

TECHNICAL AND CLEANLINESS
Photorealistic architectural cinematography, 16:9, 4K or 1080p, 24 fps, no audio. Every space is spotless and styled like a magazine shoot: no people, no personal items, no laptops, bags, boxes or plastic bags, nothing stored on the stair landing, no exit signs, no security cameras. No on-screen text, captions or watermarks. The drone is never visible, and no camera or drone is reflected in glass, mirrors or glossy surfaces. The "Simonetto" signs, furniture, walls and glass stay sharp, stable and undistorted throughout.
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

### Cena 3 · Hall → vitrines → sala, jantar e cozinha

Primeiro frame: foto do hall. Último frame: foto 2.

```text
Starting in the reception hall, the camera curves right along the curved oak veneer wall and glides into a bright passage beside full-height storefront windows with black frames and long linen sheer curtains, soft bright daylight outside, passing a round gray rug and small nesting side tables. The passage opens into a large integrated living, dining and kitchen space under an oak veneer drop ceiling with a glowing warm LED cove and a perforated backlit grid panel: a light gray textured rug, a white modular sofa, an organic walnut coffee table with pastel ceramic vases, an organic dark bronze dining table with six cognac leather armchairs and brass candle holders under two glowing white disc pendants, and a designer kitchen with taupe handleless cabinets, a black stone backsplash and olive green bar stools at the island.
```

### Cena 4 · Sala e cozinha → sala de reunião

Primeiro frame: foto 2. Último frame: foto 4 ou 5.

```text
The camera glides past the organic dark bronze dining table with cognac leather armchairs and along the dark kitchen island with olive green bar stools, then turns gently toward a pair of black steel-framed glass sliding doors with grid mullions under an oak veneer header. It flies through the open doors into a meeting room: beige paneled walls with thin reveals, a wall-mounted TV, a white rectangular table with four white upholstered swivel armchairs, white glass-front upper cabinets with warm backlit oak interiors holding amber glass vases, a fluted light backsplash with an LED-lit floating shelf, dark taupe shaker lower cabinets with brass knobs and a light oak ceiling box with recessed downlights.
```

### Cena 5 · Sala de reunião → corredor dos materiais → escada

Primeiro frame: foto 4 ou 5. Último frame: foto 12.

```text
The camera circles gently around the meeting table, leaves through the black-framed glass doors and glides down a long corridor: on the right, an illuminated wall of material samples on angled shelves (cabinet door samples, wood and laminate panels, color chips and edge-band fans) with a warm LED strip at floor level; on the left, black-framed glass sliding doors revealing a glimpse of an office with an olive green wall and a backlit fluted glass cabinet; black track spotlights above. At the end it passes greige handleless panels with small warm step lights and a floating curved console with a framed cream rope relief artwork, then turns past a tall figured walnut veneer wall and arrives centered at the foot of a straight staircase with light gray porcelain steps, black granite nosings and white metal railings.
```

### Cena 6 · Escada → segundo andar

Primeiro frame: foto 12. Último frame: foto 13.

```text
Starting at the foot of the staircase, the camera rises smoothly up the steps (light gray porcelain treads, black granite nosings, white metal railings, gray walls) toward a walnut slatted wall with a potted olive tree at the top. It turns gently into a bright second-floor showroom with recessed downlights, light porcelain tiles and walnut wall panels, and glides toward a freestanding illuminated aluminum-and-glass display cabinet with LED shelves full of home fragrances, glassware and gift boxes, with walk-in closet systems with glass doors, warm lit interiors and terracotta drawers behind it. Clean, empty stairs and landing.
```

### Cena 7 · Segundo andar → quarto (final)

Primeiro frame: foto 13. Último frame: foto 14.

```text
The camera glides around the illuminated display cabinet, past glass-door closet systems with warm lit interiors and terracotta drawers, and enters a cozy bedroom wrapped in a curved oak veneer shell that flows from the ceiling down into the headboard wall, traced by warm LED light lines. A double bed with a taupe satin quilted comforter, cream and white pillows and a cream cable-knit throw; a black-framed window with a sheer white curtain and soft daylight; a white boucle armchair with a knit throw, a round white ottoman with two cream boxes and an oak tripod floor lamp with a brass shade. The camera slowly approaches the bed, eases to a gentle stop only in the last second and holds a centered, perfectly still final frame.
```

## Dicas para um resultado bom no scroll

- **Velocidade constante é o mais importante.** No site, quem controla o tempo é o scroll; acelerações e cortes no vídeo parecem "pulos".
- **Sem pessoas** (o guia da marca também recomenda ambientes sem pessoas) e **sem texto na tela**. Os textos do site entram por cima.
- Arrume os ambientes antes de fotografar de novo, ou limpe as fotos no passo 1. Tudo que aparece na foto a IA tende a manter.
- Gere algumas variações de cada cena e escolha a que tiver menos "derretimento" de móveis e vidros.
- Opcional: gere também versões verticais 9:16 para o celular usando as fotos originais. Sem elas, o script faz um recorte central do vídeo horizontal.

## Juntar as cenas e colocar no site

1. Junte as 7 cenas em sequência, **sem transições**, no CapCut, DaVinci ou Premiere. Exporte em 1920x1080, 24 fps, H.264.
2. Salve em `videos/tour.mp4` (a pasta `videos/` é ignorada pelo git).
3. Rode:

   ```bash
   npm run tour:frames -- videos/tour.mp4 --frames 420
   # com versão vertical:
   npm run tour:frames -- videos/tour.mp4 --mobile videos/tour-vertical.mp4 --frames 420
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

Como referência, 420 frames em 1920px ficam em torno de 25–40 MB no total. O carregamento é progressivo: o tour começa a funcionar com cerca de 1/8 dos frames e fica mais fluido enquanto o resto baixa.

## Ajustar os capítulos ao vídeo

Em `lib/tour.ts`, cada capítulo tem `start` e `end` (0 a 1 do scroll). Calcule `start = duração das cenas anteriores / duração total` seguindo a tabela de capítulos acima.

`TOUR_SCROLL_SCREENS` define quantas alturas de tela o tour dura (padrão 6). Com o percurso maior, vale subir para 8 ou 9.
