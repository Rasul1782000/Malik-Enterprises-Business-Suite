import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Careers from "./components/Careers";
import Contact from "./components/Contact";
import AdminPortal from "./components/AdminPortal";
import { ActiveTab } from "./types";
import { 
  MapPin, 
  Mail, 
  Layers, 
  Award,
  ArrowUpRight
} from "lucide-react";

const getTabFromPathname = (pathname: string): ActiveTab => {
  if (pathname === "/aboutus.html") return "about";
  if (pathname === "/products.html") return "services";
  if (pathname === "/careers.html") return "careers";
  if (pathname === "/contactus.html") return "contact";
  if (pathname === "/admin.html" || pathname === "/admin") return "admin";
  return "home";
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    return getTabFromPathname(window.location.pathname);
  });
  // Removed API Connected state/badge

  useEffect(() => {
    const handlePopState = () => {
      setActiveTab(getTabFromPathname(window.location.pathname));
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleSetTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    
    let path = "/index.html";
    if (tab === "about") path = "/aboutus.html";
    else if (tab === "services") path = "/products.html";
    else if (tab === "careers") path = "/careers.html";
    else if (tab === "contact") path = "/contactus.html";
    else if (tab === "admin") path = "/admin.html";
    else path = "/index.html";

    window.history.pushState(null, "", path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-vn-surface flex flex-col font-sans selection:bg-vn-tertiary selection:text-vn-surface text-vn-primary" id="main-application-frame">
      <Navbar activeTab={activeTab} setActiveTab={handleSetTab} />

      <main className="flex-grow">
        {activeTab === "home" && (
          <div className="space-y-0" id="home-view">
            <Hero setActiveTab={handleSetTab} />
            
            <section className="bg-vn-neutral py-24 border-y border-vn-card">
              <div className="mx-auto max-w-5xl px-4 text-center">
                <span className="font-mono text-xs font-bold text-vn-tertiary uppercase tracking-widest block mb-2">
                  MALIK ENTERPRISES AT A GLANCE
                </span>
                <h3 className="font-display italic text-5xl text-vn-primary sm:text-6xl mt-4">
                  Leading Pakistan's Plastics & Sourcing
                </h3>
                <p className="font-sans text-base text-vn-secondary mt-6 leading-relaxed max-w-3xl mx-auto">
                  From our advanced industrial plant in Multan Phase-1 Industrial Estate, we deploy automated polymer solutions, high-grade sourcing hubs, and certified machinery repair systems to deliver lasting quality across Southern Punjab and beyond.
                </p>
                <div className="mt-8">
                  <button
                    id="home-about-readmore"
                    onClick={() => handleSetTab("about")}
                    className="inline-flex items-center space-x-2 text-[13px] font-semibold text-vn-surface bg-vn-primary px-[22px] py-[11px] rounded-pill shadow-vn-btn transition-all"
                  >
                    <span>Read Our Core Pledge & History</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </section>
            
            <section className="bg-vn-surface py-24 text-center border-b border-vn-card">
              <div className="mx-auto max-w-5xl px-4">
                <span className="font-mono text-xs font-bold text-vn-tertiary uppercase tracking-widest block mb-2">
                  Unified Industrial Leadership
                </span>
                <h3 className="font-display italic text-4xl text-vn-primary sm:text-5xl mt-4">
                  Ready to Experience Malik Enterprises?
                </h3>
                <p className="text-base text-vn-secondary mt-4 max-w-2xl mx-auto leading-relaxed">
                  Review our customizable polymer plastics configurations, explore open engineering roles, or send custom general merchandise sourcing requirements to our executive desks.
                </p>
                <div className="flex justify-center space-x-4 mt-8">
                  <button
                    id="home-splicer-services"
                    onClick={() => handleSetTab("services")}
                    className="inline-flex items-center space-x-2 text-[13px] font-semibold text-vn-surface bg-vn-primary px-[22px] py-[11px] rounded-pill shadow-vn-btn transition-all"
                  >
                    <span>View Division Details</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                  <button
                    id="home-splicer-contact"
                    onClick={() => handleSetTab("contact")}
                    className="inline-flex items-center space-x-2 text-[13px] font-medium text-vn-primary bg-vn-card border border-white/10 px-[22px] py-[11px] rounded-pill transition-all"
                  >
                    <span>Contact Operations</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === "about" && <About />}
        {activeTab === "services" && <Services />}
        {activeTab === "careers" && <Careers />}
        {activeTab === "contact" && <Contact />}
        {activeTab === "admin" && <AdminPortal />}
      </main>

      <footer className="bg-vn-surface text-vn-secondary border-t border-white/5 py-12 md:py-24" id="app-footer">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 border-b border-white/5 pb-12 mb-12">
            
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-vn-card text-vn-primary border border-white/10">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-xl tracking-tight text-vn-primary leading-none">
                    MALIK ENTERPRISES
                  </h4>
                  <span className="text-[10px] font-medium text-vn-tertiary tracking-widest uppercase block mt-1 font-mono">
                    Certified Industrial Group
                  </span>
                </div>
              </div>
              
              <p className="font-sans text-sm text-vn-secondary leading-relaxed max-w-sm mt-4">
                A multi-disciplinary leader specializing in general merchandise logistics, polymer plastic manufacturing, and commercial industrial machinery maintenance in Multan, Pakistan.
              </p>

              <div className="flex items-center space-x-2 text-sm text-vn-secondary mt-4">
                <Award className="h-4 w-4 text-vn-tertiary shrink-0" />
                <span>Executive Lead: Malik Faisal Azeem</span>
              </div>
            </div>

            <div className="md:col-span-3 space-y-6">
              <h5 className="font-mono text-[10px] font-medium uppercase tracking-widest text-vn-primary">
                Operations Directory
              </h5>
              <ul className="space-y-3 text-sm">
                <li>
                  <button 
                    onClick={() => handleSetTab("home")} 
                    className="hover:text-vn-primary transition-colors text-vn-secondary"
                  >
                    Corporate Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleSetTab("about")} 
                    className="hover:text-vn-primary transition-colors text-vn-secondary"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleSetTab("services")} 
                    className="hover:text-vn-primary transition-colors text-vn-secondary"
                  >
                    Business Divisions
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleSetTab("careers")} 
                    className="hover:text-vn-primary transition-colors text-vn-secondary"
                  >
                    Open Careers positions
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleSetTab("contact")} 
                    className="hover:text-vn-primary transition-colors text-vn-secondary"
                  >
                    Get in Touch
                  </button>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-6">
              <h5 className="font-mono text-[10px] font-medium uppercase tracking-widest text-vn-primary">
                Industrial Hub Address
              </h5>
              <div className="space-y-4 text-sm text-vn-secondary font-sans">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-vn-tertiary shrink-0 mt-0.5" />
                  <span>
                    46-C Industrial Estate Phase-1, Sher Shah Town, Multan, 60000 Pakistan
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-vn-tertiary shrink-0" />
                  <span className="font-mono text-vn-primary">info@malikenterprises.com.pk</span>
                </div>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-vn-secondary gap-4">
            <div>
              <span>© {new Date().getFullYear()} Malik Enterprises. All rights reserved.</span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
