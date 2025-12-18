import { useState, useEffect } from 'react';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const initialDark = storedTheme === 'dark' || document.documentElement.classList.contains('dark');
    
    if (initialDark) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }

    const observer = new MutationObserver(() => {
      const hasDark = document.documentElement.classList.contains('dark');
      setIsDark(hasDark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const newTheme = root.classList.contains('dark') ? 'light' : 'dark';
    
    root.classList.toggle('dark');
    localStorage.setItem('theme', newTheme);
    setIsDark(newTheme === 'dark');
  };

  return { isDark, toggleTheme };
}