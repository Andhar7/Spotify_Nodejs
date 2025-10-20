import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={`
          flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-800
          px-3 py-2 text-sm text-white placeholder:text-zinc-400
          focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
          focus:ring-offset-zinc-900
          disabled:cursor-not-allowed disabled:opacity-50
          ${className}
        `}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
