export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
}

export interface Division {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  highlights: string[];
  capabilities: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  portfolioUrl?: string;
  coverLetter?: string;
  resumeName: string;
  timestamp: string;
  status: "Received" | "Under Review" | "Shortlisted";
}

export type ActiveTab = "home" | "about" | "services" | "careers" | "contact" | "admin";
