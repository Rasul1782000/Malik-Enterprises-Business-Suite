import { useState } from "react";
import { Division } from "../types";
import { 
  Building, 
  Package, 
  Settings, 
  CheckCircle2, 
  ArrowRight, 
  Warehouse, 
  Sparkles, 
  Gauge 
} from "lucide-react";
import polymerFactory from "../assets/images/polymer_factory_1783725229258.jpg";
import supplyChainLogistics from "../assets/images/supply_chain_logistics_1783725710427.jpg";
import machineryRepair from "../assets/images/machinery_repair_1783725722573.jpg";

export default function Services() {
  const divisions: Division[] = [
    {
      id: "div-sourcing",
      name: "General Merchandise & Sourcing",
      shortDesc: "Bulk procurement, supercenter warehousing, and custom distribution logistics.",
      fullDesc: "We provide high-capacity supply chain services for warehouse clubs, supercenters, and major general merchandise retailers. Our strategic hub in Multan oversees inventory sorting, quality auditing, bulk packaging, and freight routing for non-perishable consumer products, household goods, and industrial materials.",
      icon: "Warehouse",
      highlights: [
        "End-to-End Warehousing & Sorting",
        "Bulk Sourcing of General Merchandise",
        "Supply Chain Audit & Inspection",
        "Freight & Southern Punjab Distribution networks"
      ],
      capabilities: [
        "100,000+ sq ft secure storage facilities in Sher Shah Town.",
        "Advanced Warehouse Management Systems (WMS) for barcode tracking.",
        "Tailored bulk retail logistics packaging for major supercenters.",
        "Scheduled regional container shipping and secure inventory dispatch."
      ]
    },
    {
      id: "div-plastics",
      name: "Plastics Product Manufacturing",
      shortDesc: "High-specification industrial polymers, blow molding, and custom injection extrusion.",
      fullDesc: "Our Multan Industrial Estate factory features advanced automated machinery to manufacture customized polymer and plastic solutions. From industrial packaging, high-density crates, and chemical containers to precision-molded thermoplastic parts, we meet exact dimensional tolerances and durability benchmarks.",
      icon: "Package",
      highlights: [
        "Custom Blow Molding & Extrusion",
        "High-Precision Injection Molding",
        "Industrial Packaging & Poly-containers",
        "Rigorous Material Stress Testing"
      ],
      capabilities: [
        "Advanced high-tonnage injection molding machines (150T - 800T clamp force).",
        "Custom tooling design and prototype fabrication.",
        "High-density polyethylene (HDPE) & polypropylene (PP) molding specialties.",
        "Eco-friendly recycling loops built straight into extrusion lines."
      ]
    },
    {
      id: "div-machinery",
      name: "Machinery Repair & Maintenance",
      shortDesc: "Expert mechanical overhaul, preventative troubleshooting, and hydraulic calibration.",
      fullDesc: "We operate a dedicated industrial service division that diagnoses, repairs, and optimizes heavy manufacturing machinery. Specializing in mechanical conveyors, hydraulic gear systems, pneumatic cylinders, and heavy extruder setups (excluding automotive and electronics), we keep local factories running with minimal downtime.",
      icon: "Settings",
      highlights: [
        "Industrial Hydraulic Diagnostics",
        "Preventative Maintenance plans",
        "Gearbox Rebuilding & Alignment",
        "Emergency Field Repair & Troubleshooting"
      ],
      capabilities: [
        "Precision laser alignment for heavy-duty drive shafts.",
        "In-shop gearbox rebuilds with customized steel machining.",
        "Hydraulic seal replacements and high-pressure system testing.",
        "On-site emergency maintenance teams available for Industrial Estate operations."
      ]
    }
  ];

  const [activeDivId, setActiveDivId] = useState<string>(divisions[0].id);
  const activeDiv = divisions.find(d => d.id === activeDivId) || divisions[0];

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
    <section className="bg-vn-surface py-16 sm:py-24" id="divisions-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-vn-tertiary block mb-3">
            Our Enterprise Capabilities
          </span>
          <h2 className="font-display italic text-4xl tracking-tight text-vn-primary sm:text-5xl" id="divisions-heading">
            Three Specialized Industrial Divisions
          </h2>
          <p className="font-sans text-base text-vn-secondary mt-6 leading-relaxed">
            Malik Enterprises operates three highly integrated divisions in Multan, combining supply chain scale with advanced plastics fabrication and robust engineering repairs.
          </p>
        </div>

        <div className="flex border-b border-white/10 mb-10 overflow-x-auto hide-scrollbar" id="division-tabs">
          {divisions.map((division) => {
            const IconComp = getIconComponent(division.icon);
            const isActive = division.id === activeDivId;
            return (
              <button
                key={division.id}
                id={`tab-btn-${division.id}`}
                onClick={() => setActiveDivId(division.id)}
                className={`flex items-center space-x-2 py-4 px-6 text-[13px] font-medium whitespace-nowrap border-b-[2px] transition-all ${
                  isActive
                    ? "border-vn-tertiary text-vn-tertiary"
                    : "border-transparent text-vn-secondary hover:text-vn-primary hover:bg-vn-card/50"
                }`}
              >
                <IconComp className="h-4 w-4" />
                <span>{division.name}</span>
              </button>
            );
          })}
        </div>

        <div 
          className="rounded-lg border border-white/10 bg-vn-neutral p-8 sm:p-12 shadow-vn-card animate-fade-in relative overflow-hidden" 
          key={activeDiv.id}
          id="active-division-panel"
        >
          {activeDiv.id === "div-plastics" && (
            <img src={polymerFactory} alt="Polymer manufacturing" className="absolute right-0 top-0 bottom-0 w-1/3 object-cover opacity-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          )}
          {activeDiv.id === "div-sourcing" && (
            <img src={supplyChainLogistics} alt="Supply Chain Logistics" className="absolute right-0 top-0 bottom-0 w-1/3 object-cover opacity-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          )}
          {activeDiv.id === "div-machinery" && (
            <img src={machineryRepair} alt="Machinery Repair" className="absolute right-0 top-0 bottom-0 w-1/3 object-cover opacity-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
            
            <div className="lg:col-span-7 space-y-8 border-l-[2px] border-vn-tertiary pl-6">
              <h3 className="font-display italic text-3xl sm:text-4xl text-vn-primary">{activeDiv.name}</h3>

              <p className="font-sans text-base text-vn-secondary leading-relaxed">
                {activeDiv.fullDesc}
              </p>

              <div className="space-y-4 pt-2">
                <h4 className="font-mono text-[10px] font-medium text-vn-tertiary uppercase tracking-widest">
                  Key Focus Areas:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeDiv.highlights.map((hl, idx) => (
                    <div key={idx} className="flex items-start space-x-3 text-sm text-vn-primary">
                      <CheckCircle2 className="h-5 w-5 text-vn-tertiary shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-lg border border-white/5 bg-vn-card p-6 sm:p-8 shadow-vn-card">
                
                <h4 className="font-mono text-[10px] font-medium text-vn-primary border-b border-white/10 pb-4 mb-6 flex items-center space-x-2 uppercase tracking-widest">
                  <Sparkles className="h-4 w-4 text-vn-tertiary" />
                  <span>Technical Capacity Specs</span>
                </h4>

                <ul className="space-y-5">
                  {activeDiv.capabilities.map((cap, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-sm text-vn-secondary">
                      <span className="font-mono text-[10px] text-vn-tertiary mt-1">
                        0{idx + 1}
                      </span>
                      <p className="font-sans leading-relaxed">{cap}</p>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-white/10 pt-5 flex items-center justify-between text-[10px] font-mono text-vn-secondary uppercase tracking-widest">
                  <span>Deployed // Multan</span>
                  <span className="flex items-center space-x-2 text-vn-primary">
                    <span>Standard Ops</span>
                    <ArrowRight className="h-3 w-3 text-vn-tertiary" />
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
