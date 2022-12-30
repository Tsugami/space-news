import ReactSelect from "react-select";

type Sort = "ASC" | "DESC";

const options = [
  { value: "ASC", label: "Mais antigos" },
  { value: "DESC", label: "Mais novas" },
] as const;

interface ArticleSortSelectProps {
  onChange(sort?: Sort): void;
  value?: Sort;
}

export const ArticleSortSelect = ({
  value,
  onChange,
}: ArticleSortSelectProps) => {
  return (
    <div data-testid="article-sort-select">
      <ReactSelect
        value={options.find((option) => option.value === value)}
        onChange={(option) => onChange(option?.value)}
        options={options}
        placeholder="Sort"
        className="w-full md:w-32"
        classNamePrefix="article-sort-select"
      />
    </div>
  );
};
