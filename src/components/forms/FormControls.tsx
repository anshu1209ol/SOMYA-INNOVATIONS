import React from "react";
import { cn } from "@/lib/utils";

// ─── Shared Form Field Wrapper ──────────────────────────────────

interface FieldHeaderProps {
  id?: string;
  label?: string;
  required?: boolean;
  hint?: string;
}

function FieldHeader({ id, label, required, hint }: FieldHeaderProps) {
  if (!label && !hint) return null;
  return (
    <div className="flex items-center justify-between mb-2">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-mono uppercase tracking-wider text-current opacity-80"
        >
          {label}
          {required && (
            <span className="text-[#641F2A] ml-1 font-bold" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {hint && (
        <span id={id ? `${id}-hint` : undefined} className="text-xs text-current opacity-60">
          {hint}
        </span>
      )}
    </div>
  );
}

// ─── Input Component ──────────────────────────────────────────────

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, required, ...props }, ref) => {
    const errorId = id && error ? `${id}-error` : undefined;
    const hintId = id && hint ? `${id}-hint` : undefined;
    const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="w-full">
        <FieldHeader id={id} label={label} required={required} hint={hint} />
        <input
          id={id}
          ref={ref}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={cn(
            "w-full px-3.5 py-2.5 rounded-lg text-sm text-[#F1EBDD]",
            "bg-[#1B1B18] border border-white/[0.12]",
            "placeholder:text-[#F1EBDD]/40",
            "focus:outline-none focus:border-[#641F2A] focus:ring-2 focus:ring-[#641F2A]/30",
            "transition-all duration-200",
            error && "border-red-500/60 focus:border-red-500 focus:ring-red-500/30",
            className
          )}
          {...props}
        />
        {error && (
          <p
            id={errorId}
            role="alert"
            className="mt-1.5 text-xs text-red-400 font-medium flex items-center gap-1"
          >
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

// ─── Textarea Component ───────────────────────────────────────────

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, required, rows = 4, ...props }, ref) => {
    const errorId = id && error ? `${id}-error` : undefined;
    const hintId = id && hint ? `${id}-hint` : undefined;
    const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="w-full">
        <FieldHeader id={id} label={label} required={required} hint={hint} />
        <textarea
          id={id}
          ref={ref}
          required={required}
          rows={rows}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={cn(
            "w-full px-3.5 py-2.5 rounded-lg text-sm text-[#F1EBDD] resize-none",
            "bg-[#1B1B18] border border-white/[0.12]",
            "placeholder:text-[#F1EBDD]/40",
            "focus:outline-none focus:border-[#641F2A] focus:ring-2 focus:ring-[#641F2A]/30",
            "transition-all duration-200",
            error && "border-red-500/60 focus:border-red-500 focus:ring-red-500/30",
            className
          )}
          {...props}
        />
        {error && (
          <p
            id={errorId}
            role="alert"
            className="mt-1.5 text-xs text-red-400 font-medium flex items-center gap-1"
          >
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

// ─── Select Component ─────────────────────────────────────────────

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: readonly string[] | Array<{ value: string; label: string }>;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, id, required, options, placeholder, ...props }, ref) => {
    const errorId = id && error ? `${id}-error` : undefined;
    const hintId = id && hint ? `${id}-hint` : undefined;
    const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="w-full">
        <FieldHeader id={id} label={label} required={required} hint={hint} />
        <div className="relative">
          <select
            id={id}
            ref={ref}
            required={required}
            aria-required={required}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={cn(
              "w-full px-3.5 py-2.5 rounded-lg text-sm text-[#F1EBDD]",
              "bg-[#1B1B18] border border-white/[0.12]",
              "focus:outline-none focus:border-[#641F2A] focus:ring-2 focus:ring-[#641F2A]/30",
              "transition-all duration-200 appearance-none cursor-pointer pr-10",
              error && "border-red-500/60 focus:border-red-500 focus:ring-red-500/30",
              className
            )}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23F1EBDD' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 14px center",
            }}
            {...props}
          >
            {placeholder && (
              <option value="" disabled className="bg-[#11110F] text-[#F1EBDD]/40">
                {placeholder}
              </option>
            )}
            {options.map((opt) => {
              const val = typeof opt === "string" ? opt : opt.value;
              const text = typeof opt === "string" ? opt : opt.label;
              return (
                <option key={val} value={val} className="bg-[#11110F] text-[#F1EBDD] py-1">
                  {text}
                </option>
              );
            })}
          </select>
        </div>
        {error && (
          <p
            id={errorId}
            role="alert"
            className="mt-1.5 text-xs text-red-400 font-medium flex items-center gap-1"
          >
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";
