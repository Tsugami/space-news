import clsx from "clsx";

interface CardProps {
  index: number;
}

export const ArticleCard = ({ index }: CardProps) => {
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
