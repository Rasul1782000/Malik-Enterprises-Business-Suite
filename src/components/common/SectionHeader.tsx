import React from "react";

interface SectionHeaderProps {
  kicker: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
  titleId?: string;
}

export function SectionHeader({
  kicker,
  title,
  description,
  centered = false,
  className = "",
  titleId
}: SectionHeaderProps) {
  return (
    <div className={`space-y-3 ${centered ? "text-center max-w-3xl mx-auto" : "max-w-3xl"} ${className}`}>
      <span className="font-mono text-xs font-bold text-blue-700 uppercase tracking-widest block">
        {kicker}
      </span>
      <h2
        id={titleId}
        className="font-display italic text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900"
      >
        {title}
      </h2>
      {description && (
        <p className="font-sans text-base text-slate-600 leading-relaxed mt-2">
          {description}
        </p>
      )}
    </div>
  );
}
