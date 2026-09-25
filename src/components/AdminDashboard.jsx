import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, Clock, ShieldCheck, Filter, ChevronDown, User, DollarSign, RefreshCw, Key, Link as LinkIcon, Check } from 'lucide-react';

export default function AdminDashboard({ requests, updateStatus, clearAllRequests }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [copiedLink, setCopiedLink] = useState(false);

  const filteredRequests = requests.filter(r => {
    const matchesSearch = 
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
      r.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = statusFilter === 'Todos' || r.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const pendingCount = requests.filter(r => r.status === 'Em Análise').length;
  const approvedCount = requests.filter(r => r.status === 'Aprovado').length;
  const rejectedCount = requests.filter(r => r.status === 'Recusado').length;

  const copySlugLink = () => {
    const url = `${window.location.origin}/ph01`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Top Secret Slug Banner */}
      <div className="bg-white/95 backdrop-blur-md border border-amber-300 rounded-3xl p-6 shadow-card-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400 text-black text-xs font-black shadow-glow-yellow mb-2">
            <Key className="w-3.5 h-3.5" /> Acesso Restrito por Slug: /ph01
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Banco de Dados & Respostas de Reembolso
          </h1>
          <p className="text-xs text-gray-600 font-medium">
            Painel exclusivo ativado via URL secreta <strong className="text-amber-900 font-mono">/ph01</strong>. Visualize e gerencie todos os pedidos em tempo real.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copySlugLink}
            className="text-xs px-3.5 py-2.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-950 font-bold hover:bg-amber-200 transition-all flex items-center gap-1.5"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <LinkIcon className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copiado!' : 'Copiar URL /ph01'}</span>
          </button>

          <button
            onClick={clearAllRequests}
            className="text-xs px-3.5 py-2.5 rounded-xl bg-gray-100 border border-gray-300 text-gray-700 hover:text-black hover:bg-gray-200 font-bold transition-all flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Resetar Banco
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/90 border border-amber-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs text-amber-950 font-bold uppercase tracking-wider mb-1">
              Em Análise (SLA 15-30 dias)
            </div>
            <div className="text-2xl font-black text-amber-600 font-mono">
              {pendingCount}
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800">
            <Clock className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>

        <div className="bg-white/90 border border-emerald-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs text-emerald-950 font-bold uppercase tracking-wider mb-1">
              Reembolsos Aprovados
            </div>
            <div className="text-2xl font-black text-emerald-600 font-mono">
              {approvedCount}
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
            <CheckCircle className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>

        <div className="bg-white/90 border border-red-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs text-red-950 font-bold uppercase tracking-wider mb-1">
              Solicitações Recusadas
            </div>
            <div className="text-2xl font-black text-red-600 font-mono">
              {rejectedCount}
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-red-100 border border-red-300 flex items-center justify-center text-red-700">
            <XCircle className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white/95 backdrop-blur-md border border-amber-200/80 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-card-shadow">
        {/* Search input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por e-mail ou pedido..."
            className="w-full bg-gray-50 border border-gray-200 focus:border-amber-400 rounded-xl pl-10 pr-4 py-2 text-xs text-gray-900 placeholder-gray-400 outline-none font-medium transition-all"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {['Todos', 'Em Análise', 'Aprovado', 'Recusado'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                statusFilter === st
                  ? 'bg-amber-400 text-black shadow-glow-yellow'
                  : 'bg-gray-100 border border-gray-200 text-gray-600 hover:text-black'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table of Requests */}
      <div className="bg-white/95 backdrop-blur-md border border-amber-200/80 rounded-3xl overflow-hidden shadow-card-shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-amber-50/70 border-b border-amber-200 text-[11px] font-extrabold text-amber-950 uppercase tracking-wider">
                <th className="p-4 pl-6">Cliente & Pedido</th>
                <th className="p-4">Motivo & Descrição</th>
                <th className="p-4">Data/Hora</th>
                <th className="p-4">Status Perícia</th>
                <th className="p-4 pr-6 text-right">Ações de Gestão</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Nenhuma solicitação encontrada com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-amber-50/40 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="font-bold text-gray-900 font-mono">{req.email}</div>
                      <div className="text-[11px] text-gray-500 font-mono">Pedido: #{req.orderId}</div>
                    </td>

                    <td className="p-4 max-w-xs">
                      <div className="font-bold text-gray-800">{req.reason}</div>
                      {req.details && (
                        <div className="text-[11px] text-gray-500 leading-normal mt-0.5" title={req.details}>
                          "{req.details}"
                        </div>
                      )}
                    </td>

                    <td className="p-4 text-gray-500 font-mono text-[11px]">
                      {new Date(req.timestamp).toLocaleString('pt-BR')}
                    </td>

                    <td className="p-4">
                      {req.status === 'Aprovado' && (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold text-[11px] inline-flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-emerald-600" /> Aprovado
                        </span>
                      )}
                      {req.status === 'Recusado' && (
                        <span className="px-2.5 py-1 rounded-full bg-red-100 border border-red-300 text-red-800 font-bold text-[11px] inline-flex items-center gap-1">
                          <XCircle className="w-3 h-3 text-red-600" /> Recusado
                        </span>
                      )}
                      {req.status === 'Em Análise' && (
                        <span className="px-2.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-bold text-[11px] inline-flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-600" /> Em Auditoria
                        </span>
                      )}
                    </td>

                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {req.status === 'Em Análise' && (
                          <>
                            <button
                              onClick={() => updateStatus(req.id, 'Aprovado')}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-sm transition-all"
                            >
                              Aprovar
                            </button>
                            <button
                              onClick={() => updateStatus(req.id, 'Recusado')}
                              className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-sm transition-all"
                            >
                              Recusar
                            </button>
                          </>
                        )}
                        {req.status !== 'Em Análise' && (
                          <button
                            onClick={() => updateStatus(req.id, 'Em Análise')}
                            className="px-3 py-1 rounded-lg bg-gray-100 border border-gray-300 text-gray-700 hover:text-black font-bold text-[11px]"
                          >
                            Reabrir
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
