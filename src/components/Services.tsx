import { useState } from "react";
import { Division } from "../types";
import { DIVISIONS_DATA } from "../data/divisions";
import { 
  Building, 
  Package, 
  Settings, 
  CheckCircle2, 
  ArrowRight, 
  Warehouse, 
  Cpu
} from "lucide-react";

export function Services() {
  const [activeDivId, setActiveDivId] = useState<string>(DIVISIONS_DATA[0].id);
  const activeDiv: Division = DIVISIONS_DATA.find(d => d.id === activeDivId) || DIVISIONS_DATA[0];

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Warehouse":
        return Warehouse;
      case "Package":
        return Package;
      case "Settings":
        return Settings;
      default:
        return Building;
    }
  };

  return (
    <section className="bg-slate-50/70 py-16 sm:py-20 border-b border-slate-200" id="divisions-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-blue-700 bg-blue-50 border border-blue-200/80 px-2.5 py-1 rounded mb-3">
            <span>OPERATIONAL CAPABILITIES & DIVISIONS</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900" id="divisions-heading">
            Engineering Precision & Production Infrastructure
          </h2>
          <p className="font-sans text-base text-slate-600 mt-3 leading-relaxed">
            Headquartered in Multan’s Phase-1 Industrial Estate, Malik Enterprises operates three dedicated commercial divisions engineered for rigorous industrial throughput and certified quality assurance.
          </p>
        </div>

        {/* Division Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8" id="division-tabs">
          {DIVISIONS_DATA.map((division, idx) => {
            const IconComp = getIconComponent(division.icon);
            const isActive = division.id === activeDivId;
            return (
              <button
                key={division.id}
                id={`tab-btn-${division.id}`}
                onClick={() => setActiveDivId(division.id)}
                className={`flex items-center justify-between p-4 rounded-lg border text-left transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-white border-blue-600 shadow-sm ring-1 ring-blue-600"
                    : "bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white text-slate-700"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-md ${isActive ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-600"}`}>
                    <IconComp className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block">
                      DIVISION 0{idx + 1}
                    </span>
                    <span className={`text-sm font-bold block ${isActive ? "text-blue-700" : "text-slate-900"}`}>
                      {division.name}
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs text-slate-400">
                  {division.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Division Engineering Dossier */}
        <div 
          className="rounded-xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-sm" 
          key={activeDiv.id}
          id="active-division-panel"
        >
          {/* Dual Production Photography Viewport */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-8">
            {activeDiv.primaryImage && (
              <div className="md:col-span-7 rounded-lg overflow-hidden h-60 sm:h-72 border border-slate-200 relative group">
                <img 
                  src={activeDiv.primaryImage} 
                  alt={`${activeDiv.name} primary facility`} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102" 
                />
                <div className="absolute bottom-3 left-3 bg-slate-900/90 text-white text-[11px] font-mono px-2.5 py-1 rounded">
                  PRIMARY FACILITY · MULTAN ESTATE
                </div>
              </div>
            )}

            {activeDiv.secondaryImage && (
              <div className="md:col-span-5 rounded-lg overflow-hidden h-60 sm:h-72 border border-slate-200 relative group">
                <img 
                  src={activeDiv.secondaryImage} 
                  alt={`${activeDiv.name} secondary operations`} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102" 
                />
                <div className="absolute bottom-3 left-3 bg-slate-900/90 text-white text-[11px] font-mono px-2.5 py-1 rounded">
                  QUALITY & AUTOMATION CELL
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Left Specs & Descriptions */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="font-mono text-xs font-semibold text-blue-700 uppercase tracking-wider block mb-1">
                  Scope of Work & Capabilities
                </span>
                <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {activeDiv.name}
                </h3>
              </div>

              <p className="font-sans text-base text-slate-600 leading-relaxed">
                {activeDiv.fullDesc}
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="font-sans text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Verified Manufacturing Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeDiv.highlights.map((hl, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50/80 p-3 rounded-md border border-slate-200/70">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                      <span className="font-medium leading-snug">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Technical Specifications Card */}
            <div className="lg:col-span-5">
              <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-6">
                
                <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 mb-4">
                  <Cpu className="h-4 w-4 text-blue-700" />
                  <h4 className="font-mono text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Engineering Specs & Tolerances
                  </h4>
                </div>

                <div className="space-y-3">
                  {activeDiv.capabilities.map((cap, idx) => (
                    <div key={idx} className="bg-white p-3 rounded border border-slate-200/80 flex items-start space-x-3">
                      <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200/60 shrink-0">
                        0{idx + 1}
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-slate-700 leading-snug">{cap}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>METRIC: {activeDiv.technicalMetric}</span>
                  <span className="text-blue-700 font-semibold inline-flex items-center space-x-1">
                    <span>Active Lines</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Services;
