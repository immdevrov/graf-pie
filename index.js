import drawDiagram from './js/draw.js'
import { controlsApp } from './js/controlsApp.js'

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const size = parseInt(canvas.clientWidth / 2);

const colors = ['OliveDrab', 'RoyalBlue', 'Crimson', 'Gold', 'Violet']

controlsApp.renderCallbackFunction = addListeners
controlsApp.render()
let controls = [{ id: 1, value: 0 }] // state

function handleButtonAction (action) {
  if (action === 'add') {
    const controlsArr = controlsApp.props.controls
    const maxId = controlsArr[controlsArr.length - 1].id
    controlsApp.props.controls.push({ id: maxId + 1 })
    controls.push({ id: maxId + 1, value: 0 })
  } else {
    controlsApp.props.controls.pop()
    controls.pop()
  }
}

function handleScroll (strId, value) {
  const [_, id] = strId.split('-').map(i => +i)
  controls = controls.map(c => (
    c.id === id ? { id, value: value / 2700 } : { ...c }
  ))
}

function addListeners () {
  document.addEventListener('click', (event) => {
    if (event.target.className.includes('button-action')) {
      handleButtonAction(event.target.dataset.action)
      return
    }

    if (event.target.className.includes('button-drow')) {
      const parts = controls.map(i => ({
        value: +i.value,
        color: colors[i.id - 1]
      }))
      drawDiagram(ctx, size, parts)
      return
    }
  })

  document.querySelectorAll('.progress')
    .forEach(c => c.addEventListener('scroll', (event) => {
      handleScroll(event.target.id, event.target.scrollLeft)
    }))
}
