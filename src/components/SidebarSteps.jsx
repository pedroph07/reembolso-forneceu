import React from 'react';
import { Check, HelpCircle, ChevronRight, RefreshCw, Mail, Hash } from 'lucide-react';

export default function SidebarSteps({ currentStep, setStep, formData, resetForm, openSupportModal }) {
  const steps = [
    { id: 1, label: '1. Identificação' },
    { id: 2, label: '2. Motivo' },
    { id: 3, label: '3. Confirmação' },
    { id: 4, label: '4. Processamento' },
  ];

  return (
    <aside className="w-full md:w-64 flex flex-col gap-6 shrink-0">
      {/* Etapas do Processo Card */}
      <div className="bg-white/90 backdrop-blur-md border border-amber-200/80 rounded-2xl p-5 shadow-card-shadow">
        <h3 className="text-xs font-extrabold tracking-wider text-amber-950 uppercase mb-5">
          Etapas do processo
        </h3>

        <div className="flex flex-col gap-4 relative">
          {/* Vertical progress line */}
          <div className="absolute left-[13px] top-3 bottom-3 w-0.5 bg-amber-100 -z-0" />

          {steps.map((step) => {
            const isCompleted = currentStep > step.id || (currentStep === 4 && step.id === 4);
            const isCurrent = currentStep === step.id;
            const isSelectable = step.id < currentStep && currentStep !== 4;

            return (
              <div
                key={step.id}
                onClick={() => isSelectable && setStep(step.id)}
                className={`flex items-center gap-3 relative z-10 transition-all ${
                  isSelectable ? 'cursor-pointer hover:opacity-80' : ''
                }`}
              >
                {/* Status Dot / Checkmark */}
                <div
                  className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCompleted
                      ? 'bg-amber-400 text-black shadow-glow-yellow font-extrabold'
                      : isCurrent
                      ? 'bg-amber-400 text-black shadow-glow-yellow'
                      : 'bg-amber-50 text-gray-400 border border-amber-200'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-current" />
                  )}
                </div>

                {/* Step Text Badge */}
                <div
                  className={`flex-1 py-1.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                    isCurrent
                      ? 'bg-amber-50 text-amber-950 border border-amber-300 font-bold'
                      : isCompleted
                      ? 'text-amber-800'
                      : 'text-gray-400'
                  }`}
                >
                  <span className="flex items-center justify-between">
                    {step.label}
                    {isCompleted && step.id !== 4 && <Check className="w-3.5 h-3.5 text-amber-600" />}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Support Card with Fale com o suporte */}
      <div className="bg-white/90 backdrop-blur-md border border-amber-200/80 rounded-2xl p-5 flex flex-col gap-3 shadow-card-shadow">
        <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-800 font-bold">
          <HelpCircle className="w-4 h-4" />
        </div>
        <p className="text-xs text-gray-600 leading-relaxed font-medium">
          Dúvidas sobre o reembolso ou os nossos termos?
        </p>
        <button
          onClick={openSupportModal}
          className="text-xs text-amber-800 hover:text-amber-950 font-bold flex items-center gap-1 group text-left pt-1"
        >
          Fale com o suporte
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Customer Info Card */}
      {(formData.email || formData.orderId) && (
        <div className="bg-white/90 backdrop-blur-md border border-amber-200/80 rounded-2xl p-4 flex flex-col gap-2 shadow-card-shadow">
          <div className="text-xs font-bold text-gray-900 truncate flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate">{formData.email || 'Não informado'}</span>
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span>Pedido: {formData.orderId || '---'}</span>
          </div>
          {currentStep === 4 && (
            <button
              onClick={resetForm}
              className="text-[11px] text-amber-700 hover:underline flex items-center gap-1 pt-2 font-semibold"
            >
              <RefreshCw className="w-3 h-3" />
              Trocar e-mail / pedido
            </button>
          )}
        </div>
      )}
    </aside>
  );
}
