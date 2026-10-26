import { CheckCircle2 } from "lucide-react";
import teamMeeting from "../assets/images/industrial_team_meeting_1783725697388.jpg";
import engineerClipboard from "../assets/images/engineer_clipboard_1783725793310.jpg";
import hqExterior from "../assets/images/headquarters_exterior_1783725814569.jpg";
import { LEADERSHIP_HIGHLIGHTS, COMPANY_MILESTONES, COMPANY_DETAILS } from "../data/company";

export function About() {
  return (
    <section className="bg-slate-50 py-16 sm:py-24 border-b border-slate-200" id="about-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Intro with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-5">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-blue-700 block">
              CORPORATE PROFILE & GOVERNANCE
            </span>
            <h2 className="font-display italic text-4xl sm:text-5xl font-bold tracking-tight text-slate-900" id="about-heading">
              A Multi-Disciplinary Industrial Leader
            </h2>
            <p className="font-sans text-base text-slate-600 leading-relaxed">
              Founded with an uncompromising commitment to manufacturing precision and supply chain reliability, <strong>{COMPANY_DETAILS.name}</strong> has grown into an industrial anchor within Multan’s Phase-1 Industrial Estate. 
            </p>
            <p className="font-sans text-base text-slate-600 leading-relaxed">
              Under the stewardship of Key Principal <strong>{COMPANY_DETAILS.executiveDirector}</strong>, our engineering teams deploy automated polymer fabrication lines, heavy mechanical repair crews, and enterprise warehousing infrastructure to serve commercial clients nationwide.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-700">
              <span className="inline-flex items-center space-x-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded border border-blue-200 font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                <span>SECP Incorporated</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-white text-slate-800 px-3 py-1 rounded border border-slate-200 font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                <span>Multan Chamber of Commerce</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-white text-slate-800 px-3 py-1 rounded border border-slate-200 font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                <span>{COMPANY_DETAILS.isoStandard}</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-md h-72 lg:h-96 group">
              <img 
                src={hqExterior} 
                alt={`${COMPANY_DETAILS.name} Headquarters`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="font-mono text-[10px] text-blue-300 uppercase tracking-widest block font-bold">
                  HEADQUARTERS & MANUFACTURING COMPLEX
                </span>
                <span className="font-sans text-sm font-semibold block mt-0.5">
                  {COMPANY_DETAILS.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dual Industrial Photos & Team Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col sm:flex-row">
            <div className="sm:w-1/2 h-52 sm:h-auto overflow-hidden">
              <img 
                src={teamMeeting} 
                alt="Executive Engineering Leadership" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="sm:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] font-bold text-blue-700 uppercase tracking-wider block mb-1">
                  EXECUTIVE GOVERNANCE
                </span>
                <h4 className="font-bold text-base text-slate-900 mb-2">
                  Engineering Leadership
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our management aligns material scientists, mechanical machinists, and procurement strategists for seamless client project delivery.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-[11px] font-mono text-slate-500 mt-4">
                LED BY {COMPANY_DETAILS.executiveDirector.toUpperCase()}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col sm:flex-row">
            <div className="sm:w-1/2 h-52 sm:h-auto overflow-hidden">
              <img 
                src={engineerClipboard} 
                alt="Quality Inspection on Plant Floor" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="sm:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] font-bold text-blue-700 uppercase tracking-wider block mb-1">
                  PROCESS VERIFICATION
                </span>
                <h4 className="font-bold text-base text-slate-900 mb-2">
                  Zero-Tolerance Quality
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every polymer batch and repaired drivetrain is audited using digital calipers, optical sensors, and stress test rigs before dispatch.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-[11px] font-mono text-slate-500 mt-4">
                100% AUDIT SATISFACTION
              </div>
            </div>
          </div>
        </div>

        {/* Core Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {LEADERSHIP_HIGHLIGHTS.map((hl, idx) => {
            const Icon = hl.icon;
            return (
              <div 
                key={idx}
                id={`about-highlight-${idx}`}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-700 mb-5 border border-blue-100">
                  <Icon className="h-6 w-6" />
                </div>
                
                <h3 className="font-sans text-lg font-bold text-slate-900 leading-snug">
                  {hl.title}
                </h3>
                
                <span className="text-[11px] font-mono font-semibold text-blue-700 uppercase tracking-wider mt-1 mb-3 block">
                  {hl.role}
                </span>

                <p className="font-sans text-sm text-slate-600 leading-relaxed mt-auto">
                  {hl.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Historical Evolution Milestones */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-8 sm:p-10 shadow-sm mb-16">
          <div className="max-w-2xl mb-8">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-blue-700 block mb-1">
              CHRONOLOGY & EXPANSION
            </span>
            <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-slate-900">
              Three Decades of Industrial Growth
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COMPANY_MILESTONES.map((m, idx) => (
              <div key={idx} className="bg-slate-50/70 p-4 rounded-lg border border-slate-200/80">
                <span className="font-mono text-xl font-extrabold text-blue-700 block">
                  {m.year}
                </span>
                <h4 className="font-bold text-sm text-slate-900 mt-1">
                  {m.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-sans">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Pledge Banner */}
        <div className="rounded-xl bg-slate-900 text-white p-8 sm:p-12 shadow-md relative overflow-hidden border border-slate-800">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-blue-300 bg-blue-950/80 border border-blue-800/80 px-2.5 py-1 rounded mb-4">
              <span>EXECUTIVE GOVERNANCE PLEDGE</span>
            </div>
            <h3 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 text-white">
              Precision, Production Reliability, and Long-Term Partnership
            </h3>
            <div className="bg-slate-800/80 p-5 rounded-lg border border-slate-700 my-6">
              <p className="font-sans text-base text-slate-200 leading-relaxed italic">
                "Our business is built upon tangible precision. Whether manufacturing food-grade containers, re-machining an industrial gearbox, or shipping palletized merchandise across Southern Punjab, we prioritize client confidence and engineering excellence above all else."
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-6">
              <div className="h-10 w-10 rounded-lg bg-blue-700 flex items-center justify-center font-sans text-sm font-bold text-white">
                ME
              </div>
              <div>
                <span className="text-sm font-bold block text-white">{COMPANY_DETAILS.executiveDirector}</span>
                <span className="text-[11px] text-blue-300 font-mono uppercase tracking-wider block">Principal Executive · {COMPANY_DETAILS.name}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default About;
