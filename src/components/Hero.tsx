import { useRef, useState } from "react";
import { ActiveTab } from "../types";
import { ArrowUpRight, CheckCircle2, Activity } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { HERO_SHOWCASE_ITEMS } from "../data/infrastructure";

export interface HeroProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export function Hero({ setActiveTab }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  // Subtle parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const bgTextureY = useTransform(scrollYProgress, [0, 1], ["0px", "40px"]);

  const currentShowcase = HERO_SHOWCASE_ITEMS[activeImageIdx] || HERO_SHOWCASE_ITEMS[0];

  return (
    <section 
      ref={containerRef}
      className="relative overflow-hidden bg-slate-50/70 py-12 sm:py-16 lg:py-20 border-b border-slate-200" 
      id="hero-section"
    >
      {/* Blueprint Grid Overlay */}
      <motion.div 
        style={{ y: bgTextureY }}
        className="absolute inset-0 bg-grid-blue opacity-50 pointer-events-none" 
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headline and Enterprise Proposition */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Location & Certification Lockup */}
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-md shadow-2xs">
              <span className="font-semibold text-blue-700">Multan Industrial Estate Phase-1</span>
              <span className="text-slate-300">·</span>
              <span>ISO 9001 Certified Operations</span>
            </div>

            <div className="space-y-3">
              <h1 
                className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08] text-balance" 
                id="hero-heading"
              >
                Industrial Engineering <br />
                <span className="text-blue-700">
                  & Production Scale.
                </span>
              </h1>
            </div>

            <p className="font-sans text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Operating from Southern Punjab's industrial epicenter, Malik Enterprises engineers high-capacity polymer products, precision heavy machinery rebuilds, and institutional merchandise supply lines.
            </p>

            {/* Direct Outcome CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                id="hero-cta-services"
                onClick={() => setActiveTab("services")}
                className="inline-flex items-center space-x-2 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 px-6 py-3 rounded-md shadow-xs transition-all duration-150 cursor-pointer"
              >
                <span>Explore Industrial Divisions</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
              
              <button
                id="hero-cta-contact"
                onClick={() => setActiveTab("contact")}
                className="inline-flex items-center space-x-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-100 hover:text-slate-900 border border-slate-300 px-5 py-3 rounded-md transition-colors duration-150 cursor-pointer"
              >
                <span>Consult Operations Desk</span>
              </button>
            </div>

            {/* Credential Checks */}
            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600 font-sans">
              <span className="inline-flex items-center space-x-1.5">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                <span>SECP Registered Corporation</span>
              </span>
              <span className="inline-flex items-center space-x-1.5">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                <span>Direct Factory Production</span>
              </span>
              <span className="inline-flex items-center space-x-1.5">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                <span>Established 1998</span>
              </span>
            </div>

          </div>

          {/* Right Column: Hero Visual with Real Facility Photography & Telemetry */}
          <div className="lg:col-span-6" id="hero-interactive-preview">
            
            <div className="relative rounded-xl overflow-hidden border border-slate-200/90 bg-white shadow-lg flex flex-col">
              
              {/* Header Viewport Bar */}
              <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-semibold tracking-wider text-slate-200">
                    FACILITY VIEWPORT
                  </span>
                  <span className="text-slate-600">|</span>
                  <span className="font-mono text-[11px] text-blue-300">
                    {currentShowcase.tag}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[11px]">FEED ACTIVE</span>
                </div>
              </div>

              {/* Viewport Photography Container */}
              <div className="relative h-[340px] sm:h-[390px] bg-slate-950 overflow-hidden flex items-center justify-center">
                <div className="w-full h-full relative overflow-hidden">
                  <motion.div 
                    style={{ y: heroImageY }}
                    className="absolute -top-[10%] -bottom-[10%] inset-x-0 w-full"
                  >
                    <img 
                      src={currentShowcase.img} 
                      alt={currentShowcase.title} 
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />
                  
                  {/* Floating Telemetry Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center space-x-1.5 bg-slate-900/80 backdrop-blur-xs text-slate-200 text-[10px] font-mono px-2.5 py-1 rounded border border-white/10 shadow-xs">
                      <Activity className="h-3 w-3 text-emerald-400" />
                      <span>PHASE-1 PLANT FLOOR</span>
                    </span>
                  </div>

                  {/* Caption Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="bg-slate-900/90 backdrop-blur-xs rounded-lg p-3.5 border border-white/10 shadow-md">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <span className="font-sans text-sm font-bold text-white block">
                            {currentShowcase.title}
                          </span>
                          <span className="font-mono text-xs text-blue-300 block mt-0.5">
                            Division Sector: {currentShowcase.tag}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-blue-300 uppercase tracking-wider bg-blue-950/70 px-2.5 py-1 rounded border border-blue-400/30 whitespace-nowrap shrink-0">
                          {currentShowcase.metric}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Viewport Sub-bar with Angle / Facility Sector Switchers */}
              <div className="bg-slate-900/95 border-t border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs text-slate-300 font-mono">
                <span className="text-[11px] text-slate-400">SELECT FACILITY SECTOR:</span>
                <div className="flex space-x-2">
                  {HERO_SHOWCASE_ITEMS.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`px-3 py-1 text-[11px] rounded transition-all duration-150 cursor-pointer ${
                        activeImageIdx === idx 
                          ? "bg-blue-600 text-white font-bold shadow-xs" 
                          : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
                      }`}
                    >
                      0{idx + 1} {item.tag.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* 4-Column Balanced Tabular Metric Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-200">
          <div className="bg-white p-4 rounded-lg border border-slate-200/80 shadow-2xs">
            <span className="font-mono text-2xl sm:text-3xl font-extrabold text-slate-900 block">100K+</span>
            <span className="font-mono text-[11px] font-semibold text-blue-700 uppercase tracking-wider block mt-1">Sq Ft Footprint</span>
            <span className="font-sans text-xs text-slate-500 mt-0.5 block">Multan Phase-1 Industrial Estate</span>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200/80 shadow-2xs">
            <span className="font-mono text-2xl sm:text-3xl font-extrabold text-blue-700 block">800T</span>
            <span className="font-mono text-[11px] font-semibold text-blue-700 uppercase tracking-wider block mt-1">Clamp Force</span>
            <span className="font-sans text-xs text-slate-500 mt-0.5 block">High-tonnage injection molding lines</span>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200/80 shadow-2xs">
            <span className="font-mono text-2xl sm:text-3xl font-extrabold text-slate-900 block">ISO 9001</span>
            <span className="font-mono text-[11px] font-semibold text-blue-700 uppercase tracking-wider block mt-1">Quality Certified</span>
            <span className="font-sans text-xs text-slate-500 mt-0.5 block">Audited tolerances & QA protocols</span>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200/80 shadow-2xs">
            <span className="font-mono text-2xl sm:text-3xl font-extrabold text-slate-900 block">28+</span>
            <span className="font-mono text-[11px] font-semibold text-blue-700 uppercase tracking-wider block mt-1">Years Continuous</span>
            <span className="font-sans text-xs text-slate-500 mt-0.5 block">Established operational history in 1998</span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
