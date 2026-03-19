'use client';

import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, MessageSquare, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ModernBackground from './ModernBackground';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { TiltCard } from './MagneticButton';
import { YAPIO_PHONE_DISPLAY, YAPIO_PHONE_E164, YAPIO_WHATSAPP_PHONE } from '@/lib/contact';
import ParallaxBackground from './ParallaxBackground';
import { usePerformanceMode } from '@/hooks/usePerformanceMode';

export default function Contact() {
  const { t, isLoading } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const performanceMode = usePerformanceMode();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const { submitContactForm } = await import('@/lib/supabase');
      
      const result = await submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        project_type: formData.projectType,
        message: formData.message,
      });

      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage(result.message);
        
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.message);
      }
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      setSubmitStatus('error');
      setSubmitMessage('Une erreur inattendue est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Protection contre les erreurs d'hydratation
  if (isLoading || !t?.contact) {
    return (
      <section id="contact" className="py-20 relative overflow-hidden cv-auto">
        <ModernBackground />
        <div className="max-w-7xl mx-auto section-padding relative z-10">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-700 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'tom@yapio.io',
      href: 'mailto:tom@yapio.io',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: YAPIO_PHONE_DISPLAY,
      href: `tel:${YAPIO_PHONE_E164}`,
    },
    {
      icon: MessageSquare,
      label: 'WhatsApp',
      value: YAPIO_PHONE_DISPLAY,
      href: `https://wa.me/${YAPIO_WHATSAPP_PHONE}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Worldwide Service',
      href: null,
    },
  ] as const;

  /** Style champs — aligné surfaces du site (globals: --surface, --border) */
  const fieldClass =
    'w-full rounded-xl bg-white/[0.03] border border-white/[0.08] px-4 py-3.5 text-[15px] leading-snug text-white ' +
    'placeholder:text-gray-500 placeholder:opacity-70 ' +
    'transition-[border-color,box-shadow,background-color] duration-200 ease-out ' +
    'hover:border-white/[0.12] hover:bg-white/[0.04] ' +
    'focus:border-primary/45 focus:bg-white/[0.045] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-0 ' +
    'disabled:opacity-50 disabled:cursor-not-allowed';

  const labelClass =
    'block text-[11px] font-medium uppercase tracking-[0.14em] text-gray-500 mb-2.5';

  return (
    <section id="contact" ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden cv-auto">
      {/* Arrière-plan moderne avec parallax */}
      {performanceMode ? (
        <div className="absolute -inset-[30%]">
          <ModernBackground />
        </div>
      ) : (
        <ParallaxBackground targetRef={sectionRef} className="absolute -inset-[30%]" yRange={['0%', '15%']}>
          <ModernBackground />
        </ParallaxBackground>
      )}
      
      <div className="max-w-7xl mx-auto section-padding relative z-10">
        {/* Section header */}
        <AnimatedSection animation="fadeUp" className="text-center mb-16 lg:mb-20">
          {t.contact.badge && (
            <p className="text-sm font-medium text-primary mb-6">{t.contact.badge}</p>
          )}

          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">
            {t.contact.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t.contact.subtitle}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <AnimatedSection animation="fadeRight">
            <div className="space-y-6">
              <TiltCard maxTilt={5}>
                <motion.div
                  className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-xl lg:p-10"
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent"
                    aria-hidden
                  />
                  <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-light text-white mb-8 tracking-tight">
                    {t.contact.infoTitle}
                  </h3>
                  
                  <div className="divide-y divide-white/[0.06]">
                    {contactInfo.map((info, index) => {
                      const Icon = info.icon;
                      const content = (
                        <motion.div
                          className="group flex items-center gap-4 py-5 first:pt-0 last:pb-0 transition-colors"
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.06, duration: 0.35 }}
                        >
                          <div
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.03] text-gray-400 transition-colors group-hover:border-white/[0.14] group-hover:bg-white/[0.05] group-hover:text-gray-200"
                            aria-hidden
                          >
                            <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-gray-500">
                              {t.contact.infoLabels[info.label as keyof typeof t.contact.infoLabels]}
                            </p>
                            <p
                              className="mt-1 text-base font-normal text-white/95 transition-colors group-hover:text-white md:text-[17px]"
                              dir="ltr"
                            >
                              {info.value}
                            </p>
                          </div>
                        </motion.div>
                      );

                      return info.href ? (
                        <a key={index} href={info.href} target={info.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                          {content}
                        </a>
                      ) : (
                        <div key={index}>{content}</div>
                      );
                    })}
                  </div>
                  </div>
                </motion.div>
              </TiltCard>

              {/* Decorative element */}
              <motion.div
                className="hidden lg:block relative h-32"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur-3xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection animation="fadeLeft">
            <TiltCard maxTilt={3}>
              <motion.div
                className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-xl md:p-8 lg:p-10"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              >
                {/* Accent supérieur discret */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent"
                  aria-hidden
                />

                <form onSubmit={handleSubmit} className="relative z-10 space-y-5 md:space-y-6">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-5 md:gap-y-5">
                    {[
                      { name: 'name', label: t.contact.form.name, type: 'text', required: true, autoComplete: 'name' as const },
                      { name: 'email', label: t.contact.form.email, type: 'email', required: true, autoComplete: 'email' as const },
                      { name: 'phone', label: t.contact.form.phone, type: 'tel', required: false, autoComplete: 'tel' as const },
                      { name: 'company', label: t.contact.form.company, type: 'text', required: false, autoComplete: 'organization' as const },
                    ].map((field, index) => (
                      <motion.div
                        key={field.name}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.06, duration: 0.35 }}
                      >
                        <label htmlFor={field.name} className={labelClass}>
                          {field.label}
                          {field.required && <span className="ml-1 text-primary/80">*</span>}
                        </label>
                        <input
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleChange}
                          required={field.required}
                          autoComplete={field.autoComplete}
                          onFocus={() => setFocusedField(field.name)}
                          onBlur={() => setFocusedField(null)}
                          className={`${fieldClass} ${focusedField === field.name ? 'border-primary/40 ring-2 ring-primary/15' : ''}`}
                          dir={field.type === 'tel' ? 'ltr' : undefined}
                        />
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.28, duration: 0.35 }}
                  >
                    <label htmlFor="projectType" className={labelClass}>
                      {t.contact.form.projectType}
                      <span className="ml-1 text-primary/80">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                        onFocus={() => setFocusedField('projectType')}
                        onBlur={() => setFocusedField(null)}
                        className={`${fieldClass} cursor-pointer appearance-none pr-11 ${focusedField === 'projectType' ? 'border-primary/40 ring-2 ring-primary/15' : ''}`}
                      >
                        <option value="" className="bg-[#0f0f0f] text-gray-400">
                          {t.contact.form.selectPlaceholder}
                        </option>
                        <option value="mobile" className="bg-[#0f0f0f] text-white">
                          {t.contact.projectTypes.mobile}
                        </option>
                        <option value="desktop" className="bg-[#0f0f0f] text-white">
                          {t.contact.projectTypes.desktop}
                        </option>
                        <option value="web" className="bg-[#0f0f0f] text-white">
                          {t.contact.projectTypes.web}
                        </option>
                        <option value="consulting" className="bg-[#0f0f0f] text-white">
                          {t.contact.projectTypes.consulting}
                        </option>
                        <option value="other" className="bg-[#0f0f0f] text-white">
                          {t.contact.projectTypes.other}
                        </option>
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                        strokeWidth={2}
                        aria-hidden
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.34, duration: 0.35 }}
                  >
                    <label htmlFor="message" className={labelClass}>
                      {t.contact.form.message}
                      <span className="ml-1 text-primary/80">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className={`${fieldClass} min-h-[140px] resize-y leading-relaxed ${focusedField === 'message' ? 'border-primary/40 ring-2 ring-primary/15' : ''}`}
                    />
                  </motion.div>
                  
                  {/* Messages de retour avec animation */}
                  {submitStatus === 'success' && (
                    <motion.div
                      className="flex items-center gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.08] p-4 text-sm text-emerald-200/95"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      <span>{submitMessage || t.contact.form.success}</span>
                    </motion.div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <motion.div
                      className="flex items-center gap-3 rounded-xl border border-red-500/25 bg-red-500/[0.08] p-4 text-sm text-red-200/95"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span>{submitMessage || t.contact.form.error}</span>
                    </motion.div>
                  )}
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="group mt-2 flex w-full items-center justify-center rounded-full gradient-primary px-8 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-primary/20 transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(119,55,233,0.28)] disabled:cursor-not-allowed disabled:opacity-50"
                    whileHover={isSubmitting ? undefined : { scale: 1.01 }}
                    whileTap={isSubmitting ? undefined : { scale: 0.99 }}
                  >
                    {isSubmitting ? (
                      <motion.div
                        className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                    ) : (
                      <>
                        {t.contact.form.send}
                        <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </TiltCard>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
