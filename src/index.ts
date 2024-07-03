import type { Plugin } from 'vue'
import {
  blur,
  change,
  click,
  customEventOutside,
  dblclick,
  focus,
  focusin,
  focusout,
  keydown,
  keypress,
  keyup,
  mousedown,
  mousemove,
  mouseout,
  mouseover,
  mouseup,
  select,
  submit
} from './vue-outside-events'

const plugin: Plugin = {
  install(app) {
    app.directive(blur.directiveName, blur)
    app.directive(change.directiveName, change)
    app.directive(click.directiveName, click)
    app.directive(dblclick.directiveName, dblclick)
    app.directive(focus.directiveName, focus)
    app.directive(focusin.directiveName, focusin)
    app.directive(focusout.directiveName, focusout)
    app.directive(keydown.directiveName, keydown)
    app.directive(keypress.directiveName, keypress)
    app.directive(keyup.directiveName, keyup)
    app.directive(mousedown.directiveName, mousedown)
    app.directive(mousemove.directiveName, mousemove)
    app.directive(mouseout.directiveName, mouseout)
    app.directive(mouseover.directiveName, mouseover)
    app.directive(mouseup.directiveName, mouseup)
    app.directive(select.directiveName, select)
    app.directive(submit.directiveName, submit)
    app.directive(customEventOutside.directiveName, customEventOutside)
  }
}

export default plugin
