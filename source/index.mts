import fs from "node:fs/promises";
import path from "node:path";
import html from "@radically-straightforward/html";
import css from "@radically-straightforward/css";
import javascript from "@radically-straightforward/javascript";
import * as caddy from "@radically-straightforward/caddy";

css`
  @import "@radically-straightforward/javascript/static/index.css";
  @import "@fontsource-variable/roboto-flex/slnt.css";
  @import "@fontsource-variable/roboto-serif/wght.css";
  @import "@fontsource-variable/roboto-serif/wght-italic.css";
  @import "@fontsource-variable/roboto-mono/wght.css";
  @import "@fontsource-variable/roboto-mono/wght-italic.css";
`;

javascript`
  import * as javascript from "@radically-straightforward/javascript/static/index.mjs";
`;

await fs.writeFile(
  path.join(import.meta.dirname, "./static/index.html"),
  html`
    <!doctype html>
    <html
      css="${css`
        color-scheme: light dark;
      `}"
    >
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
          font-family: "Roboto Flex Variable", var(--font-family--sans-serif);
          font-size: var(--font-size--3-5);
          line-height: var(--font-size--3-5--line-height);
          color: light-dark(var(--color--black), var(--color--white));
          background-color: light-dark(
            var(--color--white),
            var(--color--black)
          );
          position: fixed;
          inset: var(--size--0);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        `}"
        javascript="${javascript`
          try {
            this.midi = [...(await navigator.requestMIDIAccess()).outputs.values()][0];
          } catch (error) {
            alert (error);
          }
        `}"
      >
        <div
          type="form"
          css="${css`
            padding: var(--size--2) var(--size--4);
            border-bottom: var(--border-width--1) solid
              light-dark(var(--color--slate--200), var(--color--slate--800));
            display: flex;
            align-items: center;
            gap: var(--size--4);
          `}"
        >
          <div
            href="/"
            css="${css`
              font-family: "Roboto Serif Variable", var(--font-family--serif);
              font-weight: 900;
              font-size: var(--font-size--4);
              line-height: var(--font-size--4--line-height);
            `}"
          >
            Lê-strument
          </div>
        </div>
        <div
          css="${css`
            flex: 1;
            padding: var(--size--2) var(--size--4);
            display: flex;
            justify-content: center;
            align-items: center;
          `}"
        >
          <table
            css="${css`
              border-collapse: collapse;
            `}"
          >
            <tbody>
              $${Array.from(
                { length: 6 },
                (array, row) => html`
                  <tr>
                    $${Array.from(
                      { length: 13 },
                      (array, column) => html`
                        <td
                          css="${css`
                            width: var(--size--24);
                            height: var(--size--24);
                            background-color: light-dark(
                              var(--color--slate--100),
                              var(--color--slate--900)
                            );
                            border: var(--border-width--1) solid
                              light-dark(
                                var(--color--slate--400),
                                var(--color--slate--600)
                              );
                          `}"
                        ></td>
                      `,
                    )}
                  </tr>
                `,
              )}
            </tbody>
          </table>
        </div>
      </body>
    </html>
  `,
);
