"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>("light");

  // Leer la preferencia guardada al cargar la página
  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme") || "light";
    setTheme(savedTheme);
    
    // Aplicar la clase o el atributo al elemento raíz (html)
    const root = document.documentElement;
    if (savedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  // Función para cambiar de tema alternando entre Light y Dark
  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    const root = document.documentElement;
    
    if (nextTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    setTheme(nextTheme);
    localStorage.setItem("app-theme", nextTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-primary-app text-background-app font-medium rounded-lg transition-colors duration-200"
    >
      Cambiar a modo {theme === "light" ? "Oscuro" : "Claro"}
    </button>
  );
}
