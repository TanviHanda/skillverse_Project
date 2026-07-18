import React from 'react';

interface FeatureCardProps {
  icon: string | React.ReactNode;
  title: string;
  desc: string;
}

export function FeatureCard({ icon, title, desc }: FeatureCardProps) {
  return (
    <div className="bg-[#121212] p-8 rounded-3xl border border-gray-800 hover:border-indigo-500/50 transition-all">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-gray-400 mt-2">{desc}</p>
    </div>
  );
}