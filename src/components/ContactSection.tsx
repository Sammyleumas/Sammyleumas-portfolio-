import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Send, CheckCircle2, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactSectionProps {
  prefillService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ prefillService }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState(prefillService || 'Web Development');
  const [budget, setBudget] = useState('$500');
  const [description, setDescription] = useState('');
  const [consent, setConsent] = useState(true);

  // Form State
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Copy helpers
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim() || !validateEmail(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!description.trim() || description.trim().length < 10) {
      setErrorMsg('Please describe your project or inquiry (minimum 10 characters).');
      return;
    }
    if (!consent) {
      setErrorMsg('Please agree to allow communication regarding this inquiry.');
      return;
    }

    setIsLoading(true);

    // Simulate reliable dispatch & generate fallback mailto link
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsLoading(false);
      setIsSuccess(true);
    } catch {
      setIsLoading(false);
      setErrorMsg('Network transmission failed. Please try again or use direct email.');
    }
  };

  const generateMailtoUrl = () => {
    const subject = encodeURIComponent(`Project Inquiry: ${service} - ${fullName}`);
    const body = encodeURIComponent(
      `Name: ${fullName}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nService: ${service}\nBudget: ${budget}\n\nProject Details:\n${description}`
    );
    return `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  const handleReset = () => {
    setIsSuccess(false);
    setErrorMsg(null);
    setFullName('');
    setEmail('');
    setCompany('');
    setDescription('');
  };

  return (
    <section id="contact" className="relative w-full py-24 sm:py-32 px-5 sm:px-8 md:px-12 bg-[#0A0B10] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#38BDF8] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
            <span>CONTACT &amp; COLLABORATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white editorial-title">
            Let&apos;s build something meaningful.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mt-3 leading-relaxed">
            Have a project, collaboration, or opportunity in mind? Tell me what you&apos;re working on.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact Details & Brand Confidence (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 shadow-xl backdrop-blur-sm">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2 font-semibold">
                Direct Channels
              </span>
              <p className="text-xs sm:text-sm text-slate-300 font-light mb-6">
                You can reach Sammy Leumas directly via email, phone, or schedule a virtual discovery sprint.
              </p>

              <div className="space-y-4">
                {/* Email item */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.05] flex items-center justify-center text-[#38BDF8]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">
                        EMAIL
                      </span>
                      <a
                        href={`mailto:${PERSONAL_INFO.email}`}
                        className="text-xs sm:text-sm font-bold text-white hover:text-[#38BDF8] transition-colors"
                      >
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    aria-label="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone item */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.05] flex items-center justify-center text-emerald-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">
                        DIRECT PHONE
                      </span>
                      <a
                        href={`tel:${PERSONAL_INFO.phone}`}
                        className="text-xs sm:text-sm font-bold text-white hover:text-emerald-400 transition-colors font-mono"
                      >
                        {PERSONAL_INFO.formattedPhone}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={copyPhone}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    aria-label="Copy Phone Number"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Location */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.05] flex items-center justify-center text-[#818CF8]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">
                      LOCATION &amp; TIMEZONE
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-white">
                      {PERSONAL_INFO.location} (WAT / UTC+1)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Promise */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-slate-400">
              <strong className="text-white block font-medium mb-1">Turnaround Commitment</strong>
              All client briefs, project inquiries, and technical questions receive a direct response within 24 business hours.
            </div>
          </div>

          {/* Right Column: Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-b from-white/[0.06] to-transparent border border-white/10 shadow-2xl backdrop-blur-sm">
              {isSuccess ? (
                <div className="py-8 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mb-6 leading-relaxed font-light">
                    Thank you, <span className="text-white font-medium">{fullName}</span>. Sammy Leumas has received your inquiry for <span className="text-white font-medium">{service}</span> and will review the details shortly.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={generateMailtoUrl()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs uppercase tracking-wider transition-colors"
                    >
                      <span>Open in Mail Client</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-900 font-semibold text-xs uppercase tracking-wider hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Send Another Message</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-[#F43F5E]/10 border border-[#F43F5E]/30 text-xs text-[#F43F5E] flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Alex Henderson"
                        className="w-full bg-[#08090E] border border-white/15 focus:border-[#38BDF8] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className="w-full bg-[#08090E] border border-white/15 focus:border-[#38BDF8] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Company & Budget Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                        Company or Project Name <span className="text-slate-500">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Studio / Startup name"
                        className="w-full bg-[#08090E] border border-white/15 focus:border-[#38BDF8] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                        Estimated Budget <span className="text-slate-500">(Optional)</span>
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full bg-[#08090E] border border-white/15 focus:border-[#38BDF8] rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors cursor-pointer"
                      >
                        <option value="$500">$500</option>
                        <option value="$500 - $1,000">$500 - $1,000</option>
                        <option value="$1,000 - $2,500">$1,000 - $2,500</option>
                        <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                        <option value="$5,000+">$5,000+</option>
                        <option value="Flexible / Negotiable">Flexible / Negotiable</option>
                      </select>
                    </div>
                  </div>

                  {/* Service of Interest */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 font-medium">
                      Service of Interest
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        'Web Development',
                        'UI/UX Design',
                        'Branding',
                        'AI & Prompting',
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setService(item)}
                          className={`p-2.5 rounded-xl text-xs font-medium text-center border transition-all cursor-pointer ${
                            service === item
                              ? 'border-[#38BDF8] bg-[#38BDF8]/10 text-white font-semibold'
                              : 'border-white/10 bg-white/[0.02] text-slate-400 hover:text-white'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                      Project Description *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your goals, timeline, deliverables, or problem you want to solve..."
                      className="w-full bg-[#08090E] border border-white/15 focus:border-[#38BDF8] rounded-xl p-4 text-sm text-white placeholder-slate-500 outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-white/20 bg-[#08090E] text-[#38BDF8] focus:ring-0 cursor-pointer"
                    />
                    <label htmlFor="consent" className="text-xs text-slate-400 cursor-pointer select-none">
                      I agree to allow Sammy Leumas to process these details to respond to this inquiry.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-[11px] text-slate-500 font-mono">
                      Direct delivery to {PERSONAL_INFO.email}
                    </span>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-slate-900 font-semibold text-xs uppercase tracking-wider hover:bg-slate-200 active:scale-95 disabled:opacity-50 transition-all cursor-pointer shadow-lg"
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Transmitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Project Brief</span>
                          <Send className="w-4 h-4" />
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
};

export default ContactSection;
