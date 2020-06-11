const isThisObjectOrArray = something => {
  const strView = Object.prototype.toString.call(something)
  return ['[object Object]', '[object Array]'].includes(strView)
}

const proxyHandler = (instance) => ({
  get(obj, prop) {
    if (isThisObjectOrArray(obj[prop])) {
      return new Proxy(obj[prop], proxyHandler(instance))
    }
    return obj[prop]
  },

  set(obj, prop, value) {
    obj[prop] = value
    debouncedRender(instance)
    return true
  },

  deleteProperty(obj, prop) {
    delete obj[prop]
    debouncedRender(instance)
    return true
  }
})

function debouncedRender (instance) {
  if (instance.debounce) {
    window.cancelAnimationFrame(instance.debounce)
  }
  instance.debounce = window.requestAnimationFrame(() => instance.render())
}

class Vuact {
  constructor(options) {
    const __this = this
    __this.elem = document.querySelector(options.selector)
    let __data = new Proxy(options.data, proxyHandler(this))
    __this.template = options.template
    __this.debounce = null

    Object.defineProperty(this, 'data', {
      get () {
        return __data;
      },
      set (data) {
        __data = new Proxy(data, proxyHandler(__this))
        debouncedRender(__this)
        return true
      }
    })
  }

  render () {
    this.elem.innerHTML = this.template(this.data)
  }
}

const controlsApp = new Vuact({
  selector: '#controls',
  data: {
    heading: 'Элементы управления',
    buttons: [
      { action: 'add' },
      { action: 'remove' }
    ],
    inputs: [
      { id: 1, value: '' },
      { id: 2, value: '' },
      { id: 3, value: '' },
    ]
  },
  template (props) {
    return `
    <h5 class="controls__heading">${props.heading}</h5>
    <div class="controls__buttons">
      ${props.buttons.map(b =>
      `<button class="button button-action-${b.action}">${b.action}</button>`
    ).join('')}
    </div>
    <div class="controls__inputs">
      ${props.inputs.map(i => `<input data-input=${i.id}>`).join('')}
    </div>
  `
  }
})

controlsApp.data.inputs.push({ id: 5, value: ''})
