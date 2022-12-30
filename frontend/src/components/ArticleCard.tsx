import clsx from "clsx";
import { Article } from "../hooks/useManyArticles";

interface CardProps {
  index: number;
  article: Article;
}

export const ArticleCard = ({ index, article }: CardProps) => {
  const leftSide = index % 2 === 0;

  const date = new Date(article.publishedAt);
  const day = date.getDay().toString().padStart(2, "0");
  const month = date.getMonth().toString().padStart(2, "0");

  const formattedDate = `${day}/${month}/${date.getUTCFullYear()}`;

  return (
    <div
      className={clsx("w-full sm:flex  items-center", {
        "sm:flex-row-reverse": leftSide,
      })}>
      <img
        src={article.imageUrl}
        alt="image"
        className="w-full h-48 sm:h-52 sm:w-60"
      />
      <div
        className={clsx("max-w-xs", {
          "sm:mr-5": leftSide,
          "sm:ml-5": !leftSide,
        })}>
        <h3 className="text-xl font-bold">{article.title}</h3>
        <div className="flex justify-between pr-2">
          <span className="text-sm">{formattedDate}</span>
          <span className="border bg-slate-200 border-slate-400 px-1 text-sm">
            {article.newsSite}
          </span>
        </div>
        <p className="text-gray-600 font-medium text-sm flex-1">
          {article.summary}
        </p>
        <div className="mt-6">
          <a
            href={article.url}
            target="_blank"
            className=" bg-gray-500 text-gray-50 hover:bg-gray-400 p-3 md:p-2 rounded-md focus:outline-none border-2 focus:border-blue-500 focus:ring-blue-500"
            rel="noreferrer">
            Ver mais
          </a>
        </div>
      </div>
    </div>
  );
};
