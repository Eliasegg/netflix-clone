// YOINK: https://ui.shadcn.com/
import { ButtonHTMLAttributes, forwardRef } from "react";

interface NetflixButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "white" | "gray";
  children: React.ReactNode;
}

const NetflixButton = forwardRef<HTMLButtonElement, NetflixButtonProps>(
  ({ variant = "white", className = "", children, ...props }, ref) => {
    const variantClasses = {
      white: "bg-white text-black hover:bg-white/80",
      gray: "bg-[rgba(109,109,110,0.7)] text-white hover:bg-[rgba(109,109,110,0.9)]",
    };

    const baseClasses =
      "flex items-center justify-center gap-1.5 appearance-none border-0 rounded cursor-pointer opacity-100 relative select-none whitespace-nowrap mb-3 mr-3 px-4 sm:px-5 md:px-6 py-2 md:py-2.5 transition-all duration-200 font-semibold text-xs sm:text-sm md:text-[0.95rem]";

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        style={{
          WebkitTextSizeAdjust: "100%",
          WebkitFontSmoothing: "antialiased",
          willChange: "background-color, color",
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

NetflixButton.displayName = "NetflixButton";

export default NetflixButton;

