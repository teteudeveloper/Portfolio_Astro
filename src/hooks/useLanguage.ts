import { useEffect, useState } from 'react';
import { dictionaries, type Locale } from '../i18n';

const STORAGE_KEY = 'locale';

export function useLanguage() {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved) setLocale(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);
    window.dispatchEvent(new Event('language-change'));
  }, [locale]);

  return {
    locale,
    setLocale,
    dictionary: dictionaries[locale],
  };
}
