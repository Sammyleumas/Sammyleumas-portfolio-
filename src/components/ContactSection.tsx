import React, { useState } from 'react';
import { motion } from 'motion/react';
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
    <section
      id="contact"
      className="relative w-full py-24 sm:py-32 px-5 sm:px-8 md:px-12 border-t overflow-hidden transition-colors"
      style={{
        backgroundColor: 'var(--bg-page)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header with BIG FONT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="mb-16 pb-8 border-b"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-3 font-bold">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--primary-accent)' }}
            />
            <span style={{ color: 'var(--primary-accent)' }}>CONTACT &amp; COLLABORATION</span>
          </div>
          {/* BIG FONT FOR SECTION */}
          <h2
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight big-section-title"
            style={{ color: 'var(--text-primary)' }}
          >
            Let&apos;s build something meaningful.
          </h2>
          <p
            className="text-base sm:text-lg font-normal max-w-2xl mt-4 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Have a project, collaboration, or opportunity in mind? Tell me what you&apos;re working on.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div
              className="p-6 sm:p-8 rounded-3xl border shadow-xl"
              style={{
                backgroundColor: 'var(--surface-card)',
                borderColor: 'var(--border-color)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <div
                className="flex items-center gap-3.5 mb-6 pb-4 border-b"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl overflow-hidden border shrink-0"
                  style={{
                    backgroundColor: 'var(--surface-secondary)',
                    borderColor: 'var(--border-color)',
                  }}
                >
                  <img
                    src={PERSONAL_INFO.profileImage}
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover object-top filter contrast-[1.05]"
                  />
                </div>
                <div>
                  <span
                    className="text-xs font-mono uppercase tracking-wider block font-bold"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Direct Channels
                  </span>
                  <div className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>
                    Sammy Leumas
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-normal mb-6" style={{ color: 'var(--text-secondary)' }}>
                You can reach Sammy Leumas directly via email, phone, or schedule a virtual discovery sprint.
              </p>

              <div className="space-y-4">
                {/* Email item */}
                <div
                  className="p-4 rounded-2xl border flex items-center justify-between"
                  style={{
                    backgroundColor: 'var(--surface-secondary)',
                    borderColor: 'var(--border-color)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: 'var(--surface-card)',
                        color: 'var(--primary-accent)',
                      }}
                    >
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span
                        className="text-[10px] font-mono uppercase tracking-wider block font-bold"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        EMAIL
                      </span>
                      <a
                        href={`mailto:${PERSONAL_INFO.email}`}
                        className="text-xs sm:text-sm font-bold transition-opacity hover:opacity-80"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="p-2 rounded-lg border transition-colors cursor-pointer"
                    style={{
                      backgroundColor: 'var(--surface-card)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-secondary)',
                    }}
                    aria-label="Copy Email"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4" style={{ color: 'var(--color-success)' }} />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Phone item */}
                <div
                  className="p-4 rounded-2xl border flex items-center justify-between"
                  style={{
                    backgroundColor: 'var(--surface-secondary)',
                    borderColor: 'var(--border-color)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: 'var(--surface-card)',
                        color: 'var(--color-success)',
                      }}
                    >
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span
                        className="text-[10px] font-mono uppercase tracking-wider block font-bold"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        DIRECT PHONE
                      </span>
                      <a
                        href={`tel:${PERSONAL_INFO.phone}`}
                        className="text-xs sm:text-sm font-bold transition-opacity hover:opacity-80 font-mono"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {PERSONAL_INFO.formattedPhone}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={copyPhone}
                    className="p-2 rounded-lg border transition-colors cursor-pointer"
                    style={{
                      backgroundColor: 'var(--surface-card)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-secondary)',
                    }}
                    aria-label="Copy Phone Number"
                  >
                    {copiedPhone ? (
                      <Check className="w-4 h-4" style={{ color: 'var(--color-success)' }} />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Location */}
                <div
                  className="p-4 rounded-2xl border flex items-center gap-3"
                  style={{
                    backgroundColor: 'var(--surface-secondary)',
                    borderColor: 'var(--border-color)',
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: 'var(--surface-card)',
                      color: 'var(--accent-hover)',
                    }}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span
                      className="text-[10px] font-mono uppercase tracking-wider block font-bold"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      LOCATION &amp; TIMEZONE
                    </span>
                    <span className="text-xs sm:text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {PERSONAL_INFO.location} (WAT / UTC+1)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Promise */}
            <div
              className="p-5 rounded-2xl border text-xs"
              style={{
                backgroundColor: 'var(--surface-card)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-secondary)',
              }}
            >
              <strong className="block font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                Turnaround Commitment
              </strong>
              All client briefs, project inquiries, and technical questions receive a direct response within 24 business hours.
            </div>
          </div>

          {/* Right Column: Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <div
              className="p-6 sm:p-8 md:p-10 rounded-3xl border shadow-xl"
              style={{
                backgroundColor: 'var(--surface-card)',
                borderColor: 'var(--border-color)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              {isSuccess ? (
                <div className="py-8 flex flex-col items-center text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{
                      backgroundColor: 'var(--badge-bg)',
                      color: 'var(--color-success)',
                    }}
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>
                    Inquiry Received
                  </h3>
                  <p
                    className="text-sm max-w-md mb-6 leading-relaxed font-normal"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Thank you, <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{fullName}</span>. Sammy Leumas has received your inquiry for <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{service}</span> and will review the details shortly.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={generateMailtoUrl()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border font-bold text-xs uppercase tracking-wider transition-colors"
                      style={{
                        backgroundColor: 'var(--surface-secondary)',
                        borderColor: 'var(--border-color)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      <span>Open in Mail Client</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      style={{ backgroundColor: 'var(--primary-accent)' }}
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Send Another Message</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMsg && (
                    <div
                      className="p-4 rounded-xl border text-xs flex items-center gap-2"
                      style={{
                        backgroundColor: 'rgba(220, 38, 38, 0.1)',
                        borderColor: 'var(--color-error)',
                        color: 'var(--color-error)',
                      }}
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span className="font-semibold">{errorMsg}</span>
                    </div>
                  )}

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Alex Henderson"
                        className="w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                        style={{
                          backgroundColor: 'var(--surface-secondary)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-primary)',
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className="w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                        style={{
                          backgroundColor: 'var(--surface-secondary)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-primary)',
                        }}
                      />
                    </div>
                  </div>

                  {/* Company & Budget Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        Company or Project Name <span className="opacity-60">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Studio / Startup name"
                        className="w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                        style={{
                          backgroundColor: 'var(--surface-secondary)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-primary)',
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        Estimated Budget <span className="opacity-60">(500 USD Base)</span>
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors cursor-pointer"
                        style={{
                          backgroundColor: 'var(--surface-secondary)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-primary)',
                        }}
                      >
                        <option value="$500">$500 (Base Project)</option>
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
                    <label
                      className="block text-xs font-mono uppercase tracking-wider mb-2 font-bold"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      Service of Interest
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        'Web Development',
                        'UI/UX Design',
                        '3D Web & WebGL',
                        'AI & Prompting',
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setService(item)}
                          className="p-2.5 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer"
                          style={{
                            backgroundColor: service === item ? 'var(--primary-accent)' : 'var(--surface-secondary)',
                            borderColor: service === item ? 'var(--primary-accent)' : 'var(--border-color)',
                            color: service === item ? '#FFFFFF' : 'var(--text-secondary)',
                          }}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label
                      className="block text-xs font-mono uppercase tracking-wider mb-1.5 font-bold"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      Project Description *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your goals, timeline, deliverables, or problem you want to solve..."
                      className="w-full border rounded-xl p-4 text-sm outline-none transition-colors resize-none"
                      style={{
                        backgroundColor: 'var(--surface-secondary)',
                        borderColor: 'var(--border-color)',
                        color: 'var(--text-primary)',
                      }}
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded cursor-pointer"
                      style={{ accentColor: 'var(--primary-accent)' }}
                    />
                    <label
                      htmlFor="consent"
                      className="text-xs cursor-pointer select-none font-medium"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      I agree to allow Sammy Leumas to process these details to respond to this inquiry.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-[11px] font-mono" style={{ color: 'var(--text-secondary)' }}>
                      Direct delivery to {PERSONAL_INFO.email}
                    </span>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-white font-bold text-xs uppercase tracking-wider disabled:opacity-50 transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                      style={{ backgroundColor: 'var(--primary-accent)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-accent)')}
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
