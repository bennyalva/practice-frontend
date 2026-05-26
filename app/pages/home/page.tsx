"use client";

import { BrandLogo } from "@/app/components/shared/brandLogo";
import { use } from "react";
import { HomeProps } from "../interfacesPages";
import ThemeToggle from "@/app/components/shared/toggleTheme";
import { useState } from "react";
import { InputField } from "@/app/components/ui/inputField";
import { PrimaryButton } from "@/app/components/ui/primaryButton";


export default function HomePage({ searchParams }: HomeProps) {
    const resolvedParams = use(searchParams);
    const numParam = resolvedParams.num;

    // Sanitizar y validar el parámetro 
    let numValue: number | null = typeof numParam === 'string' ? parseInt(numParam, 10) : null;

    // Ejemplo de validación: si 'num' no es un número válido o no se envía, manejamos el caso
    if (numValue === null || isNaN(numValue)) {
        numValue = 1;
    }
    const [name, setName] = useState('');
    const handleStart = () => {
        if (name.trim().length > 0) {
            console.log("Iniciando solicitud para:", name);
        }
    };

    const logoUrl = "/images/pages/home/elecktraLight.png";
    const welcomeTitle = "¡Te damos la bienvenida a Préstamo Elektra!";

    return (
        <div className="min-h-screen w-full flex flex-col justify-between items-center 
                      bg-app px-6 py-4 transition-colors duration-300">
            <header className="w-full max-w-md">
                <BrandLogo logoUrl={logoUrl} altText="Logo Elektra" />
            </header>
            <main className="w-full max-w-md flex-1 flex flex-col items-center justify-center text-center my-4">
                <div className="w-full max-w-[240px] aspect-[4/3] mb-8 flex justify-center items-center">
                    <img
                        src="/images/pages/home/people.png"
                        alt="Personas saludando"
                        className="w-full h-full object-contain"
                    />
                </div>

                <h1 className="text-2xl font-bold text-brand-color leading-tight px-4">
                    {welcomeTitle}
                </h1>

                <p className="text-sm mt-3 px-6 text-secondary font-normal">
                    Usa tu préstamo como dinero en efectivo o compra en donde quieras.
                </p>

                <div className="w-full px-4 mt-4">
                    <InputField
                        label="¿Cómo prefieres que te llamemos?"
                        value={name}
                        onChange={setName}
                        maxLength={15}
                        placeholder="Escribe tu nombre"
                    />
                </div>

            </main>
            <footer className="w-full max-w-md pb-6 pt-2">
                <PrimaryButton
                    onClick={handleStart}
                    disabled={name.trim().length === 0}
                >
                    Comenzar
                </PrimaryButton>
            </footer>
            <ThemeToggle />
        </div>
    );
}
