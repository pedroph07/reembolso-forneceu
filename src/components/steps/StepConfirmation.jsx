import React from 'react';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

export default function StepConfirmation({ formData, onSubmit, onBack, onOpenTerms }) {
  return (
    <div className="bg-white/95 backdrop-blur-md border border-amber-200/80 rounded-3xl p-8 shadow-card-shadow">
      <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
        Confirme os dados
      </h2>
      <p className="text-sm text-gray-500 mb-8">
        Revise as informações antes de submeter a pedido para perícia e análise.
      </p>

      {/* Review details card */}
      <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-6 mb-6 space-y-5">
        <div>
          <span className="block text-[11px] font-extrabold tracking-widest text-amber-900 uppercase mb-1">
            E-MAIL
          </span>
          <span className="text-base font-bold text-gray-900 font-mono">
            {formData.email || 'Não informado'}
          </span>
        </div>

        <div>
          <span className="block text-[11px] font-extrabold tracking-widest text-amber-900 uppercase mb-1">
            PEDIDO
          </span>
          <span className="text-base font-bold text-gray-900 font-mono">
            {formData.orderId || 'Não informado'}
          </span>
        </div>

        <div>
          <span className="block text-[11px] font-extrabold tracking-widest text-amber-900 uppercase mb-1">
            MOTIVO
          </span>
          <span className="text-base font-bold text-gray-900">
            {formData.reason || 'Não informado'}
          </span>
        </div>

        <div>
          <span className="block text-[11px] font-extrabold tracking-widest text-amber-900 uppercase mb-1">
            DETALHES
          </span>
          <span className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed font-medium">
            {formData.details || 'Nenhum detalhe adicional informado.'}
          </span>
        </div>
      </div>

      {/* Terms Agreement Disclaimer */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-8 text-xs text-gray-600 leading-relaxed font-medium">
        Ao solicitar, você declara ciência de que sua solicitação será submetida à auditoria de consumo e perícia técnica da equipe <strong className="text-gray-900 font-bold">Forneceup</strong>, com prazo total de tramitação de até <strong className="text-gray-900 font-bold">15 a 30 dias úteis</strong> de acordo com os nossos{' '}
        <button
          type="button"
          onClick={onOpenTerms}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-bold hover:bg-amber-200 transition-all ml-1"
        >
          Termos de Uso
          <ExternalLink className="w-3 h-3" />
        </button>
        . Toda comunicação oficial será tratada exclusivamente via <strong className="text-gray-900 font-bold font-mono">forneceupsuporte@gmail.com</strong>.
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 font-bold rounded-xl flex items-center gap-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>

        <button
          type="button"
          onClick={onSubmit}
          className="flex-1 py-3.5 bg-amber-400 hover:bg-amber-500 text-black font-extrabold rounded-xl flex items-center justify-center gap-2 shadow-glow-yellow transition-all duration-200 group"
        >
          <span>Submeter para Análise</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[3]" />
        </button>
      </div>
    </div>
  );
}
