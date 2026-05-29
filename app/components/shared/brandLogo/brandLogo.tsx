import { BrandLogoProps } from "../../interfacesComponents";


export const BrandLogo = ({ logoUrl, altText = "Logo Elektra" }: BrandLogoProps) => {
    return (
        <div className="flex justify-center w-full py-6">
            {logoUrl ? (
                <img src={logoUrl} alt={altText} className="h-6 w-auto object-contain" />
            ) : (
                <div className="flex items-center gap-2 font-bold tracking-wider text-xl text-primary">
                    <span className="text-brand-color">⚡</span> elektra
                </div>
            )}
        </div>
    );
};
