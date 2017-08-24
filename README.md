# react-resize-aware

A simple React.js component you can use to make any piece of UI aware of its size.

Each time the component' size changes, your component will be notified by one of
the methods described below.
The size change can be detected by a window resize, a CSS media query,
a CSS pseudo selector, a JavaScript action or really, anything.

**This component doesn't rely on intervals, loops, DOM manipulation detection
or any other weird stuff.  
It takes advantage of the `resize` event of the `<object>` HTML element.**

You don't have to care about anything, it will always work as you expect in any
possible scenario.  
Also, it's just 2.6KB (or 1.2KB gzipped)! (no dependencies!)

Install it with:

```
yarn add react-resize-aware
# or
npm install --save react-resize-aware
```

# Usage

> **note**: `ResizeAware` needs a position different from `initial` to work!  
> Make sure to set it to `relative`, `absolute` or `fixed` using its `style` property or with CSS

## Stateless approach

If your component is stateless or you prefer to follow a functional approach
you can use ResizeAware to wrap your existing component and it will take care
to provide two property (`height` and `width`) that will get updated every time
the component sizes change.

```jsx
import React from 'react';
import ResizeAware from 'react-resize-aware';

// This component will get re-rendered every time its width or height changes
function MyComponent({width, height}) {
  return <div>{width}x{height}</div>;
}

function App() {
  return (
    <ResizeAware style={{ position: 'relative' }}>
      <MyComponent />
    </ResizeAware>
  );
}
```

## Stateful approach

If your component is stateful or you need to use ResizeAware in the middle of one
of your components you can use the `onResize` property of the component to provide
a callback that will be called on each resize of the ResizeAware component and will
provide as first argument an object with `width` and `height` properties.

```jsx
import React, { Component } from 'react';
import ResizeAware from 'react-resize-aware';

function MyComponent({width, height}) {
  return <div>{width}x{height}</div>;
}

class MyComponent extend Component {
  handleResize = ({ width, height }) => console.log(width, height);
  
  render() {
    return (
      <div>
        My app renders...
        <ResizeAware
          style={{ position: 'relative' }}
          onlyEvent
          onResize={this.handleResize}
        >
          <MyComponent />
        </ResizeAware>
      </div>
    );
  }
}
```

## Self containing

If you need to keep your DOM structure clean and you don't want the additional
`div` added by ResizeAware, you can use the component as base for your own one.

```jsx
import React from 'react';
import ResizeAware from 'react-resize-aware';

// This component will get re-rendered every time its width or height changes
// It must expose a `getRef` property and must allow its `children` to be rendered
// as direct descendant
// The `getRef` property must be assigned to the `ref` property of the main element
function MyComponent({width, height, getRef, children}) {
  return (
    <div ref={getRef} style={{ position: 'relative' }}>
      <span>{width}x{height}</span>
      {children}
    </div>
  );
}

function App() {
  return (
    <ResizeAware component={MyComponent} />
  );
}
```

## Child function

Whenever you want to manipulate the `width` and `height` properties before they
get passed down to the child component, you can define a function as child of ResizeAware:

```jsx
import React from 'react';
import ResizeAware from 'react-resize-aware';

export default makeResizeAware(function MyComponent({width, height, getRef, children})) {
  return (
    <ResizeAware style={{ position: 'relative' }}>
      {({ width, height }) =>
        <div style={{ width: width / 2, height: height / 2 }} />}
    </ResizeAware>
  );
})
```

## Decorator/enhancer

In case you prefer to directly decorate your component to add to it the ResizeAware
functionalities, you can do as follow:

```jsx
import React from 'react';
import { makeResizeAware } from 'react-resize-aware';

export default makeResizeAware(function MyComponent({width, height, getRef, children})) {
  return (
    <div ref={getRef} style={{ position: 'relative' }}>
      <span>{width}x{height}</span>
      {children}
    </div>
  );
})
```

Or, with ES7 decorators:

```jsx
import React from 'react';
import { makeResizeAware } from 'react-resize-aware';

@makeResizeAware
export default class MyComponent extends React.Component {
  render() {
    const {width, height, getRef, children} = this.props;
    return (
      <div ref={getRef} style={{ position: 'relative' }}>
        <span>{width}x{height}</span>
        {children}
      </div>
    );
  }
}
```


## Properties

- The `onlyEvent` property will prevent ResizeAware from passing the `height` and `width`
properties to its child component, in case you don't want to rely on them.
- The `component` property allows to define the HTML tag used by ResizeAware to render, or any React component.
- The `onResize` property is an optional callback called on each resize with as first
  argument an object containing `height` and `width` properties.
- `widthPropName` and `heightPropName`, set them to change the name of the properties passed to the
  child component, in place of the default `width` and `height` names.

# License

MIT License
Copyright 2016+, Federico Zivolo
