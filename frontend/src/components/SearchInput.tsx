import clsx from "clsx";
import React from "react";
import { BiSearch } from "react-icons/bi";

interface SearchInputProps
  extends Omit<React.ComponentProps<"input">, "className"> {
  isInvalid?: boolean;
  buttonProps?: React.ComponentProps<"button">;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ isInvalid, buttonProps, ...inputProps }, ref) => {
    return (
      <div className={"relative w-full lg:max-w-sm mb-3"}>
        <input
          placeholder="Search"
          className={clsx(
            "focus:outline-none focus:border-blue-500 focus:ring-blue-500 border-2 rounded border-[#BEC7CE] h-14 md:h-10 p-2 w-full",
            {
              "border-red-500 focus:border-red-500 focus:ring-red-500 ":
                isInvalid,
            },
          )}
          aria-invalid={isInvalid}
          ref={ref}
          {...inputProps}
        />
        <button
          className="bg-[#506273] text-white px-3 py-3 md:p-1 absolute right-2.5 bottom-2.5 rounded-md focus:ring-4 focus:outline-none focus:ring-blue-300"
          type="submit"
          {...buttonProps}>
          <BiSearch />
        </button>
      </div>
    );
  },
);
