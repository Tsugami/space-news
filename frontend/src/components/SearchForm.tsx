import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { ArticleSortSelect } from "./ArticleSortSelect";
import { SearchInput } from "./SearchInput";

const schema = z
  .object({
    search: z.string().min(1),
    sort: z.enum(["ASC", "DESC"]).optional().default("ASC"),
  })
  .required();

interface SearchFormInput {
  search: string;
  sort: "ASC" | "DESC";
}

interface SearchFormProps {
  onSubmit: (data: SearchFormInput) => unknown;
}

export const SearchForm = ({ onSubmit }: SearchFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, ...data },
    control,
  } = useForm<SearchFormInput>({
    resolver: zodResolver(schema),
  });

  return (
    <form
      className="md:flex flex-row justify-end md:space-x-2"
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <SearchInput
        isInvalid={!!errors.search?.message}
        {...register("search")}
        buttonProps={{
          type: "submit",
        }}
      />
      <Controller
        name="sort"
        control={control}
        render={({ field }) => (
          <ArticleSortSelect onChange={field.onChange} value={field.value} />
        )}
      />
    </form>
  );
};
