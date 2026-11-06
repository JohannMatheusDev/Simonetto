import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Existe um package-lock.json na pasta do usuário; fixa a raiz neste projeto
  turbopack: {
    root: __dirname,
  },
  // Permite abrir o servidor de desenvolvimento pelo IP da rede (ex.: no celular)
  allowedDevOrigins: ["192.168.18.86"],
  // Um endereço só para o Google: www vai para o domínio sem www
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.simonettoguarapuava.com.br" }],
        destination: "https://simonettoguarapuava.com.br/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
