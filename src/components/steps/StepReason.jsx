import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';

export default function StepReason({ formData, setFormData, onNext, onBack }) {
  const [error, setError] = useState('');

  const reasons = [
    "Produto não funcionou como esperado",
    "Comprei por engano",
    "Cobrança duplicada ou indevida",
    "Dificuldades técnicas / Instabilidade",
    "Insatisfação com os recursos ou suporte",
    "Outro motivo"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.reason) {
      setError('Por favor, selecione o motivo do reembolso.');
      return;
    }
    onNext(3);
  };

  return (
    <div className="bg-white/95 backdrop-blur-md border border-amber-200/80 rounded-3xl p-8 shadow-card-shadow">
      <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
        Motivo do reembolso
      </h2>
      <p className="text-sm text-gray-500 mb-8">
        Nos conte o que aconteceu para que possamos analisar melhor.
      </p>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Dropdown field */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
            Selecione o motivo <span className="text-amber-500">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.reason || ''}
              onChange={(e) => {
                setFormData({ ...formData, reason: e.target.value });
                setError('');
              }}
              className="w-full bg-gray-50 border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 appearance-none outline-none transition-all cursor-pointer pr-10 font-medium"
              required
            >
              <option value="" disabled className="text-gray-400">
                Selecione um motivo...
              </option>
              {reasons.map((r, i) => (
                <option key={i} value={r} className="text-gray-900 py-2">
                  {r}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Textarea field */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
            Descrição (opcional)
          </label>
          <textarea
            rows={4}
            value={formData.details || ''}
            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
            placeholder="Descreva com mais detalhes o que aconteceu..."
            className="w-full bg-gray-50 border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 rounded-xl p-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all resize-none font-medium"
          />
        </div>

        {/* Navigation buttons */}
        <div className="pt-4 flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 font-bold rounded-xl flex items-center gap-2 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>

          <button
            type="submit"
            className="flex-1 py-3.5 bg-amber-400 hover:bg-amber-500 text-black font-extrabold rounded-xl flex items-center justify-center gap-2 shadow-glow-yellow transition-all duration-200 group"
          >
            <span>Continuar</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[3]" />
          </button>
        </div>
      </form>
    </div>
  );
}
