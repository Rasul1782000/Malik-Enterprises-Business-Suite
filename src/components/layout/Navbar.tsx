import { ActiveTab } from "../../types";
import { NAVIGATION_ITEMS } from "../../data/navigation";
import { ArrowUpRight, Cpu } from "lucide-react";

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Pure Brand Wordmark */}
        <button 
          onClick={() => setActiveTab("home")} 
          className="flex items-center space-x-3 text-left group cursor-pointer focus:outline-none"
          id="brand-logo"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-700 text-white shadow-xs transition-colors duration-200 group-hover:bg-blue-800">
            <Cpu className="h-5 w-5" />
          </div>
          <div>
            <span className="font-sans text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors block">
              Malik Enterprises
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 block">
              Industrial Manufacturing & Logistics
            </span>
          </div>
        </button>

        {/* Zone 2: Single-Line Unboxed Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1" id="desktop-nav">
          {NAVIGATION_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-3.5 py-2 text-[13px] font-medium transition-colors duration-150 rounded-md whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "text-blue-700 font-semibold bg-blue-50/80"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-blue-700 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single High-Intent Action Button & Operations link */}
        <div className="hidden sm:flex items-center space-x-3">
          <button
            onClick={() => setActiveTab("admin")}
            className={`px-3 py-1.5 text-xs font-mono transition-colors rounded-md cursor-pointer ${
              activeTab === "admin"
                ? "text-blue-700 bg-blue-50 font-bold"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            }`}
          >
            Command Desk
          </button>
          
          <button
            id="nav-cta-contact"
            onClick={() => setActiveTab("contact")}
            className="inline-flex items-center space-x-2 text-[13px] font-semibold text-white bg-blue-700 hover:bg-blue-800 px-4 py-2.5 rounded-md shadow-xs hover:shadow-sm transition-all duration-150 cursor-pointer"
          >
            <span>Request Manufacturing Quote</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

      </div>

      {/* Mobile Navigation Rail */}
      <div className="md:hidden border-t border-slate-200/90 bg-white/95 px-2 py-2">
        <div className="flex justify-between items-center text-xs">
          {NAVIGATION_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`py-1.5 px-3 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "text-blue-700 font-bold bg-blue-50"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <button
            onClick={() => setActiveTab("admin")}
            className={`py-1.5 px-2.5 rounded-md text-[10px] font-mono cursor-pointer ${
              activeTab === "admin" ? "text-blue-700 font-bold bg-blue-50" : "text-slate-500"
            }`}
          >
            Desk
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
