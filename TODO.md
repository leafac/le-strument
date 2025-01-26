# TODO

- Polyphony
  - Monophonic
    - Choose MIDI channel
- Velocity
  - Fixed (but configurable)

## Good to have

- Slides (X axis)
- Modulation (Y axis)
- Remember settings in query parameters
- Grid adjusts itself to screen size
- Choose MIDI input
- Adjust the tuning of the rows
  - Custom
  - Presets
    - Guitar
    - Fourths String Layout (https://www.rogerlinndesign.com/support/support-linnstrument-fourths-layout)
    - Violin
- Polyphony
  - MPE
- Sizes
  - Phone mode
- Arpeggiator
- String mode (each row acts as a string and notes to the right choke notes to the left) (https://www.rogerlinndesign.com/support/support-linnstrument-linnstruments-smart-midi)
- Velocity
  - Variable
    - https://www.researchgate.net/publication/254005475_PseudoButton_enabling_pressure-sensitive_interaction_by_repurposing_microphone_on_mobile_device
    - https://www.researchgate.net/publication/254005538_MicPen_pressure-sensitive_pen_interaction_using_microphone_with_standard_touchscreen
    - https://www.mdpi.com/2076-3417/11/11/4834
- Starter guide
- Logo
- Favicon
- History navigation overwriting Live Navigation (for speed, not need to reload the document from the server)

## Other

**Dots**

```
<div
  css="${css`
    display: flex;
  `}"
>
  $${Array.from(
    { length: 13 },
    (array, column) => html`
      <div
        css="${css`
          flex: 1;
          font-size: var(--size--1-5);
          text-align: center;
          color: light-dark(
            var(--color--slate--400),
            var(--color--slate--600)
          );
        `}"
      >
        $${column === 0 ||
        column === 5 ||
        column === 7 ||
        column === 10
          ? html`<i class="bi bi-circle-fill"></i>`
          : html``}
      </div>
    `,
  )}
</div>
```