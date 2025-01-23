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
          gap: var(--space--2);
        `}"
        javascript="${javascript`
          this.midi = [...(await navigator.requestMIDIAccess()).outputs.values()][0];
          this.ontouchstart = () => {
            // document.querySelector("html").requestFullscreen();
          };
        `}"
      >
        $${Array.from(
          { length: 6 },
          (value, row) => html`
            <div
              css="${css`
                width: fit-content;
                display: flex;
                gap: var(--space--2);
              `}"
            >
              $${Array.from(
                { length: 13 },
                (value, column) => html`
                  <button
                    type="button"
                    css="${css`
                      width: var(--space--24);
                      height: var(--space--24);
                      border: var(--border-width--1) solid;
                      border-radius: var(--border-radius--1);
                      cursor: pointer;
                      user-select: none;
                      transition-property: var(--transition-property--colors);
                      transition-duration: var(--transition-duration--75);
                      transition-timing-function: var(
                        --transition-timing-function--ease-in-out
                      );
                    `} ${column === 0 ||
                    column === 5 ||
                    column === 7 ||
                    column === 10
                      ? css`
                          background-color: light-dark(
                            var(--color--blue--100),
                            var(--color--blue--900)
                          );
                          border-color: light-dark(
                            var(--color--blue--200),
                            var(--color--blue--800)
                          );
                        `
                      : css`
                          background-color: light-dark(
                            var(--color--slate--100),
                            var(--color--slate--900)
                          );
                          border-color: light-dark(
                            var(--color--slate--200),
                            var(--color--slate--800)
                          );
                        `} ${css`
                      &.active {
                        background-color: light-dark(
                          var(--color--green--100),
                          var(--color--green--900)
                        );
                        border-color: light-dark(
                          var(--color--green--200),
                          var(--color--green--800)
                        );
                      }
                    `}"
                    javascript="${javascript`
                      const note = ${52 + column + 5 * row + (4 <= row ? -1 : 0)};
                      this.ontouchstart = () => {
                        this.classList.add("active");
                        this.closest("body").midi.send([0x90, note, 90]);
                      };
                      this.ontouchend = () => {
                        this.classList.remove("active");
                        this.closest("body").midi.send([0x80, note, 90]);
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
