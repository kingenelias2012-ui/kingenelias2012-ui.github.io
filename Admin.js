
import React, { useState } from 'react';
import htm from 'htm';
import * as Lucide from 'lucide-react';

const html = htm.bind(React.createElement);

export const AdminPage = ({ 
  applications, 
  modSuggestions, 
  onUpdateStatus, 
  onDelete,
  onDeleteModSuggestion
}) => {
  const [showAll, setShowAll] = useState(false);
  const [activeTab, setActiveTab] = useState('apps');

  const handleAccept = (app) => {
    onUpdateStatus(app.id, 'Accepted');
  };

  const handleDeny = (app) => {
    onUpdateStatus(app.id, 'Denied');
  };

  const displayedApps = showAll 
    ? applications 
    : applications.filter(app => app.status === 'Pending');

  const pendingCount = applications.filter(app => app.status === 'Pending').length;

  return html`
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h1 className="text-5xl font-black text-white mb-2 tracking-tighter uppercase">Admin Dashboard</h1>
            <div className="flex items-center gap-6 mt-4">
              <button 
                onClick=${() => setActiveTab('apps')}
                className=${`text-xs font-black tracking-widest uppercase transition-all pb-2 border-b-2 ${activeTab === 'apps' ? 'text-blue-500 border-blue-500' : 'text-gray-500 border-transparent hover:text-gray-300'}`}
              >
                Applications (${applications.length})
              </button>
              <button 
                onClick=${() => setActiveTab('mods')}
                className=${`text-xs font-black tracking-widest uppercase transition-all pb-2 border-b-2 ${activeTab === 'mods' ? 'text-blue-500 border-blue-500' : 'text-gray-500 border-transparent hover:text-gray-300'}`}
              >
                Mod Suggestions (${modSuggestions.length})
              </button>
            </div>
          </div>
          
          ${activeTab === 'apps' && html`
            <div className="flex items-center gap-4">
              <button 
                onClick=${() => setShowAll(!showAll)}
                className=${`flex items-center gap-2 px-6 py-3 rounded-2xl border text-xs font-black tracking-widest uppercase transition-all ${
                  showAll 
                  ? 'bg-white/10 border-white/20 text-white' 
                  : 'bg-blue-600/10 border-blue-500/20 text-blue-500'
                }`}
              >
                <${Lucide.Filter} className="w-4 h-4" />
                ${showAll ? 'Show Pending Only' : 'Show All History'}
              </button>
              <div className="bg-blue-600/10 text-blue-500 px-6 py-3 rounded-2xl border border-blue-500/20 text-xs font-black tracking-widest uppercase">
                ${pendingCount} PENDING
              </div>
            </div>
          `}
        </div>

        ${activeTab === 'apps' ? (
          displayedApps.length === 0 ? html`
            <div className="glass p-20 rounded-3xl border border-white/5 text-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <${Lucide.User} className="w-10 h-10 text-gray-600" />
              </div>
              <p className="text-gray-400 text-xl font-medium uppercase tracking-tight">
                ${showAll ? 'No applications found at all.' : 'No pending applications to review.'}
              </p>
            </div>
          ` : html`
            <div className="grid grid-cols-1 gap-6">
              ${displayedApps.sort((a, b) => b.submittedAt - a.submittedAt).map(app => html`
                <div 
                  key=${app.id} 
                  className=${`glass p-8 rounded-3xl border-l-4 transition-all animate-in slide-in-from-bottom-4 duration-500 ${
                    app.status === 'Accepted' ? 'border-l-emerald-500' : 
                    app.status === 'Denied' ? 'border-l-red-500' : 'border-l-blue-500'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row justify-between gap-8">
                    <div className="flex-1 min-w-0 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="w-14 h-14 bg-white/5 rounded-2xl flex-shrink-0 flex items-center justify-center border border-white/10">
                            <span className="text-2xl font-black text-white">${(app.username || 'U')[0].toUpperCase()}</span>
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-2xl font-black text-white tracking-tight truncate">${app.username || 'Unknown User'}</h3>
                            <div className="flex items-center gap-3 text-sm">
                              <span className="text-gray-500 flex items-center gap-1 font-medium uppercase text-[10px] tracking-wider whitespace-nowrap">
                                <${Lucide.Clock} className="w-3 h-3" />
                                ${new Date(app.submittedAt).toLocaleDateString()}
                              </span>
                              <span className=${`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-blue-500/10 text-blue-500`}>
                                Peaceful
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className=${`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${
                          app.status === 'Accepted' ? 'bg-emerald-500/10 text-emerald-500' : 
                          app.status === 'Denied' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
                        }`}>
                          ${app.status}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm">
                        <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5 overflow-hidden">
                          <p className="text-gray-500 uppercase font-black text-[9px] mb-2 tracking-[0.2em]">Discord Username</p>
                          <div className="flex items-center gap-2 text-blue-500 font-bold break-all">
                            <${Lucide.MessageCircle} className="w-3 h-3 flex-shrink-0" />
                            ${app.discord}
                          </div>
                        </div>
                        <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5 overflow-hidden">
                          <p className="text-gray-500 uppercase font-black text-[9px] mb-2 tracking-[0.2em]">Age</p>
                          <p className="text-gray-300 font-bold break-words">${app.age} years old</p>
                        </div>
                        <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5 overflow-hidden">
                          <p className="text-gray-500 uppercase font-black text-[9px] mb-2 tracking-[0.2em]">About Player</p>
                          <p className="text-gray-300 leading-relaxed font-medium break-words whitespace-pre-wrap">"${app.playerDescription}"</p>
                        </div>
                        <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5 overflow-hidden">
                          <p className="text-gray-500 uppercase font-black text-[9px] mb-2 tracking-[0.2em]">Goals</p>
                          <p className="text-gray-300 leading-relaxed font-medium break-words whitespace-pre-wrap">${app.goals}</p>
                        </div>
                        <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5 overflow-hidden">
                          <p className="text-gray-500 uppercase font-black text-[9px] mb-2 tracking-[0.2em]">Motivation</p>
                          <p className="text-gray-300 leading-relaxed font-medium break-words whitespace-pre-wrap">${app.motivation}</p>
                        </div>
                        <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5 overflow-hidden">
                          <p className="text-gray-500 uppercase font-black text-[9px] mb-2 tracking-[0.2em]">Additional Info</p>
                          <p className="text-gray-300 font-medium break-words whitespace-pre-wrap">${app.additionalInfo || "N/A"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex lg:flex-col gap-3 justify-center">
                      <button 
                        onClick=${() => handleAccept(app)}
                        className=${`flex-1 lg:flex-none p-4 rounded-2xl transition-all flex items-center justify-center gap-2 font-black uppercase text-xs tracking-widest ${
                          app.status === 'Accepted' 
                          ? 'bg-blue-600 text-white cursor-default' 
                          : 'bg-blue-600/10 hover:bg-blue-600 text-blue-500 hover:text-white'
                        }`}
                      >
                        <${Lucide.CircleCheck} className="w-5 h-5" />
                        Approve
                      </button>
                      <button 
                        onClick=${() => handleDeny(app)}
                        className=${`flex-1 lg:flex-none p-4 rounded-2xl transition-all flex items-center justify-center gap-2 font-black uppercase text-xs tracking-widest ${
                          app.status === 'Denied' 
                          ? 'bg-red-600 text-white cursor-default' 
                          : 'bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white'
                        }`}
                      >
                        <${Lucide.CircleX} className="w-5 h-5" />
                        Deny
                      </button>
                      <button 
                        onClick=${() => onDelete(app.id)}
                        className="p-4 bg-white/5 hover:bg-red-600/20 text-gray-500 hover:text-red-500 rounded-2xl transition-all flex items-center justify-center"
                      >
                        <${Lucide.Trash2} className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              `)}
            </div>
          `
        ) : (
          modSuggestions.length === 0 ? html`
            <div className="glass p-20 rounded-3xl border border-white/5 text-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <${Lucide.Box} className="w-10 h-10 text-gray-600" />
              </div>
              <p className="text-gray-400 text-xl font-medium uppercase tracking-tight">
                No mod suggestions yet.
              </p>
            </div>
          ` : html`
            <div className="grid grid-cols-1 gap-6">
              ${modSuggestions.sort((a, b) => b.submittedAt - a.submittedAt).map(mod => html`
                <div 
                  key=${mod.id} 
                  className="glass p-8 rounded-3xl border-l-4 border-l-blue-500 transition-all animate-in slide-in-from-bottom-4 duration-500"
                >
                  <div className="flex flex-col lg:flex-row justify-between gap-8">
                    <div className="flex-1 min-w-0 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="w-14 h-14 bg-white/5 rounded-2xl flex-shrink-0 flex items-center justify-center border border-white/10">
                            <${Lucide.Box} className="w-8 h-8 text-blue-500" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-2xl font-black text-white tracking-tight truncate">${mod.modName}</h3>
                            <div className="flex items-center gap-3 text-sm">
                              <span className="text-gray-500 flex items-center gap-1 font-medium uppercase text-[10px] tracking-wider whitespace-nowrap">
                                <${Lucide.Clock} className="w-3 h-3" />
                                ${new Date(mod.submittedAt).toLocaleDateString()}
                              </span>
                              <span className="text-gray-500 flex items-center gap-1 font-medium uppercase text-[10px] tracking-wider whitespace-nowrap">
                                <${Lucide.User} className="w-3 h-3" />
                                ${mod.submittedBy}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm">
                        <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5 overflow-hidden">
                          <p className="text-gray-500 uppercase font-black text-[9px] mb-2 tracking-[0.2em]">Discord Username</p>
                          <div className="flex items-center gap-2 text-blue-500 font-bold break-all">
                            <${Lucide.MessageCircle} className="w-3 h-3 flex-shrink-0" />
                            ${mod.discord}
                          </div>
                        </div>
                        <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5 overflow-hidden">
                          <p className="text-gray-500 uppercase font-black text-[9px] mb-2 tracking-[0.2em]">Reason</p>
                          <p className="text-gray-300 leading-relaxed font-medium break-words whitespace-pre-wrap">${mod.reason}</p>
                        </div>
                        ${mod.link && html`
                          <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5 overflow-hidden">
                            <p className="text-gray-500 uppercase font-black text-[9px] mb-2 tracking-[0.2em]">Mod Link</p>
                            <a 
                              href=${mod.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-500 font-bold flex items-center gap-2 hover:underline"
                            >
                              <${Lucide.ExternalLink} className="w-3 h-3" />
                              View Mod Page
                            </a>
                          </div>
                        `}
                      </div>
                    </div>

                    <div className="flex lg:flex-col gap-3 justify-center">
                      <button 
                        onClick=${() => onDeleteModSuggestion(mod.id)}
                        className="p-4 bg-white/5 hover:bg-red-600/20 text-gray-500 hover:text-red-500 rounded-2xl transition-all flex items-center justify-center"
                      >
                        <${Lucide.Trash2} className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              `)}
            </div>
          `
        )}
      </div>
    </div>
  `;
};
