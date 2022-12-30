import { render } from "@testing-library/react";
import { describe } from "vitest";
import { Loading } from "./Loading";

describe("Loading Component", () => {
  it("should render correctly", () => {
    render(<Loading />);
  });
});
