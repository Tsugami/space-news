import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  waitFor,
  screen,
  waitForElementToBeRemoved,
  fireEvent,
} from "@testing-library/react";
import { describe, it } from "vitest";
import App from "./App";
import { Providers } from "./tests/test-utils";
import { Article, ArticleListOutput } from "./hooks/useManyArticles";

const server = setupServer(
  rest.get("http://localhost:3001/articles", (_req, res, ctx) => {
    const data: ArticleListOutput = {
      results: [
        {
          id: 1,
          title: "Article Title",
        } as Article,
      ],
      metadata: { total: 1 },
    };
    return res(ctx.json(data));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Home Page", () => {
  it("loads and show articles", async () => {
    render(
      <Providers>
        <App />
      </Providers>,
    );

    await waitFor(() => screen.getByTestId("app-loading"));
    await waitForElementToBeRemoved(() => screen.getByTestId("app-loading"));
    await waitFor(() => screen.getByText("Article Title"));
  });

  it("load more button", async () => {
    render(
      <Providers>
        <App />
      </Providers>,
    );

    await waitFor(() => screen.getByTestId("app-loading"));
    await waitForElementToBeRemoved(() => screen.getByTestId("app-loading"));
    await waitFor(() => screen.getByText("Article Title"));

    server.use(
      rest.get("http://localhost:3001/articles", (_req, res, ctx) => {
        const data: ArticleListOutput = {
          results: [
            {
              id: 1,
              title: "Article 2",
            } as Article,
          ],
          metadata: { total: 2 },
        };
        return res(ctx.json(data));
      }),
    );

    fireEvent.click(screen.getByText("Carregar mais"));

    await waitFor(() => screen.getByText("Article 2"));
  });
});
