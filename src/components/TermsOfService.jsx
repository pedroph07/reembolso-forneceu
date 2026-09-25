import React, { useState } from 'react';
import { ShieldAlert, FileText, CheckCircle2, Lock, AlertOctagon, Scale, ChevronRight } from 'lucide-react';

export default function TermsOfService({ openSupportModal }) {
  const [activeSection, setActiveSection] = useState('6');

  const sections = [
    { id: '1', title: '1. Aceitação dos Termos' },
    { id: '2', title: '2. Descrição dos Serviços' },
    { id: '3', title: '3. Regras de Cadastro e Segurança' },
    { id: '4', title: '4. Planos, Assinaturas e Renovações' },
    { id: '5', title: '5. Política Geral de Reembolso' },
    { id: '6', title: '6. Prazo de Perícia (15 a 30 Dias Úteis)' },
    { id: '7', title: '7. Etapas de Auditoria Sequencial' },
    { id: '8', title: '8. Hipóteses de Indeferimento' },
    { id: '9', title: '9. Regras de Ressarcimento Financeiro' },
    { id: '10', title: '10. Propriedade Intelectual e Foro' },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(`section-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-8">
      {/* Sidebar TOC Navigation */}
      <aside className="w-full md:w-64 shrink-0 space-y-6">
        <div className="bg-white/95 backdrop-blur-md border border-amber-200/80 rounded-2xl p-5 sticky top-6 shadow-card-shadow space-y-4">
          <h3 className="text-xs font-extrabold tracking-wider text-amber-950 uppercase flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-amber-600" /> Índice dos Termos (10 Seções)
          </h3>
          <nav className="space-y-1 text-xs">
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`w-full text-left px-3 py-2 rounded-lg font-bold transition-all flex items-center justify-between ${
                  activeSection === sec.id
                    ? 'bg-amber-100 text-amber-950 border-l-4 border-amber-500 font-extrabold'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-amber-50'
                }`}
              >
                <span className="truncate">{sec.title}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Support Card */}
        <div className="bg-white/95 backdrop-blur-md border border-amber-200/80 rounded-2xl p-5 space-y-3 shadow-card-shadow">
          <p className="text-xs text-gray-600 font-medium leading-relaxed">
            Dúvidas sobre os nossos termos?
          </p>
          <button
            onClick={openSupportModal}
            className="text-xs text-amber-900 hover:text-amber-950 font-bold flex items-center gap-1 group text-left underline"
          >
            Fale com o suporte
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </aside>

      {/* Main Legal Content */}
      <main className="flex-1 bg-white/95 backdrop-blur-md border border-amber-200/80 rounded-3xl p-8 shadow-card-shadow text-gray-800 space-y-8">
        <div className="border-b border-gray-200 pb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Termos de Uso & Política de Reembolso
            </h1>
            <p className="text-xs text-amber-900 font-bold mt-1">
              Regulamento Oficial da Plataforma Forneceup em 10 Seções Integrais
            </p>
          </div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-950 bg-amber-100 px-3 py-1.5 rounded-full border border-amber-300">
            10 SEÇÕES
          </span>
        </div>

        {/* Section 1 */}
        <section id="section-1" className="space-y-3 scroll-mt-6">
          <h2 className="text-xl font-extrabold text-gray-900">1. Aceitação dos Termos</h2>
          <p className="text-sm leading-relaxed text-gray-600 font-medium">
            Ao se cadastrar, adquirir licenças ou utilizar os serviços da plataforma <strong className="text-gray-900">Forneceup</strong>, o usuário adere de forma plena, irrestrita e automática a todas as cláusulas deste regulamento, concordando explicitamente com o fluxo estendido de análise e auditoria para solicitações financeiras.
          </p>
        </section>

        {/* Section 2 */}
        <section id="section-2" className="space-y-3 scroll-mt-6">
          <h2 className="text-xl font-extrabold text-gray-900">2. Descrição dos Serviços</h2>
          <p className="text-sm leading-relaxed text-gray-600 font-medium">
            A Forneceup disponibiliza aos seus usuários soluções de inteligência de mercado, busca e curadoria de fornecedores, integração de e-commerce e ferramentas de automação de suprimentos B2B.
          </p>
        </section>

        {/* Section 3 */}
        <section id="section-3" className="space-y-3 scroll-mt-6">
          <h2 className="text-xl font-extrabold text-gray-900">3. Regras de Cadastro e Segurança</h2>
          <p className="text-sm leading-relaxed text-gray-600 font-medium">
            O usuário é o único responsável pela guarda e confidencialidade de suas credenciais de acesso. O compartilhamento de conta com terceiros ou uso de automações não autorizadas ensejará o bloqueio imediato sem direito a ressarcimento.
          </p>
        </section>

        {/* Section 4 */}
        <section id="section-4" className="space-y-3 scroll-mt-6">
          <h2 className="text-xl font-extrabold text-gray-900">4. Planos, Assinaturas e Renovações Automáticas</h2>
          <p className="text-sm leading-relaxed text-gray-600 font-medium">
            As assinaturas e planos contratados possuem renovação automática recorrente. Cabe ao usuário gerenciar o cancelamento de sua assinatura nas configurações do painel antes da data do vencimento. A renovação efetuada sem o prévio cancelamento pelo usuário no painel não enseja direito a estorno retroativo.
          </p>
        </section>

        {/* Section 5 - Refund Policy */}
        <section id="section-5" className="space-y-4 scroll-mt-6 bg-amber-50/80 border-2 border-amber-300 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold">
              <ShieldAlert className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-amber-950">5. Política Geral de Reembolso e Devoluções</h2>
              <span className="text-xs font-bold text-amber-900">Procedimento de auditoria preventiva e análise de consumo</span>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-gray-800 font-medium">
            Em conformidade com a legislação vigente para serviços digitais de banco de dados e automação B2B, a Forneceup concede o direito de solicitação de cancelamento dentro do prazo de <strong>7 (sete) dias corridos</strong> a partir da data de confirmação do pagamento, sujeito à verificação de não-consumo prévio dos ativos da plataforma.
          </p>
        </section>

        {/* Section 6 - Extended SLA */}
        <section id="section-6" className="space-y-3 scroll-mt-6">
          <h2 className="text-xl font-extrabold text-gray-900">6. Prazo Extensivo de Perícia e Análise (15 a 30 Dias Úteis)</h2>
          <p className="text-sm leading-relaxed text-gray-600 font-medium">
            Devido à natureza dos serviços digitais da Forneceup (inteligência de mercado, relatórios de fornecedores e integrações), toda solicitação exige verificação individual de logs no banco de dados.
          </p>
          <div className="bg-amber-100/70 border border-amber-300 rounded-xl p-4 text-xs font-medium text-amber-950 leading-relaxed">
            <strong>Prazo de Tramitação:</strong> O prazo regular para a conclusão da perícia técnica, análise de utilização e decisão do departamento financeiro é de <strong>15 a 30 dias úteis</strong>, contados a partir da data de protocolo e envio completo da documentação exigida.
          </div>
        </section>

        {/* Section 7 - 4-Step Verification Pipeline */}
        <section id="section-7" className="space-y-4 scroll-mt-6">
          <h2 className="text-xl font-extrabold text-gray-900">7. Etapas de Auditoria & Verificação Sequencial</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl space-y-2">
              <div className="text-xs font-extrabold text-amber-900 uppercase">1. Triagem Cadastral e Anti-Fraude</div>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Conferência de titularidade do pagador, verificação de IP de acesso e cruzamento de dados do e-mail cadastrado.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl space-y-2">
              <div className="text-xs font-extrabold text-amber-900 uppercase">2. Auditoria de Consumo de Dados</div>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Varredura nos servidores para medir o volume de buscas realizadas, contatos de fornecedores visualizados e relatórios baixados.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl space-y-2">
              <div className="text-xs font-extrabold text-amber-900 uppercase">3. Perícia Técnica de Logs</div>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Nos casos de alegação de erro no sistema, os engenheiros periciam os registros do servidor no horário exato relatado.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl space-y-2">
              <div className="text-xs font-extrabold text-amber-900 uppercase">4. Parecer Financeiro Final</div>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Emissão da decisão formal de reembolso com o respectivo comprovante de liquidação ou laudo fundamentado de indeferimento.
              </p>
            </div>
          </div>
        </section>

        {/* Section 8 - Refusal Reasons */}
        <section id="section-8" className="space-y-3 scroll-mt-6">
          <h2 className="text-xl font-extrabold text-gray-900">8. Hipóteses de Indeferimento Definitivo (Não Elegíveis)</h2>
          <p className="text-sm leading-relaxed text-gray-600 font-medium">
            Será negada e indeferida qualquer solicitação de devolução de pagamento que se enquadre em um dos seguintes itens:
          </p>
          <ul className="list-disc pl-5 text-xs text-gray-700 space-y-2 font-medium leading-relaxed">
            <li><strong>Uso Superior a 10%:</strong> Quando a conta tiver consumido mais de 10% dos créditos, dados ou consultas contratadas;</li>
            <li><strong>Exportação de Informações:</strong> Realização de download ou cópia de relatórios e contatos de fornecedores da plataforma;</li>
            <li><strong>Extrapolação do Prazo:</strong> Solicitações submetidas após o prazo de 7 dias corridos da contratação;</li>
            <li><strong>Falta de Documentos:</strong> Ausência de envio dos comprovantes ou documentos de identidade solicitados pelo setor de triagem;</li>
            <li><strong>Contas Canceladas por Violação:</strong> Usuários cuja conta tenha sido bloqueada por raspagem automatizada ou compartilhamento ilícito de senha;</li>
            <li><strong>Pessoas Jurídicas (CNPJ):</strong> Compras corporativas com emissão e homologação prévia de Nota Fiscal sem vício comprovado.</li>
          </ul>
        </section>

        {/* Section 9 - Payment Methods & Processing */}
        <section id="section-9" className="space-y-3 scroll-mt-6">
          <h2 className="text-xl font-extrabold text-gray-900">9. Regras para Ressarcimento Financeiro (Pix, Cartão e Boleto)</h2>
          <div className="bg-amber-50/60 border border-amber-200 p-4 rounded-xl text-xs space-y-2 font-medium text-gray-800">
            <p>• <strong>Cartão de Crédito:</strong> O estorno é solicitado à credenciadora em até 5 dias úteis após a aprovação do parecer. O crédito na fatura depende da operadora do cartão (podendo ocorrer em até 2 faturas subsequentes).</p>
            <p>• <strong>Pix e Boleto:</strong> A devolução será efetuada exclusivamente via chave Pix associada ao mesmo CPF ou CNPJ titular da compra original.</p>
          </div>
        </section>

        {/* Section 10 - Intellectual Property & Jurisdiction */}
        <section id="section-10" className="space-y-3 scroll-mt-6 border-t border-gray-200 pt-6">
          <h2 className="text-xl font-extrabold text-gray-900">10. Propriedade Intelectual e Foro</h2>
          <p className="text-sm leading-relaxed text-gray-600 font-medium">
            Todos os direitos sobre a marca, dados de fornecedores e código da plataforma Forneceup são reservados. Para a resolução de eventuais litígios oriundos deste contrato, fica eleito o Foro da Comarca da Capital.
          </p>
        </section>
      </main>
    </div>
  );
}
