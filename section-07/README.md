# Section 7: Course Project - Components Deep Dive


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [71. Adding default props](#71-adding-default-props)
- [72. Communicating via custom events](#72-communicating-via-custom-events)
- [73. Creating an 'EditMeetup' Component](#73-creating-an-editmeetup-component)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 71. Adding default props

- if a prop isn't required to be passed into a component, and none is passed,
    Svelte will emit a warning
- it's a good practice to provide a default for optional props, even if that
    default is `null`, to indicate both to Svelte and consumers of components
    that a prop is optional

## 72. Communicating via custom events

```bash
$ npm run dev --prefix ./72-communicating-via-custom-props
```

- a component can dispatch custom events if its containing component is
    forwarding the event the custom event is triggered by

## 73. Creating an 'EditMeetup' Component

```bash
$ npm run dev --prefix ./73-creating-an-editmeetup-component
```

- instead of simply forwarding a form's `submit` event, we can dispatch custom
    events.
  - this may be useful in state machines where we may want to cancel a request
