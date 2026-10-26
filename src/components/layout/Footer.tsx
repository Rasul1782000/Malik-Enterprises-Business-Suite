import { Layers, Award, MapPin, Mail, Clock } from "lucide-react";
import { ActiveTab } from "../../types";
import { COMPANY_DETAILS } from "../../data/company";
import { FOOTER_DIRECTORY_LINKS } from "../../data/navigation";

interface FooterProps {
  onSelectTab: (tab: ActiveTab) => void;
}

export function Footer({ onSelectTab }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-16" id="app-footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 border-b border-slate-800 pb-12 mb-12">
          
          {/* Brand & Executive Details */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-display text-xl font-bold tracking-tight text-white leading-none">
                  MALIK ENTERPRISES
                </h4>
                <span className="text-[10px] font-semibold text-blue-400 tracking-widest uppercase block mt-1 font-mono">
                  Certified Industrial Group · Multan
                </span>
              </div>
            </div>
            
            <p className="font-sans text-sm text-slate-400 leading-relaxed max-w-sm mt-4">
              A multi-disciplinary industrial leader specializing in polymer plastic manufacturing, commercial machinery overhaul, and general merchandise supply chain operations.
            </p>

            <div className="flex items-center space-x-2 text-sm text-slate-300 mt-4">
              <Award className="h-4 w-4 text-blue-400 shrink-0" />
              <span>Executive Lead: <strong>{COMPANY_DETAILS.executiveDirector}</strong></span>
            </div>
          </div>

          {/* Directory Navigation */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="font-mono text-xs font-bold uppercase tracking-widest text-white">
              Operations Directory
            </h5>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_DIRECTORY_LINKS.map((link) => (
                <li key={link.tab}>
                  <button 
                    onClick={() => onSelectTab(link.tab)} 
                    className="hover:text-white transition-colors text-slate-400 text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Address & Facility Information */}
          <div className="md:col-span-4 space-y-4">
            <h5 className="font-mono text-xs font-bold uppercase tracking-widest text-white">
              Industrial Hub Address
            </h5>
            <div className="space-y-3.5 text-sm text-slate-300 font-sans">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  {COMPANY_DETAILS.address}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 shrink-0" />
                <span className="font-mono text-white">{COMPANY_DETAILS.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-blue-400 shrink-0" />
                <span>{COMPANY_DETAILS.hours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal & Compliance Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            <span>© {new Date().getFullYear()} {COMPANY_DETAILS.name}. All rights reserved. Industrial Estate Phase-1, Multan.</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-mono text-[11px] text-blue-400">{COMPANY_DETAILS.registration}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
