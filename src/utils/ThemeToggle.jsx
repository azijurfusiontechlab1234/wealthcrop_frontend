import { useLayoutEffect, useState } from "react";

export default function ThemeToggle() {
  // null = not initialized yet
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || null;
    } catch {
      return null;
    }
  });

  // Initialize to 'light' if null after mount (so UI shows something)
  useLayoutEffect(() => {
    if (theme === null) {
      // If user hasn't chosen, set based on current html class (initializer script)
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    }
    // we intentionally do not put anything else here
  }, [theme]);

  // Apply theme changes synchronously
  useLayoutEffect(() => {
    if (!theme) return;
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <button
      onClick={toggle}
      aria-pressed={theme === "dark"}
      className="p-2 rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
      title="Toggle theme"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
