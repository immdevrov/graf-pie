import Vuact from './vuact.js'

export const controlsApp = new Vuact({
  selector: '#controls',
  data: {
    heading: 'Элементы управления',
    buttons: [
      { action: 'add' },
      { action: 'remove' }
    ],
    inputs: [
      { id: 1, value: '2' },
      { id: 2, value: '3' },
      { id: 3, value: '6' },
    ]
  },
  template (props) {
    return `
    <h5 class="controls__heading">${props.heading}</h5>
    <div class="controls__buttons">
      ${props.buttons.map(b =>
      `<button
        class="button button-action"data-action="${b.action}">${b.action}</button>`
    ).join('')}
    </div>
    <div class="controls__inputs">
      ${props.inputs.map(i => `<input
        class="input-action"
        data-id=${i.id}
        value=${i.value}>`).join('')}
    </div>
    <button class="button button-drow">DROW</button>
  `
  }
})
