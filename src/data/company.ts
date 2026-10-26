import { User, MapPin, Shield } from "lucide-react";
import { LeadershipHighlight, Milestone } from "../types";

export const LEADERSHIP_HIGHLIGHTS: LeadershipHighlight[] = [
  {
    icon: User,
    title: "Malik Faisal Azeem",
    role: "Key Principal & Executive Director",
    desc: "Delivering visionary leadership that bridges global industrial engineering standards with Pakistan's regional manufacturing and supply corridors."
  },
  {
    icon: MapPin,
    title: "Multan Phase-1 Industrial Hub",
    role: "46-C Industrial Estate",
    desc: "Strategically located at the crossroads of Southern Punjab's logistics grid, providing fast multimodal transit across the country."
  },
  {
    icon: Shield,
    title: "Rigorous Quality Compliance",
    role: "Standardized Industrial QA",
    desc: "Every polymer batch, repaired hydraulic transmission, and palletized shipment undergoes rigorous stress and tolerance inspection."
  }
];

export const COMPANY_MILESTONES: Milestone[] = [
  { 
    year: "1998", 
    title: "Inception in Multan", 
    desc: "Founded with general merchandise procurement and distribution facilities." 
  },
  { 
    year: "2008", 
    title: "Plastics Extrusion Facility", 
    desc: "Installed automated blow-molding and high-tonnage injection units in Phase-1." 
  },
  { 
    year: "2016", 
    title: "Machinery Services Wing", 
    desc: "Launched dedicated mechanical and hydraulic overhaul division for regional factories." 
  },
  { 
    year: "2024+", 
    title: "Smart Automation & Scale", 
    desc: "Expanded to 100,000+ sq ft footprint with digital barcode WMS and CNC tooling." 
  }
];

export const COMPANY_DETAILS = {
  name: "Malik Enterprises",
  legalName: "Malik Enterprises Industrial Group",
  executiveDirector: "Malik Faisal Azeem",
  address: "46-C Industrial Estate Phase-1, Sher Shah Town, Multan, 60000 Pakistan",
  email: "info@malikenterprises.com.pk",
  hours: "Monday – Saturday: 09:00 AM – 06:00 PM (PKT)",
  coordinates: {
    latitude: 30.1575,
    longitude: 71.4331,
    elevation: "~129m (AMSL)"
  },
  registration: "NTN & SECP REGISTERED INDUSTRIAL ENTITY",
  isoStandard: "ISO 9001 Compliant Protocols"
};
