// Converte "Texto com *destaque*" em texto com o trecho em Playfair Display itálico,
// seguindo o guia da marca (itálico para ênfase em títulos).
export default function Emphasis({ text }: { text: string }) {
  return text.split("*").map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className="font-serif font-normal italic">
        {part}
      </em>
    ) : (
      part
    ),
  );
}
