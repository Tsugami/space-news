import ReactLoading from "react-loading";

export const Loading = () => {
  return (
    <div data-testid="app-loading" aria-live="assertive">
      <ReactLoading type="bubbles" color="#D07014" />
    </div>
  );
};
