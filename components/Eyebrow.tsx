export default function Eyebrow({
  children,
  tone = "gold",
}: {
  children: React.ReactNode;
  tone?: "gold" | "muted";
}) {
  return (
    <p
      className={`flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] ${
        tone === "gold" ? "text-gold" : "text-mist"
      }`}
    >
      <span className="h-px w-8 bg-gold" aria-hidden />
      {children}
    </p>
  );
}
