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
                    const element = this.closest('[type~="form"]').querySelector('[name="octave"]');
                    const value = Number(element.value) - 1;
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
                  this.value = new URL(window.location).searchParams.get("octave") ?? "+0";
                `}"
              /><button
                type="button"
                css="${css`
                  padding: var(--size--1) var(--size--2);
                `}"
                javascript="${javascript`
                  this.ontouchstart = () => {
                    const element = this.closest('[type~="form"]').querySelector('[name="octave"]');
                    const value = Number(element.value) + 1;
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
                this.onclick = () => {
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
                this.onclick = () => {
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
              flex: 1;
              display: flex;
              flex-direction: column;
            `}"
            javascript="${javascript`
              const tuning = [64, 59, 55, 50, 45, 40];
              const voices = new Map();
              this.ontouchstart = (event) => {
                if (!event.target.matches('[key~="button"]')) return;
                const note = Math.max(0, Math.min(127, tuning[event.target.row] + event.target.column + 12 * Number(document.querySelector('[name="octave"]').value)));
                document.querySelector("body").midi.send([0b10010000, note, 64]);
                voices.set(event.target, note);
                javascript.stateAdd(event.target, "active");
              };
              this.ontouchend = (event) => {
                if (!event.target.matches('[key~="button"]')) return;
                const note = voices.get(event.target);
                if (note === undefined) return;
                document.querySelector("body").midi.send([0b10000000, note, 64]);
                voices.delete(event.target);
                javascript.stateRemove(event.target, "active");
              };
            `}"
          >
            $${Array.from(
              { length: 6 },
              (array, row) => html`
                <div
                  css="${css`
                    display: flex;
                  `}"
                >
                  $${Array.from(
                    { length: 13 },
                    (array, column) => html`
                      <div
                        key="button"
                        css="${css`
                          flex: 1;
                          aspect-ratio: var(--aspect-ratio--square);
                          border-top: var(--border-width--1) solid
                            light-dark(
                              var(--color--slate--400),
                              var(--color--slate--600)
                            );
                          border-left: var(--border-width--1) solid
                            light-dark(
                              var(--color--slate--400),
                              var(--color--slate--600)
                            );
                          &:last-child {
                            border-right: var(--border-width--1) solid
                              light-dark(
                                var(--color--slate--400),
                                var(--color--slate--600)
                              );
                          }
                          :last-child > & {
                            border-bottom: var(--border-width--1) solid
                              light-dark(
                                var(--color--slate--400),
                                var(--color--slate--600)
                              );
                          }
                          :first-child > &:first-child {
                            border-top-left-radius: var(--border-radius--1);
                          }
                          :first-child > &:last-child {
                            border-top-right-radius: var(--border-radius--1);
                          }
                          :last-child > &:last-child {
                            border-bottom-right-radius: var(--border-radius--1);
                          }
                          :last-child > &:first-child {
                            border-bottom-left-radius: var(--border-radius--1);
                          }
                        `} ${column === 0 ||
                        column === 5 ||
                        column === 7 ||
                        column === 10
                          ? css`
                              background-color: light-dark(
                                var(--color--blue--50),
                                var(--color--blue--950)
                              );
                            `
                          : css`
                              background-color: light-dark(
                                var(--color--slate--100),
                                var(--color--slate--900)
                              );
                            `} ${css`
                          &[state~="active"] {
                            background-color: light-dark(
                              var(--color--green--500),
                              var(--color--green--500)
                            );
                          }
                        `}"
                        javascript="${javascript`
                          this.row = ${row};
                          this.column = ${column};
                        `}"
                      ></div>
                    `,
                  )}
                </div>
              `,
            )}
          </div>
        </div>
      </body>
    </html>
  `,
);
