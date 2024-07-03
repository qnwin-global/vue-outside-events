# vue-outside-events

Vue 3.x directive to react on events outside element without stopping the event's propagation.

Works well for handling clicks outside of menus and popups. Can handle any DOM event or CustomEvent. Also, able to capture jQuery events.

## Install
```js
npm install --save vue3-outside-events
```

## Use

### Modular
```js
import { createApp } from 'vue'
import vOutsideEvents from 'vue-outside-events'

const app = createApp({})
app.use(vOutsideEvents)
app.mount('#app')
```

```html
<script>
  export default {
    methods: {
      onClickOutside (event, element) {
        console.log('onClickOutside');
        console.log('click heard outside element:', element);
        console.log('element clicked:', event.target);
        console.log('event:', event);
      },
      onMouseOutside (event, element) {
        console.log('onMouseOutside');
        console.log('mouse moved outside element:', element);
        console.log('element mouse moved over:', event.target);
        console.log('event:', event);
      },
      onFoo (event, element, options) {
        console.log('onFoo');
        console.log('fooEvent happened outside element:', element);
        console.log('element that triggered foo:', event.target);
        console.log('event:', event);
        console.log('extras:', options);
        console.log('bar:', options.bar);
      }
    }
  };
</script>

<template>
  <div v-click-outside="onClickOutside"></div>
  <div v-mousemove-outside="onMouseOutside"></div>
  <div v-event-outside="{ name: 'fooEvent', handler: onFoo, bar: 'baz' }"></div>
</template>
```

## Events
| Event              | Event Name  | Directive           | Binding                                        |
| ------------------ |-------------|---------------------| ---------------------------------------------- |
| Click              | click       | v-click-outside     | ="handlerName"                                 |
| Double-Click       | dblclick    | v-dblclick-outside  | ="handlerName"                                 |
| Focus              | focus       | v-focus-outside     | ="handlerName"                                 |
| Focus              | focusin     | v-focusin-outside   | ="handlerName"                                 |
| Focus              | focusout    | v-focusout-outside  | ="handlerName"                                 |
| Blur               | blur        | v-blur-outside      | ="handlerName"                                 |
| Mouse Over / Enter | mouseover   | v-mouseover-outside | ="handlerName"                                 |
| Mouse Move         | mousemove   | v-mousemove-outside | ="handlerName"                                 |
| Mouse Up           | mouseup     | v-mouseup-outside   | ="handlerName"                                 |
| Mouse Down         | mousedown   | v-mousedown-outside | ="handlerName"                                 |
| Mouse Out          | mouseout    | v-mouseout-outside  | ="handlerName"                                 |
| Key Down           | keydown     | v-keydown-outside   | ="handlerName"                                 |
| Key Up             | keyup       | v-keyup-outside     | ="handlerName"                                 |
| Key Press          | keypress    | v-keypress-outside  | ="handlerName"                                 |
| Change             | change      | v-change-outside    | ="handlerName"                                 |
| Select             | select      | v-select-outside    | ="handlerName"                                 |
| Submit             | submit      | v-submit-outside    | ="handlerName"                                 |
| Custom             | "eventName" | v-event-outside     | ="{ name: 'eventName', handler: handlerName }" |

## Options
Add additional key/value pairs to the custom event to pass data to the event handler.

```html
<div v-event-outside="{ name: 'fooEvent', handler: onFoo, bar: 'baz' }"></div>
```

```js
onFoo (event, element, options) {
  console.log('onFoo');
  console.log('fooEvent happened outside element:', element);
  console.log('element that triggered foo:', event.target);
  console.log('event:', event);
  console.log('extras:', options);
  console.log('bar:', options.bar);
}
```

## License
[MIT License](https://github.com/nchutchind/vue-outside-events/blob/master/LICENSE)
