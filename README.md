# react-resize-aware

A simple React.js component you can use to make any piece of UI aware of its size.

Each time the component changes its size (it can be due to a window resize, a CSS change, a JS action, etc...)
a `resize` event will be fired on the component itself.

You can then listen to such event to perform any kind of operation.

This component doesn't rely on intervals, loops or any other weird stuff.  
It takes advantage of the `resize` event of the `<object>` HTML element.

It requires just React.js and ReactDOM.

Install it with:

```
npm install react-resize-aware --save
```

# Usage

> **note**: `ResizeAware` needs a position different from `initial` to work!
> Make sure to set it to `relative`, `absolute` or `fixed` trough `style` or CSS

```jsx
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import ResizeAware from 'react-resize-aware'

export default class FooBar extends Component {
  render() {
    return (
      <ResizeWare ref='container' style={{position: 'relative'}}>
        Hello, World!
      </ResizeAware>
    )
  }

  componentDidMount() {
    findDOMNode(this.refs.container).addEventListener((evt) => {
      console.log('Component has been resized!')
    })
  }
}
```


# License

MIT License
Copyright 2016, Federico Zivolo
