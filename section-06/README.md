# Section 6: Diving deeper into components


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [57. Event forwarding](#57-event-forwarding)
- [58. Emitting custom events](#58-emitting-custom-events)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 57. Event forwarding

```bash
$ npm run dev --prefix ./57-event-forwarding
```

- events that are not provided a handler are forwarded; i.e. the component where
    the handler would be defined does not handle the event

    ```svelte
    <button on:click>forwarded click</button>
    ```
- by default, events do not get forwarded; events do no propagate across
    component boundaries unless explicitly defined to do so
- event delegation within a component works as expected


## 58. Emitting custom events

```bash
$ npm run dev --prefix ./58-emitting=custom-events
```

-
