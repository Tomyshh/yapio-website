'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
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

    try {
      // Ici on intégrera Supabase plus tard
      // Pour l'instant, on simule l'envoi
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Envoyer un email via mailto en attendant l'intégration
      const mailtoLink = `mailto:tomyyapp@gmail.com?subject=Demande de devis - ${formData.projectType}&body=${encodeURIComponent(
        `Nom: ${formData.name}\nEmail: ${formData.email}\nTéléphone: ${formData.phone}\nEntreprise: ${formData.company}\nType de projet: ${formData.projectType}\n\nMessage:\n${formData.message}`
      )}`;
      window.open(mailtoLink);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        message: '',
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto section-padding">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t.contact.title}</span>
          </h2>
          <p className="text-lg text-gray-400">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6 text-white">
                Informations de contact
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full gradient-primary p-3">
                    <Mail className="w-full h-full text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400">Email</p>
                    <a href="mailto:tomyyapp@gmail.com" className="text-white hover:text-primary transition-colors">
                      tomyyapp@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full gradient-primary p-3">
                    <Phone className="w-full h-full text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400">WhatsApp</p>
                    <a href="https://wa.me/972584268519" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors">
                      +972 58 426 8519
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full gradient-primary p-3">
                    <MapPin className="w-full h-full text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400">Location</p>
                    <p className="text-white">Worldwide Service</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    {t.contact.form.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-200 border border-dark-300 rounded-lg focus:outline-none focus:border-primary text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    {t.contact.form.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-200 border border-dark-300 rounded-lg focus:outline-none focus:border-primary text-white"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    {t.contact.form.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-200 border border-dark-300 rounded-lg focus:outline-none focus:border-primary text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    {t.contact.form.company}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-200 border border-dark-300 rounded-lg focus:outline-none focus:border-primary text-white"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
                  {t.contact.form.projectType}
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-200 border border-dark-300 rounded-lg focus:outline-none focus:border-primary text-white"
                >
                  <option value="">---</option>
                  <option value="mobile">{t.contact.projectTypes.mobile}</option>
                  <option value="desktop">{t.contact.projectTypes.desktop}</option>
                  <option value="web">{t.contact.projectTypes.web}</option>
                  <option value="consulting">{t.contact.projectTypes.consulting}</option>
                  <option value="other">{t.contact.projectTypes.other}</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  {t.contact.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-dark-200 border border-dark-300 rounded-lg focus:outline-none focus:border-primary text-white resize-none"
                />
              </div>
              
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400">
                  {t.contact.form.success}
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
                  {t.contact.form.error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full gradient-primary text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  t.contact.form.sending
                ) : (
                  <>
                    {t.contact.form.send}
                    <Send className="ml-2" size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
