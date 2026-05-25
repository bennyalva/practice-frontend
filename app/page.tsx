import ThemeToggle from "./components/shared/toggleTheme";


export default function Home() {
  return (
    <main className="min-h-screen bg-background-app text-text-app p-8 transition-colors duration-300">
      <div className="max-w-md mx-auto text-center space-y-6">
        <h1 className="text-3xl font-bold">Proyecto React 19 + Tailwind v4</h1>
        <p className="text-sm opacity-80">
          Este contenedor cambia dinámicamente según el tema seleccionado.
        </p>
        <ThemeToggle />
      </div>
    </main>
  );
}
