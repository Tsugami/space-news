import ReactSelect from "react-select";

export const ArticleSortSelect = () => {
  const options = [
    { value: "ASC", label: "Mais antigos" },
    { value: "DESC", label: "Mais novas" },
  ];

  return (
    <ReactSelect
      options={options}
      placeholder="Sort"
      className="w-full md:w-32"
    />
  );
};
