# Section 7: Course Project - Components Deep Dive


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [71. Adding default props](#71-adding-default-props)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 71. Adding default props

- if a prop isn't required to be passed into a component, and none is passed,
    Svelte will emit a warning
- it's a good practice to provide a default for optional props, even if that
    default is `null`, to indicate both to Svelte and consumers of components
    that a prop is optional
