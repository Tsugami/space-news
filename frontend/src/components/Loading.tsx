import ReactLoading from "react-loading";

export const Loading = () => {
  return (
    <div data-testid="app-loading" aria-live="assertive">
      {/**
       * eslint-disable-next-line @typescript-eslint/ban-ts-comment
       * @ts-ignore */}
      <ReactLoading type="bubbles" color="#D07014" />
    </div>
  );
};
