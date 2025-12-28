import { useEffect, useState } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';
import { dictionaries } from '../i18n';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const { isDark } = useDarkMode();

  const [locale, setLocale] = useState<'pt' | 'en'>('en');
  const [status, setStatus] = useState<Status>('idle');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale');
    if (storedLocale === 'pt' || storedLocale === 'en') {
      setLocale(storedLocale);
    }
  }, []);

  const t = dictionaries[locale].contact.form;

  const FORMSPREE_ENDPOINT = import.meta.env.PUBLIC_FORMSPREE_ENDPOINT;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Formspree error');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          {t.nameLabel}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border transition-colors"
          style={{
            backgroundColor: isDark ? 'rgba(31, 41, 55, 0.5)' : 'rgba(255, 255, 255, 1)',
            borderColor: isDark ? 'rgba(75, 85, 99, 1)' : 'rgba(229, 231, 235, 1)',
            color: isDark ? '#ffffff' : '#000000'
          }}
          placeholder={t.namePlaceholder}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          {t.emailLabel}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border transition-colors"
          style={{
            backgroundColor: isDark ? 'rgba(31, 41, 55, 0.5)' : 'rgba(255, 255, 255, 1)',
            borderColor: isDark ? 'rgba(75, 85, 99, 1)' : 'rgba(229, 231, 235, 1)',
            color: isDark ? '#ffffff' : '#000000'
          }}
          placeholder={t.emailPlaceholder}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          {t.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 rounded-lg border transition-colors resize-none"
          style={{
            backgroundColor: isDark ? 'rgba(31, 41, 55, 0.5)' : 'rgba(255, 255, 255, 1)',
            borderColor: isDark ? 'rgba(75, 85, 99, 1)' : 'rgba(229, 231, 235, 1)',
            color: isDark ? '#ffffff' : '#000000'
          }}
          placeholder={t.messagePlaceholder}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          backgroundColor: isDark ? '#ffffff' : '#000000',
          color: isDark ? '#000000' : '#ffffff'
        }}
      >
        {status === 'sending'
          ? t.sending
          : status === 'success'
          ? t.success
          : t.submit}
      </button>

      {status === 'success' && (
        <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-sm">
          {t.successMessage}
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-sm">
          {t.errorMessage}
        </div>
      )}
    </form>
  );
}
