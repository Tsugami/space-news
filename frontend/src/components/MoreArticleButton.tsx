import clsx from "clsx";
import Loading from "react-loading";

interface MoreArticleButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

export const MoreArticleButton = ({
  onClick,
  isLoading,
}: MoreArticleButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={!!isLoading}
      className={clsx(
        "w-full max-w-[10rem] h-full max-h-10 flex flex-row justify-center items-center border-2 rounded border-purple-400 text-purple-600 p-2 my-6 font-semibold hover:bg-purple-100",
        { "opacity-90": isLoading },
      )}>
      {isLoading ? (
        <Loading type="bubbles" color="#C084FC" width={20} height={20} />
      ) : (
        "Carregar mais"
      )}
    </button>
  );
};
