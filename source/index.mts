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
        <div>HELLO</div>
        <div>WORLD</div>
      </body>
    </html>
  `
);
