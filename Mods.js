
import React, { useState, useEffect, useRef } from 'react';
import htm from 'htm';
import * as Lucide from 'lucide-react';
import { SERVER_MODS } from './constants.js';

const html = htm.bind(React.createElement);

export const Mods = ({ onSuggest }) => {
  const [suggestion, setSuggestion] = useState({ modName: '', reason: '', link: '', submittedBy: '', discord: '' });
  const [submitted, setSubmitted] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const handleSubmitSuggestion = (e) => {
    e.preventDefault();
    onSuggest(suggestion);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSuggestion({ modName: '', reason: '', link: '', submittedBy: '', discord: '' });
    }, 3000);
  };

  return html`
    <div className="pt-32 pb-24 px-6 min-h-screen bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 reveal">
          <h1 className="text-6xl md:text-8xl font-black text-blue-400 mb-6 uppercase tracking-tighter">
            MODS
          </h1>
          <p className="text-gray-400 text-lg font-medium max-w-2xl mx-auto mb-10">
            A list of the modifications active on our server. 
            Focused on mechanical automation and community creativity.
          </p>
          
          <div className="flex justify-center">
            <a 
              href="https://www.curseforge.com/minecraft/modpacks/create-80ct-official" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 px-10 py-5 bg-orange-600/10 hover:bg-orange-600 border border-orange-500/20 hover:border-orange-500 rounded-3xl transition-all duration-500"
            >
              <${Lucide.Box} className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" />
              <div className="text-left">
                <p className="text-[10px] font-black text-orange-500 group-hover:text-orange-200 uppercase tracking-[0.2em] mb-1">Official Modpack</p>
                <p className="text-xl font-black text-white uppercase tracking-tight">Get the mod group</p>
              </div>
              <${Lucide.ExternalLink} className="w-5 h-5 text-orange-500 group-hover:text-white ml-4 transition-colors" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          ${SERVER_MODS.map((mod, idx) => html`
            <div 
              key=${mod.id}
              className="group glass p-10 rounded-3xl border border-white/5 hover:border-blue-500/10 transition-all duration-500 reveal flex flex-col h-full"
              style=${{ transitionDelay: idx < 6 ? '0ms' : `${(idx - 6) * 10}ms` }}
            >
              <div className="mb-8">
                <h3 className="text-2xl font-black text-blue-400 uppercase tracking-tight">${mod.name}</h3>
              </div>

              <p className="text-gray-400 text-sm mb-8 leading-relaxed font-medium flex-1">
                ${mod.description}
              </p>

              <div className="space-y-2 mb-8">
                ${mod.features.slice(0, 3).map((feature, i) => html`
                  <div key=${i} className="flex items-center gap-3 text-xs text-gray-500 font-bold">
                    <div className="w-1 h-1 rounded-full bg-blue-600/50"></div>
                    ${feature}
                  </div>
                `)}
              </div>

              <div className="pt-6 border-t border-white/5">
                <a 
                  href=${mod.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-black text-gray-500 hover:text-blue-400 transition-all uppercase tracking-widest"
                >
                  View Mod
                  <${Lucide.ExternalLink} className="w-3 h-3" />
                </a>
              </div>
            </div>
          `)}
        </div>

        <div className="max-w-3xl mx-auto reveal">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white uppercase tracking-tight mb-4">Suggest a Mod</h2>
            <p className="text-gray-400 font-medium">Have a mod you'd like to see on the server? Let us know.</p>
          </div>

          <div className="glass p-10 rounded-3xl border border-white/5">
            <form onSubmit=${handleSubmitSuggestion} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest">Mod Name</label>
                  <input 
                    required
                    type="text" 
                    value=${suggestion.modName}
                    onChange=${e => setSuggestion({...suggestion, modName: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-blue-500 transition-all font-medium text-sm"
                    placeholder="e.g. Create: New Age"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest">Discord Username</label>
                  <input 
                    required
                    type="text" 
                    value=${suggestion.discord}
                    onChange=${e => setSuggestion({...suggestion, discord: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-blue-500 transition-all font-medium text-sm"
                    placeholder="username#0000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest">Minecraft Username (IGN)</label>
                <input 
                  required
                  type="text" 
                  value=${suggestion.submittedBy}
                  onChange=${e => setSuggestion({...suggestion, submittedBy: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-blue-500 transition-all font-medium text-sm"
                  placeholder="Your IGN"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest">Mod Link (Optional)</label>
                <input 
                  type="url" 
                  value=${suggestion.link}
                  onChange=${e => setSuggestion({...suggestion, link: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-blue-500 transition-all font-medium text-sm"
                  placeholder="https://www.curseforge.com/..."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest">Reason</label>
                <textarea 
                  required
                  value=${suggestion.reason}
                  onChange=${e => setSuggestion({...suggestion, reason: e.target.value})}
                  rows=${4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-blue-500 transition-all font-medium text-sm resize-none"
                  placeholder="Why should we add this?"
                />
              </div>

              <button 
                type="submit"
                disabled=${submitted}
                className=${`w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${submitted ? 'bg-blue-500 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg'}`}
              >
                <${submitted ? Lucide.CircleCheck : Lucide.Send} className="w-5 h-5" />
                <span>${submitted ? 'Submitted' : 'Submit Suggestion'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
};
