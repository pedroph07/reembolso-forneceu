import React from 'react';
import { Clock, AlertTriangle, ArrowLeft, ExternalLink, CheckCircle2, ShieldAlert, FileSearch } from 'lucide-react';

export default function StepProcessing({ currentRequest, onReset, onOpenTerms }) {
  const status = currentRequest?.status || 'Em Análise';

  const getStatusBadge = () => {
    switch (status) {
      case 'Aprovado':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Parecer: Reembolso Aprovado
          </span>
        );
      case 'Recusado':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 border border-red-300 text-red-800 text-xs font-bold">
            Parecer: Indeferido (Ver Termos)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold">
            <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" /> Em Auditoria & Perícia Técnica
          </span>
        );
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-md border border-amber-200/80 rounded-3xl p-8 shadow-card-shadow">
      {/* Top Header Icon */}
      <div className="flex items-center justify-between mb-6">
        <div className="w-14 h-14 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 shadow-sm">
          <FileSearch className="w-7 h-7 text-amber-700 stroke-[2.5]" />
        </div>
        {getStatusBadge()}
      </div>

      <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
        Solicitação em Análise & Perícia Técnica
      </h2>
      <p className="text-sm text-gray-500 mb-8 font-medium">
        Sua solicitação foi registrada com sucesso e está passando pela etapa de auditoria de uso e validação cadastral.
      </p>

      {/* SLA Info Card */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 mb-4 flex items-center gap-4">
        <div className="w-9 h-9 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 shrink-0 font-bold">
          <Clock className="w-4.5 h-4.5" />
        </div>
        <div className="text-xs text-gray-700 leading-relaxed font-medium">
          O prazo total para a perícia técnica, auditoria de consumo e emissão do parecer financeiro final é de até <strong className="text-gray-900 font-bold">15 a 30 dias úteis</strong> conforme os{' '}
          <button
            type="button"
            onClick={onOpenTerms}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-200 text-amber-950 font-bold hover:bg-amber-300 transition-all ml-1"
          >
            Termos de Uso
            <ExternalLink className="w-3 h-3" />
          </button>
          .
        </div>
      </div>

      {/* Important Alert Box */}
      <div className="bg-amber-100/70 border border-amber-300 rounded-2xl p-5 mb-8 flex items-start gap-4">
        <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-black font-bold shrink-0 mt-0.5 shadow-sm">
          <AlertTriangle className="w-4 h-4 stroke-[2.5]" />
        </div>
        <div className="space-y-1.5 text-xs">
          <div className="font-bold text-amber-950">
            Importante: Documentação obrigatória e canal oficial de contato
          </div>
          <div className="text-gray-700 leading-relaxed font-medium">
            Caso o setor de auditoria necessite de comprovantes complementares, um aviso será emitido. Caso deseje enviar documentos adicionais, envie diretamente para o e-mail oficial: <strong className="text-gray-900 font-bold underline font-mono">forneceupsuporte@gmail.com</strong>.
          </div>
        </div>
      </div>

      {/* Progress Timeline - Multi-Stage Audit */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-950 mb-4">
          Etapas da Perícia & Auditoria Financeira
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="bg-white border border-emerald-300 p-3 rounded-xl flex items-center gap-2.5 shadow-sm">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[11px] font-extrabold shrink-0">
              1
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900">Triagem</div>
              <div className="text-[10px] text-emerald-700 font-bold">Validação cadastral</div>
            </div>
          </div>

          <div className="bg-white border border-amber-400 p-3 rounded-xl flex items-center gap-2.5 shadow-sm">
            <div className="w-6 h-6 rounded-full bg-amber-400 text-black flex items-center justify-center text-[11px] font-extrabold shrink-0">
              2
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900">Auditoria</div>
              <div className="text-[10px] text-amber-800 font-bold">Análise de consumo</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-3 rounded-xl flex items-center gap-2.5 opacity-60">
            <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-[11px] font-bold shrink-0">
              3
            </div>
            <div>
              <div className="text-xs font-bold text-gray-500">Perícia</div>
              <div className="text-[10px] text-gray-400">Checagem técnica</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-3 rounded-xl flex items-center gap-2.5 opacity-60">
            <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-[11px] font-bold shrink-0">
              4
            </div>
            <div>
              <div className="text-xs font-bold text-gray-500">Parecer</div>
              <div className="text-[10px] text-gray-400">Decisão financeira</div>
            </div>
          </div>
        </div>
      </div>

      {/* Return to Home button */}
      <div className="flex justify-start">
        <button
          onClick={onReset}
          className="w-full md:w-auto px-8 py-3.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-900 font-bold rounded-xl flex items-center justify-center gap-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Início</span>
        </button>
      </div>
    </div>
  );
}
