import { Compass, Info, Layers, Mail } from "lucide-react";
import { NavItem, FooterLink } from "../types";

export const NAVIGATION_ITEMS: NavItem[] = [
  { id: "home", label: "Home", icon: Compass },
  { id: "about", label: "About Us", icon: Info },
  { id: "services", label: "Industrial Divisions", icon: Layers },
  { id: "contact", label: "Contact Us", icon: Mail },
];

export const FOOTER_DIRECTORY_LINKS: FooterLink[] = [
  { label: "Corporate Home", tab: "home" },
  { label: "About Us & Leadership", tab: "about" },
  { label: "Industrial Divisions", tab: "services" },
  { label: "Contact & Plant Location", tab: "contact" },
];
