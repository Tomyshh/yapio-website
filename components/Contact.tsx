'use client';

import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
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
      color: 'from-primary to-primary-600',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: YAPIO_PHONE_DISPLAY,
      href: `tel:${YAPIO_PHONE_E164}`,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: MessageSquare,
      label: 'WhatsApp',
      value: YAPIO_PHONE_DISPLAY,
      href: `https://wa.me/${YAPIO_WHATSAPP_PHONE}`,
      color: 'from-primary to-primary-600',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Worldwide Service',
      href: null,
      color: 'from-primary to-primary-600',
    },
  ];

  const inputVariants = {
    focus: { scale: 1.02, borderColor: '#7737E9' },
    blur: { scale: 1, borderColor: 'rgba(255,255,255,0.1)' },
  };

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
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">{t.contact.badge}</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-overcame-bold">
            <span className="gradient-text">{t.contact.title}</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400">
            {t.contact.subtitle}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <AnimatedSection animation="fadeRight">
            <div className="space-y-6">
              <TiltCard maxTilt={5}>
                <motion.div 
                  className="glass rounded-2xl p-8 lg:p-10"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-2xl font-semibold mb-8 text-white">
                    {t.contact.infoTitle}
                  </h3>
                  
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => {
                      const Icon = info.icon;
                      const content = (
                        <motion.div 
                          className="flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 hover:bg-white/5 group"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ x: 10 }}
                        >
                          <motion.div 
                            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.color} p-3`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <Icon className="w-full h-full text-white" />
                          </motion.div>
                          <div>
                            <p className="text-gray-400 text-sm">{t.contact.infoLabels[info.label as keyof typeof t.contact.infoLabels]}</p>
                            <p className="text-white text-lg font-medium group-hover:text-primary transition-colors">
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
                className="glass rounded-2xl p-8 lg:p-10"
                whileHover={{ y: -5 }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { name: 'name', label: t.contact.form.name, type: 'text', required: true },
                      { name: 'email', label: t.contact.form.email, type: 'email', required: true },
                      { name: 'phone', label: t.contact.form.phone, type: 'tel', required: false },
                      { name: 'company', label: t.contact.form.company, type: 'text', required: false },
                    ].map((field, index) => (
                      <motion.div
                        key={field.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <label htmlFor={field.name} className="block text-sm font-medium text-gray-300 mb-2">
                          {field.label}
                        </label>
                        <motion.input
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleChange}
                          required={field.required}
                          onFocus={() => setFocusedField(field.name)}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-4 py-3 bg-dark-200/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-white transition-all duration-300"
                          animate={focusedField === field.name ? 'focus' : 'blur'}
                          variants={inputVariants}
                        />
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
                      {t.contact.form.projectType}
                    </label>
                    <motion.select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      onFocus={() => setFocusedField('projectType')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 bg-dark-200/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-white transition-all duration-300"
                      animate={focusedField === 'projectType' ? 'focus' : 'blur'}
                      variants={inputVariants}
                    >
                      <option value="">{t.contact.form.selectPlaceholder}</option>
                      <option value="mobile">{t.contact.projectTypes.mobile}</option>
                      <option value="desktop">{t.contact.projectTypes.desktop}</option>
                      <option value="web">{t.contact.projectTypes.web}</option>
                      <option value="consulting">{t.contact.projectTypes.consulting}</option>
                      <option value="other">{t.contact.projectTypes.other}</option>
                    </motion.select>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      {t.contact.form.message}
                    </label>
                    <motion.textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      required
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 bg-dark-200/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-white resize-none transition-all duration-300"
                      animate={focusedField === 'message' ? 'focus' : 'blur'}
                      variants={inputVariants}
                    />
                  </motion.div>
                  
                  {/* Messages de retour avec animation */}
                  {submitStatus === 'success' && (
                    <motion.div 
                      className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300 flex items-center space-x-3"
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
                      className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 flex items-center space-x-3"
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
                    className="w-full gradient-primary text-white px-6 py-4 rounded-xl font-semibold shadow-lg shadow-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
                    whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(119, 55, 233, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
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
