import { useEffect, useState } from "react";

export default function NavbarActions() {
  const [open, setOpen] = useState(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Verifica tema salvo ao carregar
    const storedTheme = localStorage.getItem("theme");
    const isDark = storedTheme === "dark" || document.documentElement.classList.contains("dark");
    
    if (isDark) {
      document.documentElement.classList.add("dark");
      setDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDark(false);
    }

    // Observa mudanças na classe 'dark' do HTML
    const observer = new MutationObserver(() => {
      const htmlElement = document.documentElement;
      const hasDarkClass = htmlElement.classList.contains("dark");
      setDark(hasDarkClass);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });

    return () => observer.disconnect();
  }, []);

  function toggle(type) {
    setOpen((prev) => (prev === type ? null : type));
  }

  function closeAll() {
    setOpen(null);
  }

  function toggleTheme() {
    const root = document.documentElement;

    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  }

  return (
    <>
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={toggleTheme}
          className="w-8 h-8 flex items-center justify-center
          rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition"
          aria-label="Toggle dark mode"
          type="button"
          title={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {!dark ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
              />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414m0-12.728l1.414 1.414m9.9 9.9l1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z"
              />
            </svg>
          )}
        </button>

        <button
          onClick={() => toggle("lang")}
          className="w-8 h-8 flex items-center justify-center
          rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition"
          aria-label="Change language"
          type="button"
        >
          🌐
        </button>

        <button
          onClick={() => toggle("menu")}
          className="md:hidden w-8 h-8 flex items-center justify-center
          rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition"
          aria-label="Open menu"
          type="button"
        >
          ☰
        </button>
      </div>

      {open === "lang" && (
        <div
          className="fixed top-16 mt-2 right-4 sm:right-6 lg:right-8 z-50
          w-44 rounded-md
          bg-bg-light dark:bg-bg-dark
          border border-gray-border dark:border-gray-dark-border
          shadow-lg overflow-hidden"
        >
          <button
            onClick={closeAll}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm
            hover:bg-black/5 dark:hover:bg-white/5"
            type="button"
          >
            🇺🇸 English
          </button>

          <button
            onClick={closeAll}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm
            hover:bg-black/5 dark:hover:bg-white/5"
            type="button"
          >
            🇧🇷 Português
          </button>
        </div>
      )}

      {open === "menu" && (
        <div
          className="fixed top-16 mt-2 right-4 sm:right-6 lg:right-8 z-50
          w-48 rounded-md
          bg-bg-light dark:bg-bg-dark
          border border-gray-border dark:border-gray-dark-border
          shadow-lg p-4 text-sm flex flex-col space-y-4"
        >
          <a href="#home" onClick={closeAll}>Home</a>
          <a href="#about" onClick={closeAll}>About</a>
          <a href="#projects" onClick={closeAll}>Projects</a>
          <a href="#contact" onClick={closeAll}>Contact</a>
        </div>
      )}
    </>
  );
}
