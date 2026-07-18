import React from 'react';

interface TopProps {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}

export const Top: React.FC<TopProps> = ({ eyebrow, title, children }) => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        {/* Eyebrow style */}
        <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-1">
          {eyebrow}
        </p>
        {/* Title style */}
        <h1 className="text-3xl font-bold text-white tracking-tight">
          {title}
        </h1>
      </div>

      {/* Action buttons (if any) */}
      {children && (
        <div className="flex items-center gap-3">
          {children}
        </div>
      )}
    </header>
  );
};