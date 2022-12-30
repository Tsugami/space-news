import { it, vi, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchForm } from "./SearchForm";
import userEvent from "@testing-library/user-event";

describe("SearchForm", () => {
  it("should call onSubmit when press the button", async () => {
    const onSubmit = vi.fn();

    render(<SearchForm onSubmit={onSubmit} />);

    const searchInput = screen.getByPlaceholderText("Search");
    await fireEvent.change(searchInput, {
      target: { value: "my-space!" },
    });

    await userEvent.click(screen.getByRole("button"));

    expect(searchInput).toHaveValue("my-space!");
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({ search: "my-space!", sort: "ASC" });
  });

  it("should throws error when empty search is provided", async () => {
    const onSubmit = vi.fn();

    render(<SearchForm onSubmit={onSubmit} />);
    await userEvent.click(screen.getByRole("button"));

    expect(onSubmit).toBeCalledTimes(0);

    const searchInput = screen.getByPlaceholderText("Search");
    expect(searchInput).toHaveAttribute("aria-invalid", "true");
  });
});
