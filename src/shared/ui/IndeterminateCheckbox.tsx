import { HTMLProps, useEffect, useRef } from "react";

export const IndeterminateCheckbox = ({
  indeterminate,
  className = "",
  testId,
  ...rest
}: { indeterminate?: boolean; testId?: string } & HTMLProps<HTMLInputElement>) => {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <label className="inline-flex items-center cursor-pointer relative w-4 h-4">
      <input
        type="checkbox"
        ref={ref}
        className={`${className} peer appearance-none w-4 h-4 border border-gray-300 rounded-sm bg-white 
          checked:bg-primary checked:border-transparent 
          indeterminate:bg-primary indeterminate:border-transparent 
          focus:outline-none focus:ring-2 focus:ring-primary transition`}
        data-testid={testId}
        {...rest}
      />
      {/* Checkmark icon */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none hidden peer-checked:block"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
};
