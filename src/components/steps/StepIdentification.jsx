import React, { useState } from 'react';
import { Mail, Hash, ArrowRight, Search, CheckCircle2 } from 'lucide-react';

export default function StepIdentification({ formData, setFormData, onNext, existingRequests }) {
  const [error, setError] = useState('');
  const [existingMatch, setExistingMatch] = useState(null);

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    setError('');

    // Check if an existing request matches
    if (updated.email && updated.orderId && existingRequests) {
      const match = existingRequests.find(
        r => r.email.toLowerCase() === updated.email.toLowerCase() && r.orderId.toLowerCase() === updated.orderId.toLowerCase()
      );
      setExistingMatch(match || null);
    } else {
      setExistingMatch(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.email.includes('@')) {
      setError('Por favor, informe um e-mail válido.');
      return;
    }
    if (!formData.orderId || formData.orderId.trim().length < 3) {
      setError('Por favor, informe o número do pedido.');
      return;
    }

    if (existingMatch) {
      onNext(4, existingMatch);
    } else {
      onNext(2);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-md border border-amber-200/80 rounded-3xl p-8 shadow-card-shadow">
      <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
        Identificação
      </h2>
      <p className="text-sm text-gray-500 mb-8">
        Informe os dados da sua compra para iniciarmos o processo.
      </p>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
          {error}
        </div>
      )}

      {existingMatch && (
        <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold mb-1 text-amber-950">Solicitação anterior encontrada!</div>
            <div>Encontramos uma solicitação recente para este e-mail e pedido. Ao continuar, você visualizará o status de acompanhamento em tempo real.</div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email field */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
            E-mail utilizado na compra <span className="text-amber-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="seu@email.com"
              className="w-full bg-gray-50 border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 rounded-xl pl-11 pr-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all font-medium"
              required
            />
          </div>
        </div>

        {/* Order ID field */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
            Número do pedido <span className="text-amber-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <Hash className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={formData.orderId || ''}
              onChange={(e) => handleChange('orderId', e.target.value)}
              placeholder="Ex: TRD-2024-00123"
              className="w-full bg-gray-50 border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 rounded-xl pl-11 pr-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all font-medium"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="px-8 py-3.5 bg-amber-400 hover:bg-amber-500 text-black font-extrabold rounded-xl flex items-center justify-center gap-2 shadow-glow-yellow transition-all duration-200 group"
          >
            <span>{existingMatch ? 'Acompanhar Solicitação' : 'Continuar'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[3]" />
          </button>
        </div>
      </form>
    </div>
  );
}
