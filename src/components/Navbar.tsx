import { ActiveTab } from "../types";
import { Layers, Users, Mail, Compass, Info } from "lucide-react";

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const navItems: { id: ActiveTab; label: string; icon: any }[] = [
    { id: "home", label: "Home", icon: Compass },
    { id: "about", label: "About Us", icon: Info },
    { id: "services", label: "Products", icon: Layers },
    { id: "careers", label: "Careers", icon: Users },
    { id: "contact", label: "Contact Us", icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-vn-surface/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Brand */}
        <div 
          onClick={() => setActiveTab("home")} 
          className="flex cursor-pointer items-center space-x-3"
          id="brand-logo"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-vn-card text-vn-primary border border-white/10 transition-transform hover:scale-105">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display text-xl tracking-tight text-vn-primary leading-none">
              MALIK
            </h1>
            <span className="font-mono text-[10px] font-medium tracking-widest text-vn-tertiary uppercase leading-none block mt-1">
              ENTERPRISES
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="hidden md:flex space-x-2" id="desktop-nav">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-4 py-2 text-[13px] font-medium transition-all duration-300 ${
                  isActive
                    ? "text-vn-tertiary"
                    : "text-vn-secondary hover:text-vn-primary"
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-vn-tertiary rounded-t-sm" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Nav Rail */}
      <div className="md:hidden border-t border-white/5 bg-vn-neutral/95 backdrop-blur-md">
        <div className="flex justify-around py-3 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center space-y-1.5 rounded-md py-1 px-3 text-[11px] font-medium transition-all ${
                  isActive
                    ? "text-vn-tertiary"
                    : "text-vn-secondary hover:text-vn-primary"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-vn-tertiary" : "text-vn-secondary"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
