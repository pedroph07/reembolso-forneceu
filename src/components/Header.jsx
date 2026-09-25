import React from 'react';
import { Sun, ShieldCheck, FileText, UserCheck, Sparkles } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, isAdmin, setIsAdmin, pendingCount }) {
  return (
    <header className="w-full max-w-5xl mx-auto px-4 pt-6 pb-4">
      <div className="bg-white/90 backdrop-blur-md border border-amber-200/80 rounded-full px-6 py-3 flex items-center justify-between shadow-card-shadow transition-all duration-300">
        {/* Logo Brand */}
        <div 
          onClick={() => setActiveTab('wizard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-full bg-amber-400 text-black flex items-center justify-center font-extrabold text-lg shadow-glow-yellow group-hover:scale-105 transition-transform">
            F
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-gray-900 group-hover:text-amber-600 transition-colors">
              Forneceup
            </span>
          </div>
        </div>

        {/* Navigation items */}
        <div className="flex items-center gap-6 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('wizard')}
            className={`transition-colors relative py-1 ${
              activeTab === 'wizard' ? 'text-gray-900 font-bold' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Central de Reembolso
            {activeTab === 'wizard' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 rounded-full"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`transition-colors relative py-1 ${
              activeTab === 'terms' ? 'text-gray-900 font-bold' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Termos de Uso
            {activeTab === 'terms' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 rounded-full"></span>
            )}
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Admin Toggle button */}
          <button
            onClick={() => {
              setIsAdmin(!isAdmin);
              if (!isAdmin) setActiveTab('admin');
              else setActiveTab('wizard');
            }}
            className={`flex items-center gap-2 text-xs px-4 py-2 rounded-full font-bold border transition-all ${
              isAdmin 
                ? 'bg-amber-400 text-black border-amber-500 shadow-glow-yellow' 
                : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100 hover:border-amber-300'
            }`}
            title="Alternar visão entre Cliente e Suporte/Admin"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>{isAdmin ? 'Painel Admin (Ativo)' : 'Painel Suporte'}</span>
            {pendingCount > 0 && !isAdmin && (
              <span className="bg-amber-500 text-black font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </button>

          {/* Theme icon */}
          <button 
            className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 hover:bg-amber-100 transition-colors"
            title="Tema Amarelo & Branco"
          >
            <Sun className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
