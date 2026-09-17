// Artigos do blog. Para publicar um novo, adicione um objeto no início da lista.

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  cover: string;
  body: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: "moveis-planejados-valem-a-pena",
    title: "Móveis planejados valem a pena? 7 razões para investir",
    excerpt:
      "Aproveitamento de espaço, durabilidade e um ambiente com a sua identidade: entenda por que o planejado costuma ser a escolha mais inteligente a longo prazo.",
    category: "Investimento",
    date: "2026-09-11",
    cover: "/images/loja/living-cozinha.jpg",
    body: [
      {
        type: "p",
        text: "Na hora de mobiliar a casa, a dúvida aparece para quase todo mundo: vale a pena investir em móveis planejados ou é melhor comprar peças prontas? A resposta depende do seu momento, mas para quem busca aproveitamento de espaço, durabilidade e um ambiente com identidade própria, o planejado costuma ser o investimento mais inteligente. Veja por quê.",
      },
      { type: "h2", text: "1. Cada centímetro passa a trabalhar a seu favor" },
      {
        type: "p",
        text: "Móveis prontos são fabricados em medidas padrão e raramente se encaixam perfeitamente no seu imóvel. Sobram vãos, cantos perdidos e espaços acima dos armários que acumulam poeira. No planejado, o projeto parte das medidas reais do ambiente: colunas, recortes, desníveis e pé-direito deixam de ser problema e viram oportunidade de armazenamento.",
      },
      { type: "h2", text: "2. Um ambiente com a sua identidade" },
      {
        type: "p",
        text: "Cores, padrões de madeira, lacas, vidros, puxadores e iluminação são escolhidos para o seu estilo, e não para o gosto médio do mercado. É por isso que a Simonetto fala em ser “milimetricamente você”: o móvel nasce da sua forma de viver.",
      },
      { type: "h2", text: "3. Funcionalidade pensada para a sua rotina" },
      {
        type: "p",
        text: "Um bom projeto começa com perguntas: quem cozinha, com que frequência, quantas pessoas usam o closet, onde ficam os eletroportáteis? A partir disso, a marcenaria se organiza em torno do seu dia a dia.",
      },
      {
        type: "ul",
        items: [
          "Gavetas profundas para panelas no lugar de portas que escondem tudo no fundo.",
          "Torre quente com forno e micro-ondas na altura certa.",
          "Closet dividido por tipo de peça, com cabideiros, sapateiras e gaveteiros sob medida.",
          "Home office com passagem de fios e iluminação de apoio já previstas.",
        ],
      },
      { type: "h2", text: "4. Qualidade de fabricação e durabilidade" },
      {
        type: "p",
        text: "Móveis planejados de qualidade são produzidos industrialmente, com cortes precisos, chapas de MDF e MDP, fitas de borda bem aplicadas e ferragens como corrediças e dobradiças com amortecimento. Somada a uma montagem feita por equipe especializada, essa combinação resulta em móveis que mantêm o alinhamento e o bom funcionamento por muitos anos.",
      },
      { type: "h2", text: "5. Harmonia entre os ambientes" },
      {
        type: "p",
        text: "Quando cozinha, living e área gourmet são pensados em um mesmo projeto, a casa ganha uma linguagem única. Materiais conversam entre si, alturas se alinham e a integração dos espaços fica natural, algo difícil de alcançar combinando peças de fornecedores diferentes.",
      },
      { type: "h2", text: "6. Valorização do imóvel" },
      {
        type: "p",
        text: "Um imóvel com marcenaria bem projetada e bem executada tende a ser percebido como mais completo e pronto para morar. Seja para vender, alugar ou simplesmente viver melhor, armários e painéis de qualidade somam valor ao patrimônio.",
      },
      { type: "h2", text: "7. Custo-benefício no longo prazo" },
      {
        type: "p",
        text: "O investimento inicial de um planejado é maior que o de peças prontas, mas a conta muda quando se olha para os próximos anos: menos trocas, menos adaptações e muito mais aproveitamento do espaço que você já pagou ao comprar ou construir o imóvel.",
      },
      {
        type: "quote",
        text: "Mais do que mobiliar, um projeto planejado organiza a forma como você vive a sua casa.",
      },
      {
        type: "p",
        text: "Quer entender como isso se aplica ao seu imóvel? Visite o showroom da Simonetto Guarapuava e converse com nossa equipe de projetos.",
      },
    ],
  },
  {
    slug: "planejado-ou-modulado",
    title: "Planejado ou modulado: entenda as diferenças antes de decidir",
    excerpt:
      "Os dois caminhos resolvem necessidades diferentes. Compare medidas, personalização, prazo e investimento para escolher com segurança.",
    category: "Guia",
    date: "2026-09-11",
    cover: "/images/loja/living.jpg",
    body: [
      {
        type: "p",
        text: "Planejados e modulados costumam ser colocados no mesmo balaio, mas são soluções bem diferentes. Entender o que muda entre eles ajuda a alinhar expectativa, orçamento e resultado.",
      },
      { type: "h2", text: "O que são móveis modulados" },
      {
        type: "p",
        text: "Modulados são módulos com medidas pré-definidas que podem ser combinados entre si, como peças de um jogo. Costumam ter entrega mais rápida e investimento menor, mas a variedade de dimensões, cores e acabamentos é limitada. Para completar o ambiente, é comum recorrer a peças de fechamento que preenchem os espaços que sobram.",
      },
      { type: "h2", text: "O que são móveis planejados" },
      {
        type: "p",
        text: "Planejados são desenhados especificamente para o seu ambiente. Cada caixa, porta e prateleira é dimensionada a partir da medição do local e das suas necessidades. O resultado é um conjunto integrado, sem vãos, com liberdade total de composição, acabamentos e soluções internas.",
      },
      { type: "h2", text: "Comparativo rápido" },
      {
        type: "ul",
        items: [
          "Medidas: o modulado segue tamanhos padrão; o planejado é feito sob medida.",
          "Personalização: o modulado oferece poucas combinações; o planejado permite escolher materiais, cores, puxadores, iluminação e acessórios.",
          "Aproveitamento de espaço: o modulado pode deixar vãos; o planejado usa o ambiente de parede a parede e do piso ao teto.",
          "Prazo: o modulado costuma ser entregue mais rápido; o planejado exige etapas de projeto e produção.",
          "Investimento: o modulado é mais acessível no curto prazo; o planejado entrega mais valor e durabilidade ao longo dos anos.",
        ],
      },
      { type: "h2", text: "Quando cada um faz sentido" },
      {
        type: "p",
        text: "O modulado pode atender bem um imóvel temporário ou uma necessidade pontual e urgente. Já para o imóvel onde você pretende morar por muitos anos, para ambientes com medidas fora do padrão ou quando o objetivo é um resultado de alto padrão, o planejado é o caminho mais indicado.",
      },
      {
        type: "p",
        text: "A Simonetto é uma indústria de móveis planejados, com alto nível de personalização em cada projeto. No nosso showroom você pode ver de perto a diferença de acabamento e funcionalidade.",
      },
    ],
  },
  {
    slug: "como-funciona-um-projeto-de-moveis-planejados",
    title: "Do briefing à montagem: como funciona um projeto de planejados",
    excerpt:
      "Conheça as etapas de um projeto de móveis planejados e saiba o que levar para a primeira conversa com a equipe de projetos.",
    category: "Projeto",
    date: "2026-09-11",
    cover: "/images/loja/sala-reuniao.jpg",
    body: [
      {
        type: "p",
        text: "Um projeto de móveis planejados passa por várias etapas até a última porta ser regulada. Saber o que acontece em cada uma deixa o processo mais tranquilo e ajuda você a tomar melhores decisões.",
      },
      { type: "h2", text: "1. Primeira conversa" },
      {
        type: "p",
        text: "É o momento de entender a sua rotina, o estilo que você gosta, quais ambientes serão feitos e qual investimento faz sentido. Quanto mais informação, mais certeiro será o projeto.",
      },
      {
        type: "ul",
        items: [
          "Planta do imóvel ou medidas aproximadas dos ambientes.",
          "Fotos do local, mesmo que ainda em obra.",
          "Referências de ambientes que você gosta.",
          "Lista de eletrodomésticos que precisam ser embutidos.",
        ],
      },
      { type: "h2", text: "2. Medição técnica" },
      {
        type: "p",
        text: "Com o local definido, é feita a medição precisa de paredes, vãos, pontos elétricos e hidráulicos. Idealmente, ela acontece com o piso e o revestimento já instalados, para que o projeto considere as medidas finais.",
      },
      { type: "h2", text: "3. Projeto e apresentação" },
      {
        type: "p",
        text: "A equipe desenvolve o projeto com a distribuição dos móveis, materiais e soluções internas, apresentado em imagens 3D para você visualizar o resultado antes da produção.",
      },
      { type: "h2", text: "4. Ajustes e aprovação" },
      {
        type: "p",
        text: "Você revisa cada detalhe: cores, puxadores, divisões internas, iluminação. Depois dos ajustes, o projeto é aprovado e segue para a produção.",
      },
      { type: "h2", text: "5. Produção na fábrica" },
      {
        type: "p",
        text: "Na fábrica da Simonetto, em Ampére-PR, as peças são produzidas em um parque fabril com mais de 50 mil m² que opera sob os princípios da Indústria 4.0, com automação e processos integrados que garantem precisão milimétrica.",
      },
      { type: "h2", text: "6. Entrega e montagem" },
      {
        type: "p",
        text: "Os móveis chegam ao imóvel e são montados por profissionais especializados, com regulagem final de portas e gavetas. Por fim, o ambiente é entregue pronto para uso.",
      },
      {
        type: "quote",
        text: "Dica: envolva o projeto de marcenaria ainda durante a obra. Assim, tomadas, iluminação e pontos de água já ficam no lugar certo.",
      },
      {
        type: "p",
        text: "Prazos e detalhes de cada etapa variam conforme o tamanho do projeto. Na primeira conversa, nossa equipe explica tudo para o seu caso.",
      },
    ],
  },
  {
    slug: "materiais-de-moveis-planejados",
    title: "MDF, MDP, laca e vidro: guia rápido de materiais",
    excerpt:
      "Conhecer os materiais ajuda a escolher o acabamento certo para cada ambiente. Veja as diferenças e onde cada um se destaca.",
    category: "Materiais",
    date: "2026-09-11",
    cover: "/images/loja/cozinha.jpg",
    body: [
      {
        type: "p",
        text: "A beleza de um móvel planejado aparece no acabamento, mas a durabilidade começa na escolha do material. Conheça os principais usados na marcenaria e onde cada um se destaca.",
      },
      { type: "h2", text: "MDP" },
      {
        type: "p",
        text: "O MDP é formado por partículas de madeira dispostas em camadas, mais finas nas superfícies e mais grossas no miolo. É estável, resistente ao empenamento e segura bem os parafusos, por isso é muito usado em caixas, laterais, prateleiras e portas retas.",
      },
      { type: "h2", text: "MDF" },
      {
        type: "p",
        text: "O MDF é feito de fibras de madeira prensadas, o que gera uma chapa homogênea. Essa uniformidade permite usinagens, frisos, cantos arredondados e pintura, sendo a base ideal para portas com design mais elaborado e para acabamentos em laca.",
      },
      { type: "h2", text: "Laca" },
      {
        type: "p",
        text: "A laca é um acabamento de pintura aplicado sobre o MDF, em versões fosca ou brilhante. Traz um toque sofisticado, com cores sólidas e superfície contínua, e combina bem com cozinhas, salas e dormitórios de linhas minimalistas.",
      },
      { type: "h2", text: "Vidros" },
      {
        type: "p",
        text: "Portas de vidro com perfis metálicos deixam o ambiente mais leve e valorizam o que está exposto. Vidros canelados, reflecta ou fumê são ótimos para cristaleiras, adegas e armários de apoio, principalmente quando combinados com iluminação em LED.",
      },
      { type: "h2", text: "Padrões madeirados" },
      {
        type: "p",
        text: "Os padrões que reproduzem a textura da madeira trazem aconchego e equilibram ambientes com muitos tons neutros. Painéis, forros e nichos em madeirado criam contraste com lacas e superfícies escuras.",
      },
      { type: "h2", text: "Cuidados no dia a dia" },
      {
        type: "ul",
        items: [
          "Limpe com pano macio levemente umedecido e seque em seguida.",
          "Evite produtos abrasivos, solventes e esponjas ásperas.",
          "Não deixe água acumulada em bordas e cantos, principalmente perto da pia.",
          "Regule portas e gavetas sempre que perceber desalinhamentos.",
        ],
      },
      {
        type: "p",
        text: "A Simonetto trabalha com MDF e MDP em diversos padrões, além de lacas e vidros com possibilidades de combinação de cores. No showroom você pode tocar os acabamentos e ver como eles se comportam com a luz.",
      },
    ],
  },
  {
    slug: "cozinha-planejada-decisoes-importantes",
    title: "Cozinha planejada: 7 decisões que fazem diferença no dia a dia",
    excerpt:
      "Da circulação à iluminação, algumas escolhas de projeto transformam a experiência de cozinhar e receber. Veja o que considerar.",
    category: "Cozinhas",
    date: "2026-09-11",
    cover: "/images/loja/cozinha-ilha.jpg",
    body: [
      {
        type: "p",
        text: "A cozinha é um dos ambientes mais usados da casa e um dos que mais se beneficiam de um bom projeto. Estas são as decisões que mais pesam no conforto do dia a dia.",
      },
      { type: "h2", text: "1. Organize o fluxo de trabalho" },
      {
        type: "p",
        text: "Geladeira, pia e cooktop formam o eixo principal da cozinha. Mantê-los próximos, sem obstáculos entre eles, reduz deslocamentos e deixa o preparo das refeições muito mais fluido.",
      },
      { type: "h2", text: "2. Prefira gavetas nos armários inferiores" },
      {
        type: "p",
        text: "Gaveteiros amplos permitem ver e alcançar tudo sem se abaixar para procurar no fundo do armário. São perfeitos para panelas, tampas e potes.",
      },
      { type: "h2", text: "3. Coloque forno e micro-ondas em uma torre quente" },
      {
        type: "p",
        text: "Com os eletros na altura dos olhos, fica mais fácil e seguro acompanhar o preparo e retirar pratos quentes, além de liberar espaço na bancada.",
      },
      { type: "h2", text: "4. Planeje ilha ou península com espaço de circulação" },
      {
        type: "p",
        text: "Ilhas integram a cozinha ao living e criam um ponto de encontro. Para que funcionem bem, reserve uma passagem confortável ao redor, normalmente entre 90 cm e 1,20 m, conforme o uso e o número de pessoas no ambiente.",
      },
      { type: "h2", text: "5. Pense na iluminação junto com a marcenaria" },
      {
        type: "p",
        text: "Perfis de LED sob os armários superiores iluminam a bancada de trabalho, enquanto nichos e cristaleiras iluminados criam atmosfera. Quando previstos no projeto, os pontos de energia ficam escondidos e o acabamento fica impecável.",
      },
      { type: "h2", text: "6. Defina os eletrodomésticos antes do projeto" },
      {
        type: "p",
        text: "Cada modelo tem medidas e exigências de ventilação próprias. Escolher geladeira, cooktop, forno e adega antes garante encaixes precisos e evita adaptações depois.",
      },
      { type: "h2", text: "7. Tenha espaço para os pequenos eletros" },
      {
        type: "p",
        text: "Cafeteira, air fryer e liquidificador podem ganhar um armário de apoio com tomadas internas, mantendo a bancada livre e a cozinha sempre organizada.",
      },
      {
        type: "p",
        text: "No showroom da Simonetto Guarapuava você encontra uma cozinha completa com ilha, torre quente e adega iluminada para experimentar essas soluções na prática.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function readingMinutes(post: Post) {
  const words = post.body
    .flatMap((block) => ("items" in block ? block.items : [block.text]))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
