import React, { useState, useEffect } from "react";
import { Job } from "../types";
import teamMeeting from "../assets/images/engineer_clipboard_1783725793310.jpg";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Paperclip, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  FileText
} from "lucide-react";

export default function Careers() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState<boolean>(true);
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Form State
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [portfolio, setPortfolio] = useState<string>("");
  const [coverLetter, setCoverLetter] = useState<string>("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeName, setResumeName] = useState<string>("");
  
  // Submit State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [applicationDetails, setApplicationDetails] = useState<any>(null);

  // Drag and Drop State
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoadingJobs(true);
      const res = await fetch("/api/jobs");
      if (res.ok) {
        const data = await res.json();
        setJobs(data);
      } else {
        console.error("Failed to load jobs");
      }
    } catch (e) {
      console.error("Error fetching jobs:", e);
    } finally {
      setLoadingJobs(false);
    }
  };

  const handleToggleExpand = (jobId: string) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  const handleOpenApplyForm = (job: Job) => {
    setSelectedJob(job);
    setSubmissionSuccess(false);
    setSubmissionError(null);
    setApplicationDetails(null);
    // Scroll to form smoothly
    setTimeout(() => {
      document.getElementById("career-apply-form")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleCancelApply = () => {
    setSelectedJob(null);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPortfolio("");
    setCoverLetter("");
    setResumeFile(null);
    setResumeName("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("Resume file size must be less than 5MB");
        return;
      }
      setResumeFile(file);
      setResumeName(file.name);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const validExtensions = [".pdf", ".doc", ".docx"];
      const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
      
      if (!validExtensions.includes(ext)) {
        setSubmissionError("Invalid file type. Please upload a PDF or Word Document (.docx).");
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setSubmissionError("Resume file size exceeds the 5MB limit.");
        return;
      }
      
      setResumeFile(file);
      setResumeName(file.name);
      setSubmissionError(null);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    if (!name || !email || !phone || !resumeName) {
      setSubmissionError("Please fill out all required fields and upload your resume.");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmissionError(null);

      const response = await fetch("/api/careers/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          jobId: selectedJob.id,
          name,
          email,
          phone,
          portfolioUrl: portfolio,
          coverLetter,
          resumeName: resumeName
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmissionSuccess(true);
        setApplicationDetails({
          id: data.applicationId,
          jobTitle: selectedJob.title,
          applicantName: name,
          email,
          timestamp: new Date().toLocaleDateString()
        });
        resetForm();
      } else {
        setSubmissionError(data.error || "An error occurred while submitting your application.");
      }
    } catch (e) {
      setSubmissionError("Unable to connect to the server. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-vn-surface py-16 sm:py-24 border-y border-white/5" id="careers-page">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-vn-tertiary block mb-3">
              Build Your Career with Malik
            </span>
            <h2 className="font-display italic text-4xl tracking-tight text-vn-primary sm:text-5xl" id="careers-heading">
              Join Our Industrial Vanguard
            </h2>
            <p className="font-sans text-base text-vn-secondary mt-6 leading-relaxed">
              At Malik Enterprises, we believe our primary asset is our engineering talent. We offer a competitive workplace culture, hands-on training, and growth opportunities across plastics engineering, heavy machinery repairs, and supply chain logistics.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden border border-white/10 shadow-vn-card h-64 lg:h-80">
            <img src={teamMeeting} alt="Team Meeting" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 max-w-4xl" id="job-listings">
          {loadingJobs ? (
            <div className="flex justify-center items-center py-12 bg-vn-neutral rounded-lg border border-white/5">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-vn-tertiary mr-3"></div>
              <span className="text-[10px] font-mono font-medium text-vn-secondary uppercase tracking-widest">Loading positions...</span>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center p-12 bg-vn-neutral rounded-lg border border-white/5">
              <Briefcase className="h-10 w-10 text-vn-secondary/50 mx-auto mb-4" />
              <h3 className="text-base font-medium text-vn-primary">No Open Positions Currently</h3>
              <p className="text-sm text-vn-secondary mt-2">Please check back later or submit an inquiry via contact.</p>
            </div>
          ) : (
            jobs.map((job) => {
              const isExpanded = expandedJobId === job.id;
              return (
                <div 
                  key={job.id} 
                  id={`job-card-${job.id}`}
                  className="rounded-lg border border-white/10 bg-vn-neutral shadow-vn-card transition-all hover:border-white/20 overflow-hidden"
                >
                  <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <span className="rounded-sm bg-vn-card px-2.5 py-1 text-[10px] font-mono font-medium text-vn-tertiary uppercase tracking-widest">
                          {job.department}
                        </span>
                        <span className="inline-flex items-center text-[10px] font-mono text-vn-secondary uppercase tracking-widest">
                          <Clock className="h-3 w-3 mr-1.5" />
                          {job.type}
                        </span>
                      </div>
                      
                      <h3 className="font-display italic text-2xl text-vn-primary leading-snug">{job.title}</h3>
                      
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-vn-secondary">
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1.5" />
                          {job.location}
                        </span>
                        <span>Experience: {job.experience}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 self-end sm:self-auto">
                      <button
                        id={`job-details-btn-${job.id}`}
                        onClick={() => handleToggleExpand(job.id)}
                        className="inline-flex items-center justify-center space-x-2 rounded-pill bg-vn-card border border-white/5 py-[11px] px-[22px] text-[13px] font-medium text-vn-primary hover:bg-white/5 transition-colors"
                      >
                        <span>Details</span>
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                      <button
                        id={`job-apply-btn-${job.id}`}
                        onClick={() => handleOpenApplyForm(job)}
                        className="inline-flex items-center justify-center rounded-pill bg-vn-primary text-vn-surface font-semibold text-[13px] py-[11px] px-[22px] shadow-vn-btn transition-colors hover:brightness-95"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-white/5 bg-vn-surface/50 p-6 space-y-6 animate-fade-in" id={`job-expanded-${job.id}`}>
                      <div>
                        <h4 className="text-[10px] font-mono font-medium text-vn-tertiary uppercase tracking-widest mb-3">Role Overview</h4>
                        <p className="text-sm text-vn-secondary leading-relaxed font-sans">{job.description}</p>
                      </div>

                      <div>
                        <h4 className="text-[10px] font-mono font-medium text-vn-tertiary uppercase tracking-widest mb-3">Key Requirements</h4>
                        <ul className="space-y-3">
                          {job.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start space-x-3 text-sm text-vn-primary leading-normal">
                              <span className="h-1.5 w-1.5 rounded-full bg-vn-tertiary mt-1.5 shrink-0"></span>
                              <span className="font-sans">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {selectedJob && (
          <div 
            id="career-apply-form"
            className="mt-16 rounded-lg border border-white/10 bg-vn-neutral p-6 sm:p-10 shadow-vn-card max-w-4xl animate-fade-in"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-6 mb-8 gap-4">
              <div>
                <span className="text-[10px] font-mono font-medium text-vn-tertiary uppercase tracking-widest">Application Form</span>
                <h3 className="font-display italic text-2xl text-vn-primary mt-1">
                  Applying for: {selectedJob.title}
                </h3>
              </div>
              <button
                id="cancel-apply-btn"
                onClick={handleCancelApply}
                className="text-[13px] font-medium text-vn-secondary hover:text-vn-primary px-[16px] py-[8px] border border-white/10 rounded-pill bg-vn-card self-start sm:self-auto transition-colors"
              >
                Cancel
              </button>
            </div>

            {submissionSuccess && applicationDetails ? (
              <div className="text-center py-10 px-4 space-y-8" id="apply-success-panel">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-vn-card text-vn-tertiary mx-auto border border-white/10">
                  <CheckCircle className="h-8 w-8" />
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-display italic text-3xl text-vn-primary">Application Submitted</h4>
                  <p className="text-base text-vn-secondary max-w-lg mx-auto font-sans leading-relaxed">
                    Thank you for applying. We have received your application and will review it shortly.
                  </p>
                </div>

                <div className="rounded-lg border border-white/5 bg-vn-card p-6 max-w-md mx-auto text-left space-y-4 font-mono text-[11px] text-vn-secondary">
                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span className="uppercase tracking-widest">Reference ID</span>
                    <span className="text-vn-primary">{applicationDetails.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="uppercase tracking-widest">Position</span>
                    <span className="text-vn-primary">{applicationDetails.jobTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="uppercase tracking-widest">Name</span>
                    <span className="text-vn-primary">{applicationDetails.applicantName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="uppercase tracking-widest">Email</span>
                    <span className="text-vn-primary">{applicationDetails.email}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    id="apply-another-btn"
                    onClick={handleCancelApply}
                    className="inline-flex items-center justify-center rounded-pill bg-vn-primary px-[22px] py-[11px] text-[13px] font-semibold text-vn-surface transition-all hover:brightness-95"
                  >
                    Return to Openings
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-8" id="actual-apply-form">
                
                {submissionError && (
                  <div className="flex items-start space-x-3 rounded-lg bg-red-950/30 border border-red-900/50 p-4 text-[13px] text-red-200" id="apply-error-badge">
                    <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
                    <div>
                      <span className="font-mono font-medium uppercase tracking-widest block text-[10px] mb-1">Error</span>
                      <p className="leading-relaxed">{submissionError}</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono font-medium text-vn-secondary uppercase tracking-widest flex items-center">
                      <span>Full Name</span>
                      <span className="text-vn-tertiary ml-2">*</span>
                    </label>
                    <input
                      id="apply-input-name"
                      type="text"
                      required
                      placeholder="e.g. Faisal Khan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-md border border-white/10 bg-vn-card py-3 px-4 text-sm text-vn-primary placeholder-vn-secondary/50 outline-none focus:border-vn-tertiary transition-colors font-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-mono font-medium text-vn-secondary uppercase tracking-widest flex items-center">
                      <span>Email Address</span>
                      <span className="text-vn-tertiary ml-2">*</span>
                    </label>
                    <input
                      id="apply-input-email"
                      type="email"
                      required
                      placeholder="e.g. applicant@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-md border border-white/10 bg-vn-card py-3 px-4 text-sm text-vn-primary placeholder-vn-secondary/50 outline-none focus:border-vn-tertiary transition-colors font-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-mono font-medium text-vn-secondary uppercase tracking-widest flex items-center">
                      <span>Phone Number</span>
                      <span className="text-vn-tertiary ml-2">*</span>
                    </label>
                    <input
                      id="apply-input-phone"
                      type="tel"
                      required
                      placeholder="e.g. +92 300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-md border border-white/10 bg-vn-card py-3 px-4 text-sm text-vn-primary placeholder-vn-secondary/50 outline-none focus:border-vn-tertiary transition-colors font-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-mono font-medium text-vn-secondary uppercase tracking-widest">
                      LinkedIn / Portfolio URL (Optional)
                    </label>
                    <input
                      id="apply-input-portfolio"
                      type="url"
                      placeholder="https://..."
                      value={portfolio}
                      onChange={(e) => setPortfolio(e.target.value)}
                      className="w-full rounded-md border border-white/10 bg-vn-card py-3 px-4 text-sm text-vn-primary placeholder-vn-secondary/50 outline-none focus:border-vn-tertiary transition-colors font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-mono font-medium text-vn-secondary uppercase tracking-widest">
                    Cover Letter (Optional)
                  </label>
                  <textarea
                    id="apply-input-cover"
                    rows={4}
                    placeholder="Briefly state why you're a good fit for this role..."
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="w-full rounded-md border border-white/10 bg-vn-card py-3 px-4 text-sm text-vn-primary placeholder-vn-secondary/50 outline-none focus:border-vn-tertiary transition-colors font-sans resize-y"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-mono font-medium text-vn-secondary uppercase tracking-widest flex items-center">
                    <span>Resume Document</span>
                    <span className="text-vn-tertiary ml-2">*</span>
                  </label>
                  
                  <div
                    id="resume-dropzone"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative rounded-lg border-2 border-dashed p-10 text-center transition-all ${
                      isDragOver
                        ? "border-vn-tertiary bg-vn-card"
                        : resumeName
                        ? "border-white/20 bg-vn-card"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <input
                      id="file-input"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
                    />

                    {resumeName ? (
                      <div className="space-y-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-vn-card text-vn-primary border border-white/10 mx-auto">
                          <FileText className="h-5 w-5" />
                        </div>
                        <p className="text-[13px] font-medium text-vn-primary">{resumeName}</p>
                        <p className="text-[11px] text-vn-secondary">Click or drag another file to replace</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Upload className="h-8 w-8 text-vn-secondary mx-auto" />
                        <p className="text-[13px] font-medium text-vn-primary">Drag & drop your resume file here</p>
                        <p className="text-[11px] text-vn-secondary">Accepted formats: PDF, DOCX up to 5MB</p>
                        <button
                          type="button"
                          className="inline-flex items-center space-x-2 text-[11px] font-mono font-medium text-vn-tertiary uppercase tracking-widest mt-2"
                        >
                          <Paperclip className="h-3 w-3" />
                          <span>Browse Files</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4 pt-6 border-t border-white/5">
                  <button
                    id="apply-form-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center rounded-pill bg-vn-primary text-vn-surface px-[22px] py-[11px] text-[13px] font-semibold transition-all hover:brightness-95 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-vn-surface mr-2"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                  <button
                    id="apply-form-cancel-btn"
                    type="button"
                    onClick={handleCancelApply}
                    className="text-[13px] font-medium text-vn-secondary hover:text-vn-primary transition-colors"
                  >
                    Cancel
                  </button>
                </div>

              </form>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
