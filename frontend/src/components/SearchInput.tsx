import clsx from "clsx";

interface SearchInputProps {
  className?: string;
}

export const SearchInput = ({ className }: SearchInputProps) => {
  return (
    <div className={clsx("relative w-full lg:max-w-sm", className)}>
      <input
        placeholder="Search"
        className="focus:outline-none focus:border-blue-500 focus:ring-blue-500 border-2 rounded border-[#BEC7CE] h-14 md:h-10 p-2 w-full"
      ></input>
      <button className="bg-[#506273] text-white px-3 py-3 md:p-1 absolute right-2.5 bottom-2.5 rounded-md focus:ring-4 focus:outline-none focus:ring-blue-300">
        <BiSearch />
      </button>
    </div>
  );
};
