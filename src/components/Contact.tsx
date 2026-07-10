import React, { useState } from "react";
import { 
  Mail, 
  MapPin, 
  Send, 
  Clock, 
  CheckCircle, 
  AlertCircle
} from "lucide-react";
import CesiumMap from "./CesiumMap";
import hqExterior from "../assets/images/headquarters_exterior_1783725814569.jpg";

export default function Contact() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !subject || !message) {
      setErrorMsg("All contact form fields are required.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg(null);
      setSuccessMsg(null);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, subject, message })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg(data.message);
        setReferenceId(data.referenceId);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setErrorMsg(data.error || "Failed to deliver message. Please check your inputs.");
      }
    } catch (e) {
      setErrorMsg("Failed to connect to the server. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-vn-surface py-16 sm:py-24 border-y border-white/5" id="contact-page">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-vn-tertiary block mb-3">
            Get in Touch
          </span>
          <h2 className="font-display italic text-4xl tracking-tight text-vn-primary sm:text-5xl" id="contact-heading">
            Contact Malik Enterprises
          </h2>
          <p className="font-sans text-base text-vn-secondary mt-6 leading-relaxed">
            Have an industrial machinery, polymer logistics, or general merchandise sourcing inquiry? Reach out to our executive offices below. Our operations team in Multan will respond within 24 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="contact-grid">
          
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-sans text-base font-medium uppercase tracking-wider text-vn-primary border-b border-white/5 pb-3">
                Headquarters
              </h3>
              
              <div className="space-y-5">
                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-vn-card text-vn-tertiary border border-white/10">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono font-medium text-vn-secondary uppercase tracking-widest">Location Address</h4>
                    <p className="text-[13px] text-vn-primary font-sans leading-relaxed mt-1">
                      46-C Industrial Estate Phase-1, Sher Shah Town, Multan, 60000 Pakistan
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-vn-card text-vn-tertiary border border-white/10">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono font-medium text-vn-secondary uppercase tracking-widest">Email</h4>
                    <p className="text-[13px] text-vn-primary font-mono mt-1">
                      info@malikenterprises.com.pk
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-vn-card text-vn-tertiary border border-white/10">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono font-medium text-vn-secondary uppercase tracking-widest">Operating Hours</h4>
                    <p className="text-[13px] text-vn-primary font-sans mt-1">
                      Monday – Saturday: 09:00 AM – 06:00 PM (PKT)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden border border-white/10 shadow-vn-card h-48">
                <img src={hqExterior} alt="Malik Enterprises Headquarters" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-lg overflow-hidden border border-white/10 shadow-vn-card">
                <CesiumMap 
                  latitude={30.1575} 
                  longitude={71.4331} 
                  label="MALIK ENTERPRISES - 46-C INDUSTRIAL ESTATE" 
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-lg border border-white/10 bg-vn-neutral p-8 sm:p-12 shadow-vn-card">
              <span className="font-mono text-[10px] font-medium text-vn-tertiary uppercase tracking-widest block mb-2">
                Send a Message
              </span>
              <h3 className="font-display italic text-3xl text-vn-primary mb-8">
                Inquiries
              </h3>

              {successMsg ? (
                <div className="space-y-8 text-center py-10" id="contact-success-panel">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-vn-card text-vn-tertiary mx-auto border border-white/10">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-display italic text-3xl text-vn-primary">Message Sent</h4>
                    <p className="text-base text-vn-secondary font-sans leading-relaxed max-w-md mx-auto">
                      {successMsg}
                    </p>
                  </div>
                  
                  {referenceId && (
                    <div className="rounded-lg border border-white/5 bg-vn-card p-5 max-w-xs mx-auto text-center space-y-2 font-mono text-[11px] text-vn-secondary">
                      <span className="uppercase tracking-widest">Reference ID</span>
                      <span className="text-vn-primary block text-[13px]">{referenceId}</span>
                      <span className="text-[10px] text-vn-secondary/50 block mt-2 font-sans">Use this ID for future correspondence.</span>
                    </div>
                  )}

                  <div className="pt-6">
                    <button
                      id="contact-another-btn"
                      onClick={() => setSuccessMsg(null)}
                      className="inline-flex items-center justify-center rounded-pill bg-vn-primary px-[22px] py-[11px] text-[13px] font-semibold text-vn-surface transition-all hover:brightness-95"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6" id="actual-contact-form">
                  {errorMsg && (
                    <div className="flex items-start space-x-3 rounded-lg bg-red-950/30 border border-red-900/50 p-4 text-[13px] text-red-200" id="contact-error-alert">
                      <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
                      <div>
                        <span className="font-mono font-medium uppercase tracking-widest block text-[10px] mb-1">Error</span>
                        <p className="leading-relaxed">{errorMsg}</p>
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
                        id="contact-input-name"
                        type="text"
                        required
                        placeholder="e.g. Malik Faisal Azeem"
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
                        id="contact-input-email"
                        type="email"
                        required
                        placeholder="e.g. mfa@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-md border border-white/10 bg-vn-card py-3 px-4 text-sm text-vn-primary placeholder-vn-secondary/50 outline-none focus:border-vn-tertiary transition-colors font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-mono font-medium text-vn-secondary uppercase tracking-widest flex items-center">
                      <span>Subject</span>
                      <span className="text-vn-tertiary ml-2">*</span>
                    </label>
                    <input
                      id="contact-input-subject"
                      type="text"
                      required
                      placeholder="e.g. Inquiry about Plastics Manufacturing"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full rounded-md border border-white/10 bg-vn-card py-3 px-4 text-sm text-vn-primary placeholder-vn-secondary/50 outline-none focus:border-vn-tertiary transition-colors font-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-mono font-medium text-vn-secondary uppercase tracking-widest flex items-center">
                      <span>Message</span>
                      <span className="text-vn-tertiary ml-2">*</span>
                    </label>
                    <textarea
                      id="contact-input-message"
                      rows={5}
                      required
                      placeholder="Please provide details about your inquiry..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full rounded-md border border-white/10 bg-vn-card py-3 px-4 text-sm text-vn-primary placeholder-vn-secondary/50 outline-none focus:border-vn-tertiary transition-colors font-sans leading-relaxed resize-y"
                    />
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <button
                      id="contact-form-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center rounded-pill bg-vn-primary text-vn-surface py-[11px] px-[22px] font-semibold text-[13px] transition-all duration-200 disabled:opacity-50 hover:brightness-95"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-vn-surface mr-3"></div>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
