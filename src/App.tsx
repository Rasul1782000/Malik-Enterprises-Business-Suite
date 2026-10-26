import { Navbar, Footer, Hero, About, Services, Contact, AdminPortal } from "./components";
import { useNavigation } from "./hooks";
import { DIVISIONS_DATA, INFRASTRUCTURE_HIGHLIGHTS, COMPANY_DETAILS } from "./data";
import { 
  ArrowUpRight, 
  Boxes, 
  Wrench, 
  Cpu 
} from "lucide-react";

export default function App() {
  const { activeTab, setActiveTab } = useNavigation();

  const getDivisionIcon = (id: string) => {
    switch (id) {
      case "div-plastics":
        return Boxes;
      case "div-machinery":
        return Wrench;
      case "div-sourcing":
      default:
        return Cpu;
    }
  };

  const getDivisionCategory = (id: string) => {
    switch (id) {
      case "div-plastics":
        return "Polymers & Plastics";
      case "div-machinery":
        return "Mechanical Overhaul";
      case "div-sourcing":
      default:
        return "Logistics Hub";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-600 selection:text-white text-slate-900" id="main-application-frame">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-grow">
        {activeTab === "home" && (
          <div className="space-y-0" id="home-view">
            <Hero setActiveTab={setActiveTab} />
            
            {/* Enterprise Summary Section */}
            <section className="bg-white py-16 sm:py-20 border-b border-slate-200">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-12">
                  <span className="font-mono text-xs font-bold text-blue-700 uppercase tracking-wider block mb-2">
                    Industrial Capabilities & Operations
                  </span>
                  <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-900">
                    Integrated Manufacturing & Engineering Infrastructure
                  </h2>
                  <p className="font-sans text-base text-slate-600 mt-3 leading-relaxed">
                    Operating from Multan's Phase-1 Industrial Estate, Malik Enterprises delivers high-output contract manufacturing, precision mechanical overhaul, and enterprise distribution across Southern Punjab.
                  </p>
                </div>

                {/* 3 Core Divisions Cards with Image Previews */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {DIVISIONS_DATA.map((div, idx) => {
                    const DivIcon = getDivisionIcon(div.id);
                    return (
                      <div 
                        key={div.id}
                        className="rounded-xl border border-slate-200/90 bg-white p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-200"
                      >
                        <div>
                          <div className="relative rounded-lg overflow-hidden h-48 mb-5 border border-slate-200">
                            <img 
                              src={div.primaryImage || div.image} 
                              alt={div.name} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-2.5 left-2.5 bg-slate-900/90 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                              DIVISION 0{idx + 1}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-blue-700 font-mono text-xs font-semibold uppercase mb-1">
                            <DivIcon className="h-4 w-4" />
                            <span>{getDivisionCategory(div.id)}</span>
                          </div>
                          
                          <h3 className="text-lg font-bold text-slate-900 mb-2">
                            {div.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                            {div.shortDesc}
                          </p>
                        </div>

                        <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-mono text-slate-500">{div.technicalMetric}</span>
                          <button 
                            onClick={() => setActiveTab("services")}
                            className="inline-flex items-center space-x-1 text-xs font-bold text-blue-700 hover:text-blue-800 cursor-pointer"
                          >
                            <span>Specifications</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Expanded Industrial Infrastructure Gallery */}
            <section className="bg-slate-50/70 py-16 sm:py-20 border-b border-slate-200">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
                  <div className="max-w-2xl">
                    <span className="font-mono text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">
                      OPERATIONAL ASSETS
                    </span>
                    <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-slate-900">
                      Industrial Facility & Equipment Showcase
                    </h2>
                    <p className="text-sm text-slate-600 mt-2 font-sans">
                      A visual tour of our Multan production lines, CNC machining centers, and logistics hubs.
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <button
                      onClick={() => setActiveTab("contact")}
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 px-4 py-2.5 rounded-md shadow-xs transition-colors cursor-pointer"
                    >
                      <span>Schedule Plant Inspection</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {INFRASTRUCTURE_HIGHLIGHTS.map((item, idx) => (
                    <div 
                      key={idx}
                      className="bg-white rounded-lg overflow-hidden border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow flex flex-col"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-slate-900/85 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                          {item.stat}
                        </div>
                      </div>
                      <div className="p-4 flex flex-col flex-grow justify-between">
                        <div>
                          <span className="font-mono text-[10px] font-bold text-blue-700 uppercase tracking-wider block mb-1">
                            {item.category}
                          </span>
                          <h4 className="font-bold text-sm text-slate-900 mb-1 leading-snug">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed font-sans">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Direct Corporate Engagement Banner */}
            <section className="bg-white py-16 text-center border-b border-slate-200">
              <div className="mx-auto max-w-4xl px-4">
                <span className="font-mono text-xs font-bold text-blue-700 uppercase tracking-wider block mb-2">
                  DIRECT CORPORATE ENGAGEMENT
                </span>
                <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Partner with {COMPANY_DETAILS.name}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-2xl mx-auto leading-relaxed font-sans">
                  Discuss bulk contract manufacturing, high-density polymer orders, or schedule preventative machinery diagnostics with our engineering lead.
                </p>
                <div className="flex flex-wrap justify-center gap-3.5 mt-8">
                  <button
                    id="home-splicer-services"
                    onClick={() => setActiveTab("services")}
                    className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 px-5 py-2.5 rounded-md shadow-xs transition-all cursor-pointer"
                  >
                    <span>View Division Specifications</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                  <button
                    id="home-splicer-contact"
                    onClick={() => setActiveTab("contact")}
                    className="inline-flex items-center space-x-2 text-xs sm:text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 px-5 py-2.5 rounded-md transition-colors cursor-pointer"
                  >
                    <span>Contact Executive Operations</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === "about" && <About />}
        {activeTab === "services" && <Services />}
        {activeTab === "contact" && <Contact />}
        {activeTab === "admin" && <AdminPortal />}
      </main>

      <Footer onSelectTab={setActiveTab} />
    </div>
  );
}
