import Link from "next/link";

const variants = {
  gold: "bg-gold text-ink hover:bg-gold-light",
  light: "border border-paper/40 text-paper hover:bg-paper hover:text-ink",
  dark: "border border-ink/20 text-ink hover:bg-ink hover:text-paper",
};

export default function ButtonLink({
  href,
  children,
  variant = "gold",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  external?: boolean;
}) {
  const className = `inline-flex items-center justify-center gap-3 rounded-full px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${variants[variant]}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
