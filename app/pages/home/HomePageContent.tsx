"use client";

import { BrandLogo } from "@/app/components/shared/brandLogo";
import { useState } from "react";
import { InputField } from "@/app/components/ui/inputField";
import { PrimaryButton } from "@/app/components/ui/primaryButton";
import { Modal } from "@/app/components/ui/modal";
import { useHomeQueryParams } from "@/app/hooks/useHomeQueryParams/useHomeQueryParams";
import { ASSETS_PATHS, GTM_EVENTS, VALIDATION } from "@/app/constantsGlobals";
import { useModal } from "@/app/hooks/useModal/useModal";
import { pushToDataLayer } from "@/app/libs/gtm/gtm";
import { InputMethods } from "../interfacesPages";

export function HomePageContent() {
    const { logoUrl, welcomeTitle, colorTitle } = useHomeQueryParams();

    const [name, setName] = useState("");
    const [inputKey, setInputKey] = useState(0);
    const { modal, showInfo, showByError, closeModal } = useModal();

    const handleCommit = (value: string, method: InputMethods) => {
        pushToDataLayer({
            event: GTM_EVENTS.NAME_INPUT,
            method,
        });
    };

    const handleStart = () => {
        pushToDataLayer({
            event: GTM_EVENTS.NAME_DISPLAYED
        });
        showInfo("¡Nombre registrado!", `Has ingresado: ${name}`, () => {
            setName("");
            setInputKey((prev) => prev + 1);
        });
    };

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center
                      bg-app px-4 py-4 transition-colors duration-300"
        >
            <div className="w-full max-w-md max-h-[800px] flex flex-col justify-between overflow-y-auto">
                <header>
                    <BrandLogo logoUrl={logoUrl} altText="Logo" />
                </header>

                <main className="flex-1 flex flex-col items-center justify-center text-center my-4">
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
                            key={inputKey}
                            label="¿Cómo prefieres que te llamemos?"
                            value={name}
                            onChange={setName}
                            onCommit={handleCommit}
                            maxLength={15}
                            placeholder="Escribe o dicta tu nombre..."
                            onSpeechError={showByError}
                        />
                    </div>
                </main>

                <footer className="pb-6 pt-2">
                    <PrimaryButton
                        onClick={handleStart}
                        disabled={name.trim().length < VALIDATION.NAME_MIN_LENGTH}
                    >
                        Comenzar
                    </PrimaryButton>
                </footer>
            </div>

            <Modal
                isOpen={modal.isOpen}
                onClose={closeModal}
                type={modal.type}
                title={modal.title}
                message={modal.message}
            />
        </div>
    );
}
