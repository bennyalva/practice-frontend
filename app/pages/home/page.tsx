"use client";

import { BrandLogo } from "@/app/components/shared/brandLogo";
import { useEffect, useState } from "react";
import { InputField } from "@/app/components/ui/inputField";
import { PrimaryButton } from "@/app/components/ui/primaryButton";
import { useHomeQueryParams } from "@/app/hooks/useHomeQueryParams/useHomeQueryParams";
import { applyTheme } from "@/app/helpers/theme/themeHelpers";
import { ASSETS_PATHS } from "@/app/constantsGlobals";

export default function HomePage() {
    const { logoUrl, welcomeTitle, theme, colorTitle } = useHomeQueryParams();

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    const [name, setName] = useState("");

    const handleStart = () => {
        console.log("Iniciando solicitud para:", name);
    };

    return (
        <div
            className="min-h-screen w-full flex flex-col justify-between items-center
                      bg-app px-6 py-4 transition-colors duration-300"
        >
            <header className="w-full max-w-md">
                <BrandLogo logoUrl={logoUrl} altText="Logo" />
            </header>

            <main className="w-full max-w-md flex-1 flex flex-col items-center justify-center text-center my-4">
                <div className="w-full max-w-[240px] aspect-[4/3] mb-8 flex justify-center items-center">
                    <img
                        src={ASSETS_PATHS.HOME.PEOPLE}
                        alt="Personas saludando"
                        className="w-full h-full object-contain"
                    />
                </div>

                <h1 className={`text-2xl font-bold leading-tight px-4 ${colorTitle}`}>
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
                    disabled={name.trim().length <= 3}
                >
                    Comenzar
                </PrimaryButton>
            </footer>
        </div>
    );
}
