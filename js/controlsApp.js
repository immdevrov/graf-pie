import Vuact from './vuact.js'

export const controlsApp = new Vuact({
  selector: '#controls',
  props: {
    heading: 'Элементы управления',
    buttons: [
      { action: 'add' },
      { action: 'remove' }
    ],
    controls: [
      { id: 1 }
    ]
  },
  template (props) {
    return `
    <h5 class="controls__heading">${props.heading}</h5>
    <div class="controls__buttons">
      ${props.buttons.map(b =>
      `<button
        class="button button-action" data-action="${b.action}">${b.action}</button>`
    ).join('')}
    </div>
    <div class="controls__items">
      ${props.controls.map(c => `
        <div class="progress" id="progress-${c.id}">
          <div class="progress__content"></div>
        </div>
        <div class="progress__percent"></div>
      `).join('')}
    </div>
    <button class="button button-drow">DROW</button>
  `
  }
})
