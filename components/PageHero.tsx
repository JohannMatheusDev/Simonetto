import Image from "next/image";
import Eyebrow from "./Eyebrow";
import Emphasis from "./Emphasis";

// Hero escuro das páginas internas. O atributo data-hero deixa o header transparente por cima dele.
export default function PageHero({
  eyebrow,
  title,
  text,
  image,
  imagePosition = "50% 50%",
  children,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  image: string;
  imagePosition?: string;
  children?: React.ReactNode;
}) {
  return (
    <section data-hero className="relative flex min-h-[75svh] items-end overflow-hidden bg-ink text-paper">
      <Image
        src={image}
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover opacity-60 motion-safe:animate-hero-zoom"
        style={{ objectPosition: imagePosition }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/40 to-ink/30" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-40 md:px-10 md:pb-24">
        <div className="motion-safe:animate-rise">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h1 className="mt-6 max-w-4xl text-4xl font-light leading-[1.06] text-balance motion-safe:animate-rise motion-safe:[animation-delay:120ms] md:text-7xl">
          <Emphasis text={title} />
        </h1>
        {text && (
          <p className="mt-6 max-w-xl text-paper/70 motion-safe:animate-rise motion-safe:[animation-delay:240ms] md:text-lg">
            {text}
          </p>
        )}
        {children && (
          <div className="motion-safe:animate-rise motion-safe:[animation-delay:360ms]">{children}</div>
        )}
      </div>
    </section>
  );
}
