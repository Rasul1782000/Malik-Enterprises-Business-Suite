import { Mail, Terminal } from "lucide-react";
import { useAdminMessages } from "../hooks/useAdminMessages";

export function AdminPortal() {
  const { messages, loading, error } = useAdminMessages(5000);

  const formatTimestamp = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleString();
    } catch (e) {
      return isoString;
    }
  };

  return (
    <section className="bg-slate-50 py-12 sm:py-16 min-h-screen border-b border-slate-200" id="admin-portal-dashboard">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-6 mb-8 gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 text-blue-700 font-mono text-[10px] font-bold uppercase tracking-widest">
              <Terminal className="h-4 w-4 text-blue-600" />
              <span>Executive Dispatch Operations</span>
            </div>
            <h2 className="font-display italic text-3xl font-bold tracking-tight text-slate-900">
              Operations Command Desk
            </h2>
            <p className="text-xs text-slate-600 font-sans max-w-xl leading-relaxed">
              Review real-time incoming corporate inquiries and equipment requests originating from the website.
            </p>
          </div>

          <div className="flex items-center space-x-3 self-start md:self-auto">
            <div className="rounded-md bg-white border border-slate-200 px-3 py-1.5 flex items-center space-x-2 text-[11px] font-mono font-semibold text-slate-700 shadow-xs uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              <span>API Storage Active</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-amber-50 border border-amber-200 text-xs font-mono text-amber-800">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
            <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Total Inquiries Received</span>
            <div className="flex items-baseline space-x-2 mt-2">
              <span className="text-4xl font-display italic font-bold text-slate-900">{messages.length}</span>
              <span className="text-xs text-blue-700 font-mono font-bold uppercase tracking-wider">Active Leads</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
            <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Plant Dispatch SLA</span>
            <div className="flex items-baseline space-x-2 mt-2">
              <span className="text-4xl font-display italic font-bold text-blue-700">&lt; 24h</span>
              <span className="text-xs text-slate-500 font-mono uppercase tracking-wider">Response Target</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 border border-slate-200 bg-white rounded-xl">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider">Loading inquiry transmissions...</p>
          </div>
        ) : (
          <div className="space-y-6" id="portal-messages-list">
            {messages.length === 0 ? (
              <div className="text-center py-16 border border-slate-200 bg-white rounded-xl shadow-xs">
                <Mail className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                <h4 className="text-base font-bold text-slate-900">No Pending Inquiries</h4>
                <p className="text-xs text-slate-500 mt-1">Inquiries submitted via the Contact page will be cataloged here automatically.</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div 
                  key={msg.id} 
                  id={`portal-msg-${msg.id}`}
                  className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-blue-700 block uppercase tracking-wider mb-0.5">REF: {msg.id}</span>
                      <h4 className="font-display italic text-2xl font-bold text-slate-900">{msg.subject}</h4>
                    </div>
                    <span className="text-xs font-mono font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded border border-slate-200 self-start sm:self-auto">
                      {formatTimestamp(msg.timestamp)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/70">
                      <span className="text-slate-500 block font-semibold uppercase tracking-wider text-[10px] mb-1">Inquirer</span>
                      <span className="text-slate-900 font-bold text-sm">{msg.name}</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/70">
                      <span className="text-slate-500 block font-semibold uppercase tracking-wider text-[10px] mb-1">Corporate Email</span>
                      <span className="text-blue-700 font-bold text-sm">{msg.email}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 font-sans text-sm text-slate-700 leading-relaxed">
                    {msg.message}
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

export default AdminPortal;
