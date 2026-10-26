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
import { useContactForm } from "../hooks/useContactForm";
import { COMPANY_DETAILS } from "../data/company";

export function Contact() {
  const {
    formData,
    submissionState,
    setField,
    clearSuccess,
    handleSubmit
  } = useContactForm();

  const { isSubmitting, successMsg, errorMsg, referenceId } = submissionState;

  return (
    <section className="bg-slate-50 py-16 sm:py-24 border-b border-slate-200" id="contact-page">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-blue-700 block mb-2">
            EXECUTIVE OPERATIONS & INQUIRIES
          </span>
          <h2 className="font-display italic text-4xl sm:text-5xl font-bold tracking-tight text-slate-900" id="contact-heading">
            Connect with {COMPANY_DETAILS.name}
          </h2>
          <p className="font-sans text-base text-slate-600 mt-4 leading-relaxed">
            Have an industrial machinery repair inquiry, custom polymer extrusion specifications, or bulk general merchandise logistics requirements? Reach our Multan plant command desk below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="contact-grid">
          
          {/* Left Column: Direct Address Details & Facility Visuals */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-3">
                Corporate Headquarters & Plant
              </h3>
              
              <div className="space-y-5">
                <div className="flex items-start space-x-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 border border-blue-100">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-mono font-bold text-blue-700 uppercase tracking-wider">Physical Site</h4>
                    <p className="text-sm font-medium text-slate-800 font-sans leading-relaxed mt-1">
                      {COMPANY_DETAILS.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 border border-blue-100">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-mono font-bold text-blue-700 uppercase tracking-wider">Executive Inquiries</h4>
                    <p className="text-sm font-semibold text-slate-800 font-mono mt-1">
                      {COMPANY_DETAILS.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 border border-blue-100">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-mono font-bold text-blue-700 uppercase tracking-wider">Plant Dispatch Hours</h4>
                    <p className="text-sm font-medium text-slate-800 font-sans mt-1">
                      {COMPANY_DETAILS.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-xs h-52 relative group">
                <img 
                  src={hqExterior} 
                  alt={`${COMPANY_DETAILS.name} Headquarters`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute bottom-2 left-2 bg-slate-900/90 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                  MAIN GATE · 46-C INDUSTRIAL ESTATE PHASE-1
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                <CesiumMap 
                  latitude={COMPANY_DETAILS.coordinates.latitude} 
                  longitude={COMPANY_DETAILS.coordinates.longitude} 
                  label="MALIK ENTERPRISES - 46-C INDUSTRIAL ESTATE" 
                />
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
              <span className="font-mono text-xs font-bold text-blue-700 uppercase tracking-widest block mb-1">
                ONLINE SUBMISSION PORTAL
              </span>
              <h3 className="font-display italic text-3xl font-bold text-slate-900 mb-6">
                Request Quote or Plant Consultation
              </h3>

              {successMsg ? (
                <div className="space-y-8 text-center py-10" id="contact-success-panel">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mx-auto border border-emerald-200">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-display italic text-3xl font-bold text-slate-900">Message Delivered</h4>
                    <p className="text-sm text-slate-600 font-sans leading-relaxed max-w-md mx-auto">
                      {successMsg}
                    </p>
                  </div>
                  
                  {referenceId && (
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 max-w-xs mx-auto text-center space-y-1 font-mono text-xs text-slate-600">
                      <span className="uppercase tracking-widest text-[10px] text-blue-700 font-bold">Inquiry Reference ID</span>
                      <span className="text-slate-900 font-bold block text-sm">{referenceId}</span>
                      <span className="text-[10px] text-slate-400 block pt-1 font-sans">Retain this reference for expedited tracking.</span>
                    </div>
                  )}

                  <div className="pt-4">
                    <button
                      id="contact-another-btn"
                      onClick={clearSuccess}
                      className="inline-flex items-center justify-center rounded-md bg-blue-700 px-6 py-2.5 text-xs font-bold text-white transition-all hover:bg-blue-800 shadow-sm cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" id="actual-contact-form">
                  {errorMsg && (
                    <div className="flex items-start space-x-3 rounded-lg bg-red-50 border border-red-200 p-4 text-xs text-red-700" id="contact-error-alert">
                      <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
                      <div>
                        <span className="font-mono font-bold uppercase tracking-wider block mb-0.5">Validation Error</span>
                        <p className="leading-relaxed">{errorMsg}</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider flex items-center">
                        <span>Full Name</span>
                        <span className="text-blue-600 ml-1.5">*</span>
                      </label>
                      <input
                        id="contact-input-name"
                        type="text"
                        required
                        placeholder="e.g. Malik Faisal Azeem"
                        value={formData.name}
                        onChange={(e) => setField("name", e.target.value)}
                        className="w-full rounded-md border border-slate-300 bg-white py-2.5 px-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors font-sans"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider flex items-center">
                        <span>Business Email</span>
                        <span className="text-blue-600 ml-1.5">*</span>
                      </label>
                      <input
                        id="contact-input-email"
                        type="email"
                        required
                        placeholder="e.g. procurement@company.com"
                        value={formData.email}
                        onChange={(e) => setField("email", e.target.value)}
                        className="w-full rounded-md border border-slate-300 bg-white py-2.5 px-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider flex items-center">
                      <span>Subject / Division Requirement</span>
                      <span className="text-blue-600 ml-1.5">*</span>
                    </label>
                    <input
                      id="contact-input-subject"
                      type="text"
                      required
                      placeholder="e.g. High-Density Polymer Packaging Supply (50,000 units)"
                      value={formData.subject}
                      onChange={(e) => setField("subject", e.target.value)}
                      className="w-full rounded-md border border-slate-300 bg-white py-2.5 px-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider flex items-center">
                      <span>Detailed Specifications / Inquiry</span>
                      <span className="text-blue-600 ml-1.5">*</span>
                    </label>
                    <textarea
                      id="contact-input-message"
                      rows={5}
                      required
                      placeholder="Please outline production timelines, material tolerances, or repair requirements..."
                      value={formData.message}
                      onChange={(e) => setField("message", e.target.value)}
                      className="w-full rounded-md border border-slate-300 bg-white py-2.5 px-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors font-sans leading-relaxed resize-y"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      id="contact-form-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center rounded-md bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 font-semibold text-sm transition-all duration-200 disabled:opacity-50 shadow-sm cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-3"></div>
                          <span>Transmitting to Multan Facility...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          <span>Submit Official Inquiry</span>
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

export default Contact;
