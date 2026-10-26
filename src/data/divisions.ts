import { Division } from "../types";
import polymerFactory from "../assets/images/polymer_factory_1783725229258.jpg";
import supplyChainLogistics from "../assets/images/supply_chain_logistics_1783725710427.jpg";
import machineryRepair from "../assets/images/machinery_repair_1783725722573.jpg";
import roboticPlant from "../assets/images/robotic_assembly_plant_1793044519473.jpg";
import precisionCnc from "../assets/images/precision_cnc_machining_1793044532025.jpg";

export const DIVISIONS_DATA: Division[] = [
  {
    id: "div-plastics",
    name: "Plastics Product Manufacturing",
    badge: "DIVISION 01",
    shortDesc: "High-specification industrial polymers, blow molding, and custom injection extrusion.",
    fullDesc: "Our Multan Industrial Estate factory features advanced automated machinery to manufacture customized polymer and plastic solutions. From industrial packaging, high-density crates, and chemical containers to precision-molded thermoplastic parts, we meet exact dimensional tolerances and durability benchmarks.",
    icon: "Package",
    primaryImage: polymerFactory,
    secondaryImage: roboticPlant,
    image: polymerFactory,
    technicalMetric: "150T - 800T CLAMP",
    highlights: [
      "Custom High-Tonnage Blow Molding & Extrusion",
      "High-Precision Multi-Cavity Injection Molding",
      "Food-Grade & Industrial Polymer Packaging",
      "Rigorous Material Stress & Tensile Testing"
    ],
    capabilities: [
      "Advanced high-tonnage injection machines (150T - 800T clamp force).",
      "In-house CAD/CAM tooling design and rapid prototype fabrication.",
      "High-density polyethylene (HDPE) & polypropylene (PP) molding specialties.",
      "Zero-waste circular recycling loops built directly into primary extrusion lines."
    ]
  },
  {
    id: "div-machinery",
    name: "Machinery Repair & Maintenance",
    badge: "DIVISION 02",
    shortDesc: "Expert mechanical overhaul, preventative troubleshooting, and hydraulic calibration.",
    fullDesc: "We operate a dedicated industrial service division that diagnoses, repairs, and optimizes heavy manufacturing machinery. Specializing in mechanical conveyors, hydraulic gear systems, pneumatic cylinders, and heavy extruder setups (excluding automotive and electronics), we keep local factories running with minimal downtime.",
    icon: "Settings",
    primaryImage: machineryRepair,
    secondaryImage: precisionCnc,
    image: machineryRepair,
    technicalMetric: "24/7 FIELD CREW",
    highlights: [
      "Industrial Hydraulic System Diagnostics",
      "Scheduled Preventative Maintenance Protocols",
      "Heavy Gearbox Rebuilding & Dynamic Laser Alignment",
      "Rapid Emergency Field Repair Crews in Multan Industrial Zone"
    ],
    capabilities: [
      "Precision laser alignment for heavy-duty drive shafts up to 4000 RPM.",
      "Full in-shop gearbox rebuilds with custom alloy steel machining.",
      "Hydraulic seal replacement and 5000+ PSI pressure testing rigs.",
      "On-site rapid response teams deployed across Multan Phase-1 and Southern Punjab."
    ]
  },
  {
    id: "div-sourcing",
    name: "General Merchandise & Sourcing",
    badge: "DIVISION 03",
    shortDesc: "Bulk procurement, supercenter warehousing, and custom distribution logistics.",
    fullDesc: "We provide high-capacity supply chain services for warehouse clubs, supercenters, and major general merchandise retailers. Our strategic hub in Multan oversees inventory sorting, quality auditing, bulk packaging, and freight routing for non-perishable consumer products, household goods, and industrial materials.",
    icon: "Warehouse",
    primaryImage: supplyChainLogistics,
    secondaryImage: polymerFactory,
    image: supplyChainLogistics,
    technicalMetric: "100K+ SQ FT STORAGE",
    highlights: [
      "End-to-End Warehousing, Palletizing & Barcode Sorting",
      "Bulk Sourcing of Commercial Merchandise",
      "Consolidated Freight & Southern Punjab Transit Corridors",
      "Quality Auditing & Pre-Shipment Inspection"
    ],
    capabilities: [
      "100,000+ sq ft secure bonded storage facilities in Sher Shah Town.",
      "Digital Warehouse Management Systems (WMS) with real-time barcode telemetry.",
      "Tailored bulk retail logistics packaging for major national supercenters.",
      "Scheduled regional container shipping and secure inventory dispatch."
    ]
  }
];
