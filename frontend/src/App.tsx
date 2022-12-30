import { useState } from "react";
import { IoIosRocket } from "react-icons/io";
import { ArticleCard } from "./components/ArticleCard";
import { Loading } from "./components/Loading";
import { MoreArticleButton } from "./components/MoreArticleButton";
import { SearchForm, SearchFormInput } from "./components/SearchForm";
import { useManyArticles } from "./hooks/useManyArticles";

function App() {
  const [filters, setFilters] = useState<Partial<SearchFormInput>>({
    sort: "ASC",
  });

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useManyArticles(filters);

  return (
    <div className="container mx-auto px-6 mt-4">
      <section className="mb-6 border-b pb-3 border-[#BEC7CE] md:border-b-2">
        <SearchForm onSubmit={(data) => setFilters(data)} />
        <div className="flex items-center flex-col">
          <div className="border flex justify-center items-center mt-6 rounded-full w-min p-6">
            <IoIosRocket size={70} color="#506273" />
          </div>
          <h2 className="mt-4 font-bold text-lg text-[#506273]">
            Space Flight News
          </h2>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center my-6">
        {isLoading && <Loading />}
        {data && (
          <div className="space-y-6 flex flex-col justify-center items-center">
            {data?.pages.map((page, idx) => (
              <div
                className="space-y-6 flex flex-col justify-center items-center"
                key={idx}>
                {page?.results.map((article, articleIdx) => (
                  <ArticleCard
                    index={articleIdx + idx}
                    key={article.id}
                    article={article}
                  />
                ))}
              </div>
            ))}
            <MoreArticleButton
              onClick={() => fetchNextPage()}
              isLoading={!hasNextPage || isFetchingNextPage}
            />
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
