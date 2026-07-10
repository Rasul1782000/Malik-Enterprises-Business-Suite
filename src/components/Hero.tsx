import { ActiveTab } from "../types";
import { ArrowUpRight, Landmark, Award } from "lucide-react";
import heroIndustrial from "../assets/images/hero_industrial_1783725218266.jpg";

interface HeroProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Hero({ setActiveTab }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-vn-surface py-16 sm:py-24 lg:py-32" id="hero-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-8 z-10">
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center space-x-2 rounded-pill bg-vn-card px-[16px] py-[6px] text-[10px] font-mono font-medium text-vn-tertiary border border-white/5 uppercase tracking-widest">
                <Landmark className="h-3 w-3" />
                <span>Multan, Pakistan</span>
              </span>
              <span className="inline-flex items-center space-x-2 rounded-pill bg-vn-card px-[16px] py-[6px] text-[10px] font-mono font-medium text-vn-secondary border border-white/5 uppercase tracking-widest">
                <Award className="h-3 w-3" />
                <span>Est. 1998</span>
              </span>
            </div>

            <h1 className="font-display italic text-6xl tracking-tight text-vn-primary sm:text-7xl lg:text-[6rem] leading-[0.96]" id="hero-heading">
              Industrial <br /> Progress
            </h1>

            <p className="font-sans text-base text-vn-secondary max-w-lg leading-relaxed">
              Based in the heart of Multan's Industrial Estate, Malik Enterprises operates at the intersection of general merchandise logistics, precision polymer plastics manufacturing, and high-performance industrial machinery maintenance. 
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                id="hero-cta-services"
                onClick={() => setActiveTab("services")}
                className="inline-flex items-center space-x-2 text-[13px] font-semibold text-vn-surface bg-vn-primary px-[22px] py-[11px] rounded-pill shadow-vn-btn transition-all hover:brightness-95"
              >
                <span>Explore Divisions</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button
                id="hero-cta-careers"
                onClick={() => setActiveTab("careers")}
                className="inline-flex items-center space-x-2 text-[13px] font-medium text-vn-primary bg-vn-card border border-white/10 px-[22px] py-[11px] rounded-pill transition-all hover:border-white/20"
              >
                <span>Join Our Team</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6" id="hero-interactive-preview">
            <div className="relative rounded-lg overflow-hidden border border-white/10 shadow-vn-card aspect-[4/5] sm:aspect-auto sm:h-[600px] group">
              <img 
                src={heroIndustrial} 
                alt="Industrial factory floor" 
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vn-surface/90 via-vn-surface/20 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6">
                 <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                   <span className="font-display italic text-2xl text-vn-primary">Heavy Machinery</span>
                   <span className="font-mono text-[10px] text-vn-tertiary uppercase tracking-widest">Active</span>
                 </div>
                 <div className="flex items-end justify-between">
                   <p className="font-sans text-sm text-vn-secondary max-w-xs">
                     Precision engineering and maintenance operations ensuring continuous industrial output.
                   </p>
                   <div className="flex space-x-1">
                     <div className="h-4 w-[3px] bg-vn-tertiary"></div>
                     <div className="h-2 w-[3px] bg-vn-primary/20"></div>
                     <div className="h-3 w-[3px] bg-vn-primary/20"></div>
                     <div className="h-1 w-[3px] bg-vn-primary/20"></div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
