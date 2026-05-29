import { PrimaryButtonProps } from "../../interfacesComponents";


export const PrimaryButton = ({ onClick, children, disabled }: PrimaryButtonProps
) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-full py-2 rounded-xl font-semibold text-lg transition-all duration-200 text-center
        ${disabled
                    ? 'bg-disabled-bg text-disabled-text cursor-not-allowed'
                    : 'bg-active-bg text-active-text hover:bg-active-bg-hover active:scale-[0.99] cursor-pointer shadow-md'
                }`}
        >
            {children}
        </button>
    );
};
