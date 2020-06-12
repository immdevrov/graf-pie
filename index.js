import drawDiagram from './js/draw.js'
import { controlsApp } from './js/controlsApp.js'

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const size = parseInt(canvas.clientWidth / 2);

const colors = ['OliveDrab', 'RoyalBlue', 'Crimson', 'Gold', 'Violet']

controlsApp.render()

function handleButtonAction (action) {
  if (action === 'add') {
    const inputsArr = controlsApp.data.inputs
    const maxId = inputsArr[inputsArr.length - 1].id
    controlsApp.data.inputs.push({ id: maxId + 1, value: '' })
  } else {
    controlsApp.data.inputs.pop()
  }
}

function handleInputValue (id, value) {
  controlsApp.data.inputs.forEach(item => {
    if (item.id === +id) {
      item.value = value
    }
  })
}

document.addEventListener('click', (event) => {
  if (event.target.className.includes('button-action')) {
    handleButtonAction(event.target.dataset.action)
    return
  }

  if (event.target.className.includes('button-drow')) {
    const parts = controlsApp.data.inputs.map(i => ({
      value: 1 / +(i.value),
      color: colors[i.id - 1]
    }))
    drawDiagram(ctx, size, parts)
    return
  }
})

document.addEventListener('input', (event) => {
  if (event.target.className.includes('input-action')) {
    handleInputValue(event.target.dataset.id, event.target.value)
    return
  }
})
