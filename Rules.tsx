
import React, { useEffect, useRef } from 'react';
import { Shield, Sword, MessageSquare, Users, Globe, Lock, AlertTriangle, ZapOff, CheckCircle, Scale, Heart, Ban } from 'lucide-react';

export const Rules: React.FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const DISCORD_LINK = "https://discord.gg/TwSNfFr7";

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

  const gameplayRules = [
    {
      id: 1,
      title: "Peaceful First Survival",
      icon: <Heart className="w-6 h-6 text-blue-400" />,
      content: (
        <div className="space-y-4">
          <p>Create 80ct is built on cooperation. While technical settings allow PvP, our laws prioritize peace:</p>
          <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5 group-hover:border-blue-500/10 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-blue-600/50"></div>
              <h4 className="font-black text-blue-400 text-[10px] tracking-widest uppercase">Safe Community</h4>
            </div>
            <ul className="text-[11px] text-gray-400 space-y-2 list-none leading-relaxed">
              <li>• <strong className="text-white">Friendly PvP:</strong> PvP is ON but only for agreed duels, community events, or consensual fun. Unprovoked attacks are banned.</li>
              <li>• <strong className="text-white">No Stealing:</strong> Taking items from any chest or entity without permission is an immediate offense.</li>
              <li>• <strong className="text-white">No Griefing:</strong> Any intentional destruction of another player's base or project leads to an instant ban.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Respect All Builds",
      icon: <Lock className="w-6 h-6 text-blue-400" />,
      content: "Respect the effort and creativity of your fellow players. If it isn't yours, don't touch it. This includes 'improving' things without asking. Stealing, griefing, or ruining someone else's experience will not be tolerated under any circumstances."
    },
    {
      id: 3,
      title: "No Cheating / Unfair Mods",
      icon: <ZapOff className="w-6 h-6 text-red-600" />,
      content: "We maintain a level playing field. Use of X-Ray, Fly, Auto-clickers, or any hacked client will result in a permanent blacklist. Only performance mods (Sodium) and visual mods (Shaders) are permitted."
    }
  ];

  const communityRules = [
    {
      id: 4,
      title: "Civil Discourse",
      icon: <MessageSquare className="w-6 h-6 text-blue-400" />,
      content: "Harassment, toxicity, and personal attacks are strictly prohibited. We value a mature environment where everyone feels safe to build and play. Treat everyone with kindness."
    },
    {
      id: 5,
      title: "Community Spirit",
      icon: <Users className="w-6 h-6 text-blue-400" />,
      content: "Cooperation is our core value. Trade fairly, help newcomers, and participate in community builds. A stronger community means a better server for everyone."
    },
    {
      id: 6,
      title: "Promotion & Spam",
      icon: <Globe className="w-6 h-6 text-blue-400" />,
      content: "Create 80ct is a sanctuary. Do not advertise other servers, services, or products. Any form of unsolicited promotion (including in DMs) will lead to removal."
    }
  ];

  const securityRules = [
    {
      id: 7,
      title: "Whitelisted Entry",
      icon: <Shield className="w-6 h-6 text-blue-400" />,
      content: "Our IP (stablesv.falix.gg) is public, but access is exclusively for whitelisted members. Do not attempt to bypass security or exploit server access. Each whitelist spot is personal."
    },
    {
      id: 8,
      title: "Zero Tolerance Policy",
      icon: <Ban className="w-6 h-6 text-red-500" />,
      content: (
        <div className="space-y-4">
          <p>Admins hold the scales of justice. We have zero tolerance for malice:</p>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center justify-between bg-black/20 p-3 rounded-xl border border-blue-500/10">
              <span className="text-[10px] font-black text-blue-400 uppercase">Minor Offense</span>
              <span className="text-[10px] font-bold text-blue-300">Formal Warning</span>
            </div>
            <div className="flex items-center justify-between bg-black/20 p-3 rounded-xl border border-red-500/10">
              <span className="text-[10px] font-black text-red-500 uppercase">Griefing / Stealing</span>
              <span className="text-[10px] font-bold text-red-600">Instant Permanent Ban</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  const SectionHeader = ({ title, icon }: { title: string, icon: React.ReactNode }) => (
    <div className="flex items-center gap-4 mb-12 reveal">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
      <div className="flex items-center gap-3 px-6 py-2 bg-white/5 rounded-full border border-white/5">
        <span className="text-blue-400">{icon}</span>
        <h2 className="text-xs font-black text-white tracking-[0.3em] uppercase">{title}</h2>
      </div>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
    </div>
  );

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Main Header */}
        <div className="text-center mb-24 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/5 border border-blue-600/10 text-blue-400 text-[10px] font-black tracking-widest uppercase mb-6">
            <CheckCircle className="w-3 h-3" />
            Peaceful Whitelisted Survival
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
            The <span className="text-blue-glow">Codex</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            These laws govern Create 80ct. By being whitelisted, you pledge to protect the peace and respect the work of others.
          </p>
        </div>

        {/* Gameplay Section */}
        <SectionHeader title="Gameplay Laws" icon={<Heart className="w-4 h-4" />} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {gameplayRules.map((item, idx) => (
            <RuleCard key={item.id} item={item} idx={idx} />
          ))}
        </div>

        {/* Community Section */}
        <SectionHeader title="Social Standards" icon={<Users className="w-4 h-4" />} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {communityRules.map((item, idx) => (
            <RuleCard key={item.id} item={item} idx={idx} />
          ))}
        </div>

        {/* Security Section */}
        <SectionHeader title="Security & Compliance" icon={<Shield className="w-4 h-4" />} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {securityRules.map((item, idx) => (
            <RuleCard key={item.id} item={item} idx={idx} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="reveal mt-32 relative group max-w-3xl mx-auto">
          <div className="absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-[3rem] shadow-[0_0_80px_20px_rgba(59,130,246,0.15)]"></div>
          <div className="glass p-12 rounded-[3rem] border border-blue-500/10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Scale className="w-32 h-32 text-white" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-tight">Need Clarification?</h3>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed max-w-md mx-auto">
              Our High Council (Admins) are available on Discord to discuss any specific scenarios or rule interpretations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href={DISCORD_LINK} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-blue-900/20 shine-effect flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Join Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface RuleCardProps {
  item: any;
  idx: number;
}

const RuleCard: React.FC<RuleCardProps> = ({ item, idx }) => (
  <div 
    className="reveal glass p-10 rounded-[2.5rem] border border-white/5 hover:border-blue-500/20 hover:bg-blue-500/[0.01] transition-all duration-700 group flex flex-col h-full"
    style={{ transitionDelay: `${idx * 100}ms` }}
  >
    <div className="mb-8 flex items-center justify-between">
      <div className="p-4 bg-white/5 rounded-[1.25rem] group-hover:bg-blue-600/10 transition-colors duration-500 group-hover:scale-110">
        {item.icon}
      </div>
      <span className="text-[40px] font-black text-white/5 group-hover:text-blue-500/10 transition-colors italic">0{item.id}</span>
    </div>
    <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight group-hover:text-blue-400 transition-colors">
      {item.title}
    </h3>
    <div className="text-gray-400 font-medium leading-relaxed text-[13px] flex-1">
      {item.content}
    </div>
  </div>
);
