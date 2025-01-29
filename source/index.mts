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
  @import "bootstrap-icons/font/bootstrap-icons.css";
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
            alert(error);
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
            align-items: baseline;
            gap: var(--size--6);
          `}"
          javascript="${javascript`
            this.isModified = false;
            this.onchange = () => {
              window.history.pushState(null, "", "?" + new URLSearchParams(javascript.serialize(this)).toString());
            };
          `}"
        >
          <div
            css="${css`
              font-family: "Roboto Serif Variable", var(--font-family--serif);
              font-weight: 900;
              font-size: var(--font-size--4);
              line-height: var(--font-size--4--line-height);
            `}"
          >
            Lê-strument
          </div>
          <div
            css="${css`
              flex: 1;
            `}"
          >
            <div>
              <span
                css="${css`
                  color: light-dark(
                    var(--color--slate--600),
                    var(--color--slate--400)
                  );
                `}"
                >Octave</span
              > <button
                type="button"
                css="${css`
                  padding: var(--size--1) var(--size--2);
                `}"
                javascript="${javascript`
                  this.ontouchstart = () => {
                    const element = document.querySelector('[name="octave"]');
                    const value = Number(element.value) - 1;
                    if (value < -8) return;
                    element.value = (0 <= value ? "+" : "") + String(value);
                    element.dispatchEvent(new Event("change", {
                      bubbles: true,
                      cancelable: false,
                      composed: false,
                    }));
                  };
                `}"
              >
                <i class="bi bi-caret-left-fill"></i></button
              ><input
                type="text"
                name="octave"
                readonly
                css="${css`
                  font-family: "Roboto Mono Variable",
                    var(--font-family--monospace);
                  field-sizing: content;
                `}"
                javascript="${javascript`
                  const value = Number(new URL(window.location).searchParams.get("octave"));
                  this.value = Number.isNaN(value) ? "+0" : (0 <= value ? "+" : "") + String(value);
                `}"
              /><button
                type="button"
                css="${css`
                  padding: var(--size--1) var(--size--2);
                `}"
                javascript="${javascript`
                  this.ontouchstart = () => {
                    const element = document.querySelector('[name="octave"]');
                    const value = Number(element.value) + 1;
                    if (8 < value) return;
                    element.value = (0 <= value ? "+" : "") + String(value);
                    element.dispatchEvent(new Event("change", {
                      bubbles: true,
                      cancelable: false,
                      composed: false,
                    }));
                  };
                `}"
              >
                <i class="bi bi-caret-right-fill"></i>
              </button>
            </div>
          </div>
          <div>
            <button
              type="button"
              css="${css`
                html:fullscreen & {
                  display: none;
                }
              `}"
              javascript="${javascript`
                this.ontouchstart = () => {
                  document.querySelector("html").requestFullscreen();
                };
              `}"
            >
              <i class="bi bi-fullscreen"></i>
            </button>
            <button
              type="button"
              css="${css`
                html:not(:fullscreen) & {
                  display: none;
                }
              `}"
              javascript="${javascript`
                this.ontouchstart = () => {
                  document.exitFullscreen();
                };
              `}"
            >
              <i class="bi bi-fullscreen-exit"></i>
            </button>
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
          <div
            css="${css`
              aspect-ratio: 13 / 6;
              max-width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            `}"
          >
            <div
              css="${css`
                width: 100%;
                aspect-ratio: 13 / 6;
              `}"
            ></div>
          </div>
        </div>
      </body>
    </html>
  `,
);
