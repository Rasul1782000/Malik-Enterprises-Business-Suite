import { LucideIcon } from "lucide-react";

export interface LeadershipHighlight {
  icon: LucideIcon;
  title: string;
  role: string;
  desc: string;
}

export interface Milestone {
  year: string;
  title: string;
  desc: string;
}

export interface InfrastructureHighlight {
  title: string;
  category: string;
  image: string;
  desc: string;
  stat: string;
}

export interface HeroShowcaseItem {
  title: string;
  tag: string;
  img: string;
  metric: string;
}
