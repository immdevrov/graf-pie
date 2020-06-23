import drawDiagram from './js/draw.js'
import { controlsApp } from './js/controlsApp.js'

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const size = parseInt(canvas.clientWidth / 2);

const colors = ['OliveDrab', 'RoyalBlue', 'Crimson', 'Gold', 'Violet', 'RoyalBlue', 'Crimson', 'Gold', 'Violet']
const maxScroll = 2700
let controlsAppState = [{ id: 1, value: 0 }]

controlsApp.renderCallbackFunction = addListeners
controlsApp.render()
resetScroll()

function addListeners() {
  document.removeEventListener('click', handleUsefulClicks);
  document.addEventListener('click', handleUsefulClicks)

  document.querySelectorAll('.progress')
    .forEach(c => {
      c.removeEventListener('scroll', handleScroll)
      c.addEventListener('scroll', handleScroll)
    })
}

function resetScroll () {
  document.querySelectorAll('.progress').forEach(c => {
    c.scrollLeft = 0
  })
}


function handleUsefulClicks (event) {
  if (event.target.className.includes('button-action')) {
    handleButtonAction(event.target.dataset.action)
    return
  }

  if (event.target.className.includes('button-drow')) {
    const parts = controlsAppState.map(i => ({
      value: +i.value,
      color: colors[i.id - 1]
    }))
    drawDiagram(ctx, size, parts)
    return
  }
}

function handleButtonAction(action) {
  if (action === 'add') {
    const maxId = controlsAppState[controlsAppState.length - 1].id
    controlsApp.props.controls.push({ id: maxId + 1 })
    controlsAppState.push({ id: maxId + 1, value: 0 })
  } else {
    controlsApp.props.controls.pop()
    controlsAppState.pop()
  }
  resetScroll()
}

function handleScroll(event) {
  const { id: strId, scrollLeft: value } = event.target
  const [_, id] = strId.split('-').map(i => +i)
  controlsAppState = controlsAppState.map(c => {
    return c.id === id ? { id, value: value / maxScroll } : { ...c }
  })
  if (currentStatePercentSumm() > 100) {
    const redundantPercent = (currentStatePercentSumm() - 100) / (controlsAppState.length - 1)
    controlsAppState = controlsAppState.map(c => {
      return c.id !== id
        ? { id: c.id, value: c.value - redundantPercent / 100 }
        : { ...c }
    })
    correctScrollValues()
  }
  if (currentStatePercentSumm() < 100) {
    const missingPercent = (100 - currentStatePercentSumm()) / (controlsAppState.length - 1)
    controlsAppState = controlsAppState.map(c => {
      return c.id !== id
        ? { id: c.id, value: c.value + missingPercent / 100 }
        : { ...c }
    })
    correctScrollValues()
  }
}

function currentStatePercentSumm() {
  return parseInt(controlsAppState.reduce((prev, curr) => prev + curr.value * 100, 0))
}


function correctScrollValues() {
  document.querySelectorAll('.progress').forEach(c => {
    const [, controlId] = c.id.split('-').map(i => +i)
    const { value: rightValue } = controlsAppState.find(({ id }) => id === +controlId)
    c.scrollLeft = rightValue * maxScroll
  })
}
