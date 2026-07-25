import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CustomSelect({
  value,
  onChange,
  options,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected =
    options.find((o) => o.value === value) || options[0];

  return (
    <div className={`relative ${className}`} ref={ref}>
     <button
     type="button"
     aria-haspopup="listbox"
     aria-expanded={open}
     onClick={() => setOpen((v) => !v)}
      className="flex w-full items-center justify-between rounded-xl border border-pink-300 bg-white px-4 py-2 text-left shadow-sm transition hover:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
      >
        <span className="truncate">{selected.label}</span>
        <ChevronDown
          size={18}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
       <div
       role="listbox"
       className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-pink-200 bg-white shadow-xl"
        >
          {options.map((option) => (
            <button
             key={option.value}
             type="button"
             role="option"
             aria-selected={value === option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`block w-full px-4 py-2 text-left transition
                ${
                  value === option.value
                    ? "bg-pink-100 text-pink-600 font-medium"
                    : "hover:bg-pink-50"
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}