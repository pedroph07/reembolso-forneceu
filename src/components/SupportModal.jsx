import React, { useState } from 'react';
import { X, Mail, Check, Copy } from 'lucide-react';

export default function SupportModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const supportEmail = "forneceupsuporte@gmail.com";

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(supportEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-amber-200 rounded-3xl p-6 max-w-sm w-full shadow-2xl relative space-y-5 text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon & Title */}
        <div className="pt-2">
          <div className="w-14 h-14 rounded-full bg-amber-400 text-black mx-auto flex items-center justify-center shadow-glow-yellow mb-3">
            <Mail className="w-7 h-7 stroke-[2.5]" />
          </div>
          <h3 className="text-xl font-extrabold text-gray-900">Suporte Forneceup</h3>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Entre em contato diretamente através do nosso e-mail oficial:
          </p>
        </div>

        {/* Email Display Box */}
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex flex-col items-center gap-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900">
            E-mail Oficial de Atendimento
          </span>
          <a
            href={`mailto:${supportEmail}`}
            className="text-base font-black text-gray-900 hover:text-amber-600 transition-colors font-mono underline decoration-amber-400 decoration-2 underline-offset-4"
          >
            {supportEmail}
          </a>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-black font-extrabold rounded-xl text-xs shadow-glow-yellow flex items-center justify-center gap-2 transition-all"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>E-mail Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copiar E-mail</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
