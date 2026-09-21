import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";

// TODO: texto redigido a partir do que o site realmente faz hoje (formulário que abre o
// WhatsApp, mapa do Google e armazenamento local). Revise com seu jurídico antes de
// publicar, e atualize se entrar formulário com servidor, remarketing ou pixel.
export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Como a Simonetto Guarapuava trata os dados de quem visita o site.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Política de privacidade"
        title="Transparência sobre os *seus dados*"
        text="Este site é institucional. Aqui você vê o que acontece com as informações que envia e o que é gravado no seu navegador."
        image="/images/loja/living.jpg"
      />

      <section className="bg-paper">
        <div className="article mx-auto max-w-2xl px-6 py-20 md:py-28">
          <p>
            Atualizada em setembro de 2026. Esta página explica como a {site.name} trata dados
            pessoais no site, seguindo a Lei Geral de Proteção de Dados (Lei 13.709/2018).
          </p>

          <h2>Quais dados coletamos</h2>
          <p>
            O site não tem cadastro nem área de login e não pede dados para você navegar. Os únicos
            dados pessoais que chegam até nós são os que você mesmo escreve para falar com a loja.
          </p>

          <h2>O formulário de contato</h2>
          <p>
            O formulário da página de contato não envia nada para um servidor nosso: ele monta a
            mensagem com o que você preencheu (nome, telefone, cidade, ambientes de interesse e
            mensagem) e abre o WhatsApp para você enviar, se quiser. A partir do envio, a conversa
            fica no WhatsApp, que é da Meta, e também está sujeita à política de privacidade dela.
            Usamos esses dados apenas para responder e conduzir o seu projeto.
          </p>

          <h2>Cookies e armazenamento no navegador</h2>
          <p>O site não grava cookies próprios. O que ele usa é o armazenamento local do seu navegador:</p>
          <ul>
            <li>Para lembrar a sua escolha sobre cookies e não mostrar o aviso de novo.</li>
            <li>Para não repetir a animação de abertura da página inicial na mesma aba.</li>
          </ul>
          <p>
            Essas informações ficam só no seu aparelho, não são enviadas para nós e você pode apagá-las
            limpando os dados do site no navegador.
          </p>

          <h2>Serviços de terceiros</h2>
          <p>
            O mapa da página de contato é carregado pelo Google e grava cookies de terceiros. Por isso
            ele só aparece depois que você aceita os cookies; enquanto isso, mostramos o endereço e um
            link para abrir o Google Maps em outra aba. Se as ferramentas de medição de visitas
            estiverem ativas, elas também só carregam após o aceite. As fontes e as imagens são servidas
            pelo próprio site, sem chamadas externas.
          </p>

          <h2>Com quem compartilhamos</h2>
          <p>
            Não vendemos nem cedemos dados. Eles são acessados pela equipe da loja para atender você e
            pelos serviços citados acima, dentro do que cada um faz.
          </p>

          <h2>Por quanto tempo guardamos</h2>
          <p>
            As conversas e os dados de projeto ficam guardados enquanto durar o atendimento e pelo prazo
            necessário para cumprir obrigações legais e contratuais. Depois disso, são descartados.
          </p>

          <h2>Seus direitos</h2>
          <p>
            A LGPD garante que você peça confirmação de tratamento, acesso, correção, anonimização,
            portabilidade ou exclusão dos seus dados, além de revogar o consentimento a qualquer momento.
          </p>

          <h2>Como falar com a gente</h2>
          <p>
            Para exercer esses direitos ou tirar dúvidas sobre privacidade, escreva para{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-4">
              {site.email}
            </a>{" "}
            ou fale com a loja pelo WhatsApp {site.whatsapp}. Nosso showroom fica na{" "}
            {site.address.street}, {site.address.district}, {site.address.city} - {site.address.state}.
          </p>

          <h2>Alterações</h2>
          <p>
            Se esta política mudar, publicamos a nova versão nesta página com a data atualizada.
          </p>
        </div>
      </section>
    </>
  );
}
