import Image from "next/image";

export default function Logo({
  white = false,
  eager = false,
  className = "",
}: {
  white?: boolean;
  eager?: boolean;
  className?: string;
}) {
  return (
    <Image
      src="/brand/simonetto-logo.png"
      alt="Simonetto Móveis Planejados"
      width={899}
      height={213}
      sizes="176px"
      loading={eager ? "eager" : "lazy"}
      className={`h-auto ${white ? "logo-white" : ""} ${className}`}
    />
  );
}
