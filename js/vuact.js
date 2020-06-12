export default class Vuact {
  constructor(options) {
    const __this = this
    __this.elem = document.querySelector(options.selector)
    let __data = new Proxy(options.data, proxyHandler(this))
    __this.template = options.template
    __this.methods = options.methods
    __this.debounce = null

    Object.defineProperty(this, 'data', {
      get() {
        return __data;
      },
      set(data) {
        __data = new Proxy(data, proxyHandler(__this))
        debouncedRender(__this)
        return true
      }
    })
  }

  render() {
    console.log('%crendering...', 'color: slateblue; font-style: italic')
    this.elem.innerHTML = this.template(this.data)
  }
}

function proxyHandler (instance) {
  return {
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
  }
}

function debouncedRender(instance) {
  if (instance.debounce) {
    window.cancelAnimationFrame(instance.debounce)
  }
  instance.debounce = window.requestAnimationFrame(() => instance.render())
}

function isThisObjectOrArray(something) {
  const strView = Object.prototype.toString.call(something)
  return ['[object Object]', '[object Array]'].includes(strView)
}
