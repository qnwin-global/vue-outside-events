import type { ObjectDirective } from 'vue'

type EventsType =
  | 'blur'
  | 'change'
  | 'click'
  | 'dblclick'
  | 'focus'
  | 'focusin'
  | 'focusout'
  | 'keydown'
  | 'keypress'
  | 'keyup'
  | 'mousedown'
  | 'mousemove'
  | 'mouseout'
  | 'mouseover'
  | 'mouseup'
  | 'select'
  | 'submit'

type Options = Record<string, unknown> | undefined
type HandlerFn = ((event: Event, element?: HTMLElement, options?: Options) => void) | null
type BindingValue = {
  name: string
  handler: HandlerFn
}
interface OutsideElement extends HTMLElement {
  __vueEventOutside__blur?: HandlerFn
  __vueEventOutside__change?: HandlerFn
  __vueEventOutside__click?: HandlerFn
  __vueEventOutside__dblclick?: HandlerFn
  __vueEventOutside__focus?: HandlerFn
  __vueEventOutside__focusin?: HandlerFn
  __vueEventOutside__focusout?: HandlerFn
  __vueEventOutside__keydown?: HandlerFn
  __vueEventOutside__keypress?: HandlerFn
  __vueEventOutside__keyup?: HandlerFn
  __vueEventOutside__mousemove?: HandlerFn
  __vueEventOutside__mousedown?: HandlerFn
  __vueEventOutside__mouseup?: HandlerFn
  __vueEventOutside__mouseover?: HandlerFn
  __vueEventOutside__mouseout?: HandlerFn
  __vueEventOutside__select?: HandlerFn
  __vueEventOutside__submit?: HandlerFn
}
interface CustomDirective<T, V> extends ObjectDirective<T, V> {
  directiveName: string
  eventName?: EventsType
}

const createOutsideEvent = (eventName: EventsType): CustomDirective<OutsideElement, HandlerFn | BindingValue> => ({
  directiveName: `${eventName}-outside`,
  eventName,
  beforeMount: (el, binding) => {
    const err = console.error !== undefined ? console.error : console.log
    let fn: HandlerFn = null
    let options: Options = undefined
    if (typeof binding.value !== 'function') {
      if (
        typeof binding.value !== 'object' ||
        !Object.prototype.hasOwnProperty.call(binding.value, 'handler') ||
        typeof binding.value?.handler !== 'function'
      ) {
        let error = `[${eventName}-outside]: provided expression '${binding.value}' must be a function or an object containing a property named 'handler' that is a function.`
        if (binding.instance?.$.type?.name) {
          error += `\nFound in component '${binding.instance?.$.type?.name}'`
        }
        err(error)
      } else {
        fn = binding.value.handler
        // clone the object passed in and remove the handler from it
        options = Object.assign({}, binding.value)
        delete options?.handler
      }
    } else {
      fn = binding.value
    }

    const handler = (e: Event) => {
      if (fn && !el.contains(e.target as Node) && el !== e.target) {
        // call the handler with the event, the element we are bound to, and the options object
        fn(e, el, options)
      }
    }

    el[`__vueEventOutside__${eventName}`] = handler
    document.addEventListener(eventName, handler)
  },
  unmounted: (el) => {
    const eventHandler = el[`__vueEventOutside__${eventName}`]
    if (eventHandler) {
      document.removeEventListener(eventName, eventHandler)
      el[`__vueEventOutside__${eventName}`] = null
    }
  }
})

export const customEventOutside: CustomDirective<HTMLElement, BindingValue> = {
  directiveName: 'event-outside',
  beforeMount: (el, binding) => {
    const err = console.error !== undefined ? console.error : console.log
    let options: Options = undefined
    if (
      // object is required
      typeof binding.value !== 'object' ||
      // object.name string required
      binding.value?.name === undefined ||
      typeof binding.value.name !== 'string' ||
      // object.handler function required
      binding.value.handler === undefined ||
      typeof binding.value.handler !== 'function'
    ) {
      let error = `[v-event-outside]: provided expression '${binding.value}' must be an object containing a "name" string and a "handler" function.`
      if (binding.instance?.$.type?.name) {
        error += `\nFound in component '${binding.instance?.$.type?.name}'`
      }
      err(error)
      return
    } else {
      options = Object.assign({}, binding.value)
      delete options?.name
      delete options?.handler
    }

    const handler = (e: Event) => {
      if (!el.contains(e.target as Node) && el !== e.target && binding.value.handler) {
        binding.value.handler(e, el, options)
      }
    }
    // @ts-expect-error custom event name
    el[`__vueEventOutside__${binding.value.name}`] = handler
    document.addEventListener(binding.value.name, handler)
  },
  unmounted: (el, binding) => {
    // @ts-expect-error custom event name
    const eventHandler = el[`__vueEventOutside__${binding.value.name}`]
    if (eventHandler) {
      document.removeEventListener(binding.value.name, eventHandler)
      // @ts-expect-error custom event name
      el[`__vueEventOutside__${binding.value.name}`] = null
    }
  }
}

export const blur = createOutsideEvent('blur')
export const change = createOutsideEvent('change')
export const click = createOutsideEvent('click')
export const dblclick = createOutsideEvent('dblclick')
export const focus = createOutsideEvent('focus')
export const focusin = createOutsideEvent('focusin')
export const focusout = createOutsideEvent('focusout')
export const keydown = createOutsideEvent('keydown')
export const keypress = createOutsideEvent('keypress')
export const keyup = createOutsideEvent('keyup')
export const mousedown = createOutsideEvent('mousedown')
export const mousemove = createOutsideEvent('mousemove')
export const mouseout = createOutsideEvent('mouseout')
export const mouseover = createOutsideEvent('mouseover')
export const mouseup = createOutsideEvent('mouseup')
export const select = createOutsideEvent('select')
export const submit = createOutsideEvent('submit')
