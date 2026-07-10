import { useState, useEffect } from "react";
import { ContactMessage, JobApplication } from "../types";
import { 
  Mail, 
  Users, 
  Terminal, 
  FileText, 
  Database,
  ExternalLink
} from "lucide-react";

export default function AdminPortal() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeSubTab, setActiveSubTab] = useState<"messages" | "applications">("messages");

  useEffect(() => {
    fetchSubmissions();
    const interval = setInterval(fetchSubmissions, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchSubmissions = async () => {
    try {
      const [msgRes, appRes] = await Promise.all([
        fetch("/api/contact/messages"),
        fetch("/api/careers/applications")
      ]);

      if (msgRes.ok && appRes.ok) {
        const [msgs, apps] = await Promise.all([msgRes.json(), appRes.json()]);
        setMessages(msgs);
        setApplications(apps);
      }
    } catch (e) {
      console.error("Error loading data:", e);
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleString();
    } catch (e) {
      return isoString;
    }
  };

  return (
    <section className="bg-vn-surface py-12 sm:py-16 min-h-screen border-y border-white/5" id="admin-portal-dashboard">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 mb-10 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-vn-tertiary font-mono text-[10px] font-medium uppercase tracking-widest">
              <Terminal className="h-4 w-4 text-vn-tertiary" />
              <span>Administration Dashboard</span>
            </div>
            <h2 className="font-display italic text-3xl tracking-tight text-vn-primary">
              Management Portal
            </h2>
            <p className="text-[13px] text-vn-secondary font-sans max-w-xl leading-relaxed">
              Monitor incoming contact submissions and candidate job applications from the integrated backend.
            </p>
          </div>

          <div className="flex items-center space-x-3 self-start md:self-auto">
            <div className="rounded-pill bg-vn-card border border-white/10 px-4 py-2 flex items-center space-x-2 text-[10px] font-mono font-medium text-vn-primary uppercase tracking-widest">
              <Database className="h-3.5 w-3.5 text-vn-tertiary" />
              <span>Database Connected</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="rounded-lg border border-white/10 bg-vn-neutral p-6 space-y-3 shadow-vn-card">
            <span className="text-[10px] font-mono font-medium text-vn-secondary uppercase tracking-widest block">Contact Leads</span>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-display italic text-vn-primary">{messages.length}</span>
              <span className="text-[10px] text-vn-tertiary font-mono font-medium uppercase tracking-widest">Total</span>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-vn-neutral p-6 space-y-3 shadow-vn-card">
            <span className="text-[10px] font-mono font-medium text-vn-secondary uppercase tracking-widest block">Job Applications</span>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-display italic text-vn-primary">{applications.length}</span>
              <span className="text-[10px] text-vn-tertiary font-mono font-medium uppercase tracking-widest">Total</span>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-vn-neutral p-6 space-y-3 shadow-vn-card">
            <span className="text-[10px] font-mono font-medium text-vn-secondary uppercase tracking-widest block">System Status</span>
            <div className="flex items-center space-x-3 mt-1">
              <span className="h-2 w-2 rounded-full bg-vn-tertiary"></span>
              <span className="text-sm font-medium text-vn-primary font-mono tracking-wide">Operational</span>
            </div>
          </div>
        </div>

        <div className="flex border-b border-white/10 mb-8 gap-4">
          <button
            id="subtab-btn-messages"
            onClick={() => setActiveSubTab("messages")}
            className={`flex items-center space-x-2 py-3 px-4 text-[11px] font-mono font-medium uppercase tracking-widest border-b-[2px] transition-all ${
              activeSubTab === "messages"
                ? "border-vn-tertiary text-vn-tertiary"
                : "border-transparent text-vn-secondary hover:text-vn-primary"
            }`}
          >
            <Mail className="h-4 w-4" />
            <span>Messages ({messages.length})</span>
          </button>
          
          <button
            id="subtab-btn-applications"
            onClick={() => setActiveSubTab("applications")}
            className={`flex items-center space-x-2 py-3 px-4 text-[11px] font-mono font-medium uppercase tracking-widest border-b-[2px] transition-all ${
              activeSubTab === "applications"
                ? "border-vn-tertiary text-vn-tertiary"
                : "border-transparent text-vn-secondary hover:text-vn-primary"
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Applications ({applications.length})</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 border border-white/10 bg-vn-neutral rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-vn-tertiary mx-auto mb-4"></div>
            <p className="text-[10px] font-mono font-medium text-vn-secondary uppercase tracking-widest">Loading records...</p>
          </div>
        ) : activeSubTab === "messages" ? (
          <div className="space-y-6" id="portal-messages-list">
            {messages.length === 0 ? (
              <div className="text-center py-16 border border-white/5 bg-vn-neutral rounded-lg">
                <Mail className="h-10 w-10 text-vn-secondary/50 mx-auto mb-4" />
                <h4 className="text-sm font-medium text-vn-primary">No Messages</h4>
                <p className="text-[13px] text-vn-secondary mt-2">New contact form submissions will appear here.</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div 
                  key={msg.id} 
                  id={`portal-msg-${msg.id}`}
                  className="rounded-lg border border-white/10 bg-vn-neutral p-6 sm:p-8 space-y-6 shadow-vn-card"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                    <div>
                      <span className="font-mono text-[10px] font-medium text-vn-secondary block uppercase tracking-widest mb-1">ID: {msg.id}</span>
                      <h4 className="font-display italic text-2xl text-vn-primary">{msg.subject}</h4>
                    </div>
                    <span className="text-[10px] font-mono font-medium text-vn-tertiary bg-vn-card px-3 py-1.5 rounded-sm border border-white/5">
                      {formatTimestamp(msg.timestamp)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[11px] font-mono">
                    <div>
                      <span className="text-vn-secondary block font-medium uppercase tracking-widest mb-1.5">From</span>
                      <span className="text-vn-primary">{msg.name}</span>
                    </div>
                    <div>
                      <span className="text-vn-secondary block font-medium uppercase tracking-widest mb-1.5">Email</span>
                      <span className="text-vn-primary">{msg.email}</span>
                    </div>
                  </div>

                  <div className="bg-vn-card border border-white/5 rounded-md p-5 font-sans text-[13px] text-vn-secondary leading-relaxed">
                    {msg.message}
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-6" id="portal-applications-list">
            {applications.length === 0 ? (
              <div className="text-center py-16 border border-white/5 bg-vn-neutral rounded-lg">
                <Users className="h-10 w-10 text-vn-secondary/50 mx-auto mb-4" />
                <h4 className="text-sm font-medium text-vn-primary">No Applications</h4>
                <p className="text-[13px] text-vn-secondary mt-2">New job applications will appear here.</p>
              </div>
            ) : (
              applications.map((app) => (
                <div 
                  key={app.id} 
                  id={`portal-app-${app.id}`}
                  className="rounded-lg border border-white/10 bg-vn-neutral p-6 sm:p-8 space-y-6 shadow-vn-card"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                    <div>
                      <span className="font-mono text-[10px] font-medium text-vn-secondary block uppercase tracking-widest mb-1">ID: {app.id}</span>
                      <h4 className="font-display italic text-2xl text-vn-primary">
                        {app.jobTitle}
                      </h4>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-[10px] font-mono font-medium text-vn-primary bg-vn-card px-3 py-1.5 rounded-sm border border-white/5">
                        {formatTimestamp(app.timestamp)}
                      </span>
                      <span className="text-[10px] font-mono font-medium text-vn-tertiary bg-vn-card px-3 py-1.5 rounded-sm border border-white/5 uppercase tracking-widest">
                        {app.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-[11px] font-mono">
                    <div>
                      <span className="text-vn-secondary block font-medium uppercase tracking-widest mb-1.5">Applicant</span>
                      <span className="text-vn-primary">{app.name}</span>
                    </div>
                    <div>
                      <span className="text-vn-secondary block font-medium uppercase tracking-widest mb-1.5">Email</span>
                      <span className="text-vn-primary">{app.email}</span>
                    </div>
                    <div>
                      <span className="text-vn-secondary block font-medium uppercase tracking-widest mb-1.5">Phone</span>
                      <span className="text-vn-primary">{app.phone}</span>
                    </div>
                  </div>

                  {app.portfolioUrl && (
                    <div className="text-[11px] font-mono pt-2">
                      <span className="text-vn-secondary block font-medium uppercase tracking-widest mb-1.5">Portfolio / LinkedIn</span>
                      <a href={app.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-vn-tertiary hover:text-vn-primary flex items-center inline-flex space-x-1 transition-colors">
                        <span>{app.portfolioUrl}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}

                  {app.coverLetter && (
                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] font-mono text-vn-secondary font-medium uppercase tracking-widest">Cover Letter</span>
                      <div className="bg-vn-card border border-white/5 rounded-md p-4 font-sans text-[13px] text-vn-secondary leading-relaxed">
                        {app.coverLetter}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-3 rounded-md bg-vn-card p-3 border border-white/5">
                    <FileText className="h-5 w-5 text-vn-tertiary" />
                    <div>
                      <span className="text-[9px] font-mono text-vn-secondary block font-medium uppercase tracking-widest">Attached Resume</span>
                      <span className="text-[11px] font-mono text-vn-primary">{app.resumeName}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </section>
  );
}
