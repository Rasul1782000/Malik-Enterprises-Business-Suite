import { InfrastructureHighlight, HeroShowcaseItem } from "../types";
import polymerFactory from "../assets/images/polymer_factory_1783725229258.jpg";
import supplyChainLogistics from "../assets/images/supply_chain_logistics_1783725710427.jpg";
import precisionCnc from "../assets/images/precision_cnc_machining_1793044532025.jpg";
import roboticPlant from "../assets/images/robotic_assembly_plant_1793044519473.jpg";
import heroIndustrial from "../assets/images/hero_industrial_1783725218266.jpg";

export const INFRASTRUCTURE_HIGHLIGHTS: InfrastructureHighlight[] = [
  {
    title: "Automated Polymer Production",
    category: "Plastics Extrusion",
    image: polymerFactory,
    desc: "Multi-line continuous blow molding and high-tonnage injection units running standard ISO polymers.",
    stat: "24/7 Operations"
  },
  {
    title: "Robotic Assembly Systems",
    category: "Automation Systems",
    image: roboticPlant,
    desc: "Articulated robotic cells engineered for repeatable industrial fabrication and sorting.",
    stat: "±0.05mm Precision"
  },
  {
    title: "CNC Tooling & Heavy Overhaul",
    category: "Machinery Services",
    image: precisionCnc,
    desc: "Multi-axis milling, hydraulic cylinder rebuilds, and preventative drivetrain alignment.",
    stat: "Heavy-Duty Milling"
  },
  {
    title: "Central Logistics & Storage Hub",
    category: "Merchandise Sourcing",
    image: supplyChainLogistics,
    desc: "100,000+ sq ft bonded warehouse space servicing supercenters and regional retail networks.",
    stat: "100,000+ Sq Ft"
  }
];

export const HERO_SHOWCASE_ITEMS: HeroShowcaseItem[] = [
  {
    title: "Automated Assembly Plant",
    tag: "Robotics & Extrusion",
    img: roboticPlant,
    metric: "99.8% Dimensional Accuracy"
  },
  {
    title: "Precision CNC Tooling",
    tag: "Machinery Calibration",
    img: precisionCnc,
    metric: "0.02mm Tolerance Grade"
  },
  {
    title: "Heavy Machinery Floor",
    tag: "Industrial Systems",
    img: heroIndustrial,
    metric: "24/7 Overhaul Readiness"
  }
];
