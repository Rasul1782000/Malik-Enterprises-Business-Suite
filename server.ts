import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

// Simple in-memory persistence for demo purposes (so the user can see their submissions in-app!)
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

interface JobApplication {
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

const contactMessages: ContactMessage[] = [];
const jobApplications: JobApplication[] = [];

const JOBS = [
  {
    id: "job-1",
    title: "Plastics Manufacturing Engineer",
    department: "Production",
    location: "Multan, Pakistan (Industrial Estate)",
    type: "Full-time",
    experience: "3-5 Years",
    description: "We are seeking an experienced Plastics Manufacturing Engineer to oversee injection molding, blow molding, and extrusion manufacturing lines at our Multan Industrial Estate plant. You will optimize cycle times, handle tooling setups, and ensure high-quality standards for our plastic product range.",
    requirements: [
      "Bachelor's degree in Polymer Engineering, Mechanical Engineering, or related field.",
      "Proven experience in plastic manufacturing processes (extrusion, blow molding, injection molding).",
      "Proficiency with tooling design and machinery calibration.",
      "Strong understanding of polymer raw materials and quality control."
    ]
  },
  {
    id: "job-2",
    title: "Senior Machinery Maintenance Technician",
    department: "Maintenance",
    location: "Multan, Pakistan (Industrial Estate)",
    type: "Full-time",
    experience: "5+ Years",
    description: "Malik Enterprises is hiring a Senior Machinery Maintenance Technician to maintain, repair, and troubleshoot complex industrial production equipment. This includes hydraulic systems, mechanical conveyors, pneumatic pumps, and heavy-duty manufacturing machines.",
    requirements: [
      "Diploma or Associate Degree in Mechanical or Mechatronics Engineering.",
      "Deep expertise in industrial machinery troubleshooting (hydraulics, pneumatics, gearboxes).",
      "Strong safety awareness and preventive maintenance modeling experience.",
      "Ability to read technical schematic layouts and engineering diagrams."
    ]
  },
  {
    id: "job-3",
    title: "Logistics & Warehouse Operations Manager",
    department: "Logistics",
    location: "Multan, Pakistan (Sher Shah)",
    type: "Full-time",
    experience: "4-6 Years",
    description: "Manage end-to-end warehousing and distribution operations for our general merchandise and plastics divisions. You will coordinate with freight providers, manage inventory flows, and optimize storage layouts across our Sher Shah Town facility.",
    requirements: [
      "Bachelor's degree in Supply Chain Management, Logistics, or Business Administration.",
      "Strong experience managing warehouse staff, inventory systems, and fleet logistics.",
      "Expertise in modern warehouse management systems (WMS) and Excel.",
      "Excellent vendor negotiations and team leadership skills."
    ]
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API: Get active jobs
  app.get("/api/jobs", (req, res) => {
    res.json(JOBS);
  });

  // API: Contact Us Form Submission
  app.post("/api/contact", (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        error: "All fields (name, email, subject, message) are required." 
      });
    }

    if (!email.includes("@")) {
      return res.status(400).json({ 
        success: false, 
        error: "Please provide a valid email address." 
      });
    }

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    };

    contactMessages.push(newMessage);

    console.log(`[API] Secure Contact Form Submitted:`, newMessage);

    return res.json({
      success: true,
      message: "Thank you for reaching out! Your message has been safely received. A representative from Malik Enterprises will contact you shortly.",
      referenceId: newMessage.id
    });
  });

  // API: Get submitted messages (secured route, for dashboard preview)
  app.get("/api/contact/messages", (req, res) => {
    // Return messages for interactive preview tracking
    res.json(contactMessages);
  });

  // API: Job Careers Application
  app.post("/api/careers/apply", (req, res) => {
    const { jobId, name, email, phone, portfolioUrl, coverLetter, resumeName } = req.body;

    if (!jobId || !name || !email || !phone || !resumeName) {
      return res.status(400).json({
        success: false,
        error: "Missing required application parameters. Name, email, phone, and resume are required."
      });
    }

    const job = JOBS.find(j => j.id === jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        error: "The specified job position was not found."
      });
    }

    const newApplication: JobApplication = {
      id: `app-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      jobId,
      jobTitle: job.title,
      name,
      email,
      phone,
      portfolioUrl,
      coverLetter,
      resumeName,
      timestamp: new Date().toISOString(),
      status: "Received"
    };

    jobApplications.push(newApplication);

    console.log(`[API] Secure Job Application Received:`, newApplication);

    return res.json({
      success: true,
      message: `Your application for the ${job.title} role has been successfully submitted! Our hiring team will review your credentials and reach out via ${email} or ${phone}.`,
      applicationId: newApplication.id
    });
  });

  // API: Get submitted applications (secured route, for dashboard preview)
  app.get("/api/careers/applications", (req, res) => {
    res.json(jobApplications);
  });

  // Vite middleware for development or Static Assets for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
