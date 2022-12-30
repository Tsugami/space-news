import { IoIosRocket } from "react-icons/io";
import { ArticleCard } from "./components/ArticleCard";
import { SearchForm } from "./components/SearchForm";

function App() {
  return (
    <div className="container mx-auto px-6 mt-4">
      <section className="mb-6 border-b pb-3 border-[#BEC7CE] md:border-b-2">
        <SearchForm onSubmit={(data) => console.log(data)} />
        <div className="flex items-center flex-col">
          <div className="border flex justify-center items-center mt-6 rounded-full w-min p-6">
            <IoIosRocket size={70} color="#506273" />
          </div>
          <h2 className="mt-4 font-bold text-lg text-[#506273]">
            Space Flight News
          </h2>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center">
        <div className="space-y-5 flex flex-col justify-center items-center">
          <ArticleCard index={0} />
          <ArticleCard index={1} />
          <ArticleCard index={2} />
        </div>
        <button className="border-2 rounded border-purple-400 text-purple-600 p-2 my-6 font-semibold hover:bg-purple-100">
          Carregar mais
        </button>
      </section>
    </div>
  );
}

export default App;
