
import React, { useEffect, useRef } from 'react';
import htm from 'htm';
import { Logo } from './Logo.js';
import { FEATURES } from './constants.js';
import * as Lucide from 'lucide-react';

const html = htm.bind(React.createElement);

export const Home = ({ onNavigate }) => {
  const observerRef = useRef(null);
  const DISCORD_LINK = "https://discord.gg/7rPtDM6sg";

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

  const copyIp = () => {
    const ip = 'stablesv.falix.gg';
    navigator.clipboard.writeText(ip);
    alert(`Server IP (${ip}) copied to clipboard!`);
  };

  return html`
    <div className="pt-20">
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        
        <div className="text-center max-w-4xl mx-auto reveal">
          <${Logo} size="lg" className="mb-8 justify-center" />
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            A sanctuary built on trust, creativity, and community. Experience survival exactly as it should be.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
            <button 
              onClick=${() => onNavigate('application')}
              className="group px-16 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xl transition-all duration-300 shadow-md hover:-translate-y-1 w-full sm:w-auto"
            >
              APPLY NOW
            </button>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center border-t border-white/5 pt-16 w-full max-w-4xl reveal">
          <div className="space-y-1 transition-transform hover:scale-105 duration-300 cursor-default flex flex-col items-center">
            <div className="flex items-center gap-4">
              <div className="text-5xl font-black text-blue-400">39</div>
            </div>
            <div className="text-[10px] text-gray-500 uppercase tracking-[0.4em] font-bold mt-2">Members</div>
          </div>
          <div 
            className="group space-y-1 transition-transform hover:scale-105 duration-300 cursor-pointer flex flex-col items-center" 
            onClick=${copyIp}
            title="Click to copy IP"
          >
            <div className="text-3xl font-black text-white py-1 group-hover:text-blue-300 transition-colors uppercase">stablesv.falix.gg</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-[0.4em] font-bold group-hover:text-blue-500">Server IP</div>
          </div>
          <div className="space-y-1 transition-transform hover:scale-105 duration-300 cursor-default flex flex-col items-center">
            <div className="text-5xl font-black text-white">1.21.11</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-[0.4em] font-bold">Version</div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 reveal">
            <h2 className="text-4xl font-black mb-4 text-white uppercase tracking-tight">Why Create 80ct?</h2>
            <div className="h-1 w-16 bg-blue-600 mx-auto rounded-full"></div>
            <p className="mt-8 text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
              We provide a high-performance, strictly peaceful environment where players can build without fear.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${FEATURES.map((feature, idx) => {
              const Icon = Lucide[feature.icon];
              return html`
                <div 
                  key=${idx} 
                  className="reveal glass p-10 rounded-2xl border border-white/5 hover-lift shine-effect group"
                  style=${{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="mb-8 p-4 bg-blue-600/[0.03] rounded-2xl w-fit group-hover:bg-blue-600/10 transition-colors duration-500">
                    <div className="text-blue-400 transition-transform duration-500 group-hover:rotate-6">
                      <${Icon} className="w-8 h-8" />
                    </div>
                  </div>
                  <h3 className="text-xl font-extrabold text-white mb-4 uppercase tracking-wide">${feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm font-medium">
                    ${feature.description}
                  </p>
                </div>
              `;
            })}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto glass p-16 rounded-[2.5rem] border border-blue-600/10 text-center reveal">
          <h2 className="text-4xl font-black mb-6 text-white uppercase tracking-tight">Start Your Adventure</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-xl mx-auto font-light leading-relaxed">
            Apply today to become part of our growing peaceful community.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick=${() => onNavigate('application')}
              className="px-16 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xl transition-all duration-300 shadow-md hover:-translate-y-1 w-full sm:w-auto"
            >
              START APPLICATION
            </button>
          </div>
        </div>
      </section>

      <div 
        onClick=${() => onNavigate('admin')}
        className="fixed bottom-2 right-2 w-10 h-10 cursor-default opacity-0 hover:opacity-5 transition-opacity z-[100]"
        title="Admin Access"
      ></div>
    </div>
  `;
};
