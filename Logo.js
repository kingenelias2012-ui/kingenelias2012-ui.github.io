
import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export const Logo = ({ className = "", size = "md" }) => {
  const sizeClasses = {
    sm: "text-xl gap-2",
    md: "text-4xl gap-3",
    lg: "text-7xl md:text-8xl gap-4"
  };

  return html`
    <div className=${`flex items-center font-black tracking-tighter select-none group ${sizeClasses[size]} ${className}`}>
      <span className="relative inline-block transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_0_8px_rgba(59,130,246,0.2)] group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
        <span className="relative text-blue-glow transition-all duration-500">CREATE</span>
      </span>
      <span className="text-white transition-transform duration-500 group-hover:scale-105 inline-block">80ct</span>
    </div>
  `;
};
