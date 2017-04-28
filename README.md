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
> Make sure to set it to `relative`, `absolute` or `fixed` using its `style` property or with CSS

```jsx
import React from 'react';
import ResizeAware from 'react-resize-aware';

// This component will get rerendered everytime its width or height changes
function MyComponent({width, height}) {
  return <div>{width}x{height}</div>;
}

function App() {
  return (
    <ResizeAware onResize={({width, height}) => console.log(width, height)}>
      <MyComponent />
    </ResizeAware>
  );
}

```

The child component of `ResizeAware` will have two new properties (`width` and `height`)
always up to date with the real size of the element.

Also, you can define an optional `onResize` property to make `ResizeAware` call
it on each resize and get the updated sizes.


# License

MIT License
Copyright 2016+, Federico Zivolo
