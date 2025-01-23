import fs from "node:fs/promises";
import path from "node:path";
import html from "@radically-straightforward/html";
import css from "@radically-straightforward/css";
import javascript from "@radically-straightforward/javascript";
import * as caddy from "@radically-straightforward/caddy";

css`
  @import "@radically-straightforward/javascript/static/index.css";
`;

javascript`
  import * as javascript from "@radically-straightforward/javascript/static/index.mjs";
`;

await fs.writeFile(
  path.join(import.meta.dirname, "./static/index.html"),
  html`
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" href="/${caddy.staticFiles["index.css"]}" />
        <script src="/${caddy.staticFiles["index.mjs"]}"></script>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <title>Lê-strument</title>
      </head>
      <body
        css="${css`
          color: light-dark(var(--color--black), var(--color--white));
          background-color: light-dark(
            var(--color--white),
            var(--color--black)
          );
          padding: var(--space--2);
          position: fixed;
          inset: var(--space--0);
          overflow: hidden;
          display: flex;
          flex-direction: column-reverse;
          gap: var(--space--2);
        `}"
      >
        $${Array.from(
          { length: 16 },
          () => html`
            <div
              css="${css`
                width: fit-content;
                display: flex;
                gap: var(--space--2);
              `}"
            >
              $${Array.from(
                { length: 25 },
                () => html`
                  <button
                    type="button"
                    css="${css`
                      background-color: light-dark(
                        var(--color--slate--50),
                        var(--color--slate--950)
                      );
                      width: var(--space--16);
                      height: var(--space--16);
                      border: var(--border-width--1) solid
                        light-dark(
                          var(--color--slate--200),
                          var(--color--slate--800)
                        );
                      border-radius: var(--border-radius--1);
                      cursor: pointer;
                      user-select: none;
                      transition-property: var(--transition-property--colors);
                      transition-duration: var(--transition-duration--150);
                      transition-timing-function: var(
                        --transition-timing-function--ease-in-out
                      );
                      &:hover,
                      &:focus-within {
                        background-color: light-dark(
                          var(--color--slate--100),
                          var(--color--slate--800)
                        );
                      }
                      &:active {
                        background-color: light-dark(
                          var(--color--slate--200),
                          var(--color--slate--900)
                        );
                      }
                    `}"
                  ></button>
                `
              )}
            </div>
          `
        )}
      </body>
    </html>
  `
);
