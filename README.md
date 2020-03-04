# Sveltejs: The Complete Guide

Notes and annotations from https://www.udemy.com/course/sveltejs-the-complete-guide

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Section 2: Base Syntax & Core Features](#section-2-base-syntax--core-features)
  - [Takeaways](#takeaways)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Section 2: Base Syntax & Core Features

[README.md](./section-02/README.md)

### Takeaways

- by default, Svelte binds properties uni-directionally
- `bind:[attribute]={someVar}` is a shortcut for 2-way binding
- 2-way binding should be used with caution; think of the Angular 1 nightmares
- inspecting the compiled javascript is useful
- reactive statements do not react to changes in the body of the statment; only
    the values inside the configuration section of the statement are evaluated
    and invalidated when a variable's value changes
- one should favour using reactive assignments to reduce logic inside templates
