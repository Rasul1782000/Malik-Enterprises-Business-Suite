import { LucideIcon } from "lucide-react";

export type ActiveTab = "home" | "about" | "services" | "contact" | "admin";

export interface NavItem {
  id: ActiveTab;
  label: string;
  icon: LucideIcon;
}

export interface FooterLink {
  label: string;
  tab: ActiveTab;
}
