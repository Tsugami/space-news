import { render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";
import { MoreArticleButton } from "./MoreArticleButton";
import userEvent from "@testing-library/user-event";

describe("MoreArticleButton Component", () => {
  it("should render correctly", () => {
    const func = vi.fn();

    render(<MoreArticleButton onClick={func} />);

    expect(screen.getByRole("button")).toHaveTextContent("Carregar mais");
    expect(func).toBeCalledTimes(0);
  });

  it("should call onClick when click", async () => {
    const func = vi.fn();

    render(<MoreArticleButton onClick={func} />);

    await userEvent.click(screen.getByRole("button"));

    expect(func).toBeCalledTimes(1);
  });

  it("not should call onClick when button is loading", async () => {
    const func = vi.fn();

    render(<MoreArticleButton onClick={func} isLoading />);

    await userEvent.click(screen.getByRole("button"));

    expect(func).toBeCalledTimes(0);
  });

  it("should show loading when isLoading is true", async () => {
    const func = vi.fn();

    render(<MoreArticleButton onClick={func} isLoading />);

    expect(screen.getByRole("button")).not.toHaveTextContent("Carregar mais");
    expect(func).toBeCalledTimes(0);
  });
});
