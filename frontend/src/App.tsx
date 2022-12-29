import { BiSearch } from "react-icons/bi";
import { IoIosRocket } from "react-icons/io";
import ReactSelect from "react-select";
import clsx from "clsx";

const Select = () => {
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

interface SearchInputProps {
  className?: string;
}

const SearchInput = ({ className }: SearchInputProps) => {
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

interface CardProps {
  index: number;
}
//space-y-4 md:space-x-16 md:space-y-0
const Card = ({ index }: CardProps) => {
  const leftSide = index % 2 === 0;

  return (
    <div
      className={clsx("w-full max-w-2xl sm:flex  items-center", {
        "sm:flex-row-reverse": leftSide,
      })}
    >
      <img
        src="https://www.macau.rn.leg.br/images/galeria_em_artigos/image04_grd.png"
        alt="image"
        className="w-full h-48 sm:h-52 sm:w-60 "
      />
      <div
        className={clsx({
          "sm:mr-5": leftSide,
          "sm:ml-5": !leftSide,
        })}
      >
        <h3 className="text-xl font-bold">Tenete ergo quod si servitus</h3>
        <div className="flex justify-between pr-2">
          <span className="text-sm">dd/mm/yyyy</span>
          <button className="border bg-slate-200 border-slate-400 hover:bg-slate-300 px-1 text-sm">
            newSite
          </button>
        </div>
        <p className="text-gray-600 font-medium text-sm max-w-lg">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi
          consequuntur ducimus numquam accusamus doloribus a, exercitationem
          esse quis quia maxime excepturi ipsum maiores quos, ad assumenda
          debitis repellat quibusdam reiciendis.
        </p>
        <button className="bg-gray-500 text-gray-50 hover:bg-gray-400 hover: p-3 md:p-2 rounded-md mt-2 focus:outline-none focus:border focus:border-blue-500 focus:ring-blue-500">
          Ver mais
        </button>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="container mx-auto px-6 mt-4">
      <section className="mb-6 border-b pb-3 border-[#BEC7CE] md:border-b-2">
        <div className="md:flex flex-row justify-end md:space-x-2">
          <SearchInput className="mb-3" />
          <Select />
        </div>
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
          <Card index={0} />
          <Card index={1} />
          <Card index={2} />
        </div>
        <button className="border-2 rounded border-purple-400 text-purple-600 p-2 my-6 font-semibold hover:bg-purple-100">
          Carregar mais
        </button>
      </section>
    </div>
  );
}

export default App;
