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
          padding: var(--space--4);
          position: fixed;
          inset: var(--space--0);
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column-reverse;
          gap: var(--space--4);
        `}"
        javascript="${javascript`
          this.ontouchstart = () => {
            document.querySelector("html").requestFullscreen();
          };
        `}"
      >
        $${Array.from(
          { length: 8 },
          () => html`
            <div
              css="${css`
                width: fit-content;
                display: flex;
                gap: var(--space--4);
              `}"
            >
              $${Array.from(
                { length: 13 },
                () => html`
                  <button
                    type="button"
                    css="${css`
                      background-color: light-dark(
                        var(--color--slate--100),
                        var(--color--slate--900)
                      );
                      width: var(--space--20);
                      height: var(--space--20);
                      border: var(--border-width--1) solid
                        light-dark(
                          var(--color--slate--200),
                          var(--color--slate--800)
                        );
                      border-radius: var(--border-radius--1);
                      cursor: pointer;
                      user-select: none;
                      transition-property: var(--transition-property--colors);
                      transition-duration: var(--transition-duration--75);
                      transition-timing-function: var(
                        --transition-timing-function--ease-in-out
                      );
                      &.active {
                        background-color: light-dark(
                          var(--color--blue--100),
                          var(--color--blue--900)
                        );
                        border-color: light-dark(
                          var(--color--blue--200),
                          var(--color--blue--800)
                        );
                      }
                    `}"
                    javascript="${javascript`
                      this.ontouchstart = () => {
                        this.classList.add("active");
                      };
                      this.ontouchend = () => {
                        this.classList.remove("active");
                      };
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
