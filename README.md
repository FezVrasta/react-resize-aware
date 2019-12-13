# react-resize-aware

It does one thing, it does it well: listens to resize events on any HTML element.

`react-resize-aware` is a zero dependency, **~600 bytes** [React Hook](https://reactjs.org/docs/hooks-reference.html) you can use to detect resize events without relying on intervals, loops, DOM manipulation detection or CSS redraws.

**It takes advantage of the `resize` event on the `HTMLObjectElement`, works on any browser I know of, and it's super lightweight.**

In addition, it doesn't directly alters the DOM, everything is handled by React.

> Looking for the 2.0 docs? [Click here](https://github.com/FezVrasta/react-resize-aware/tree/v2.7.2)

## Installation

```
yarn add react-resize-aware
```

or with npm:

```
npm install --save react-resize-aware
```

## Usage

The API is simple yet powerful, the `useResizeAware` [Hook](https://reactjs.org/docs/hooks-reference.html)
returns a React node you will place inside the measured element, and an object containing its sizes:

```jsx
import React from 'react';
import useResizeAware from 'react-resize-aware';

const App = () => {
  const [resizeListener, sizes] = useResizeAware();

  return (
    <div style={{ position: 'relative' }}>
      {resizeListener}
      Your content here. (div sizes are {sizes.width} x {sizes.height})
    </div>
  );
};
```

> **Heads up!**: Make sure to assign a `position != initial` to the HTMLElement you want to target (`relative`, `absolute`, or `fixed` will work).

## API

The Hook returns an array with two elements inside:

### `[resizeListener, ...]` (first element)

This is an invisible React node that must be placed as direct-child of the HTMLElement you want to listen the resize events of.

The node is not going to interfer with your layouts, I promise.

### `[..., sizes]` (second element)

This object contains the `width` and `height` properties, these properties are going to be `null` before the component rendered, and will return a `number` after the component rendered.

## Custom `reporter`

You can customize the properties of the `sizes` object by passing a custom `reporter` function as first argument of `useResizeAware`.

```jsx
const customReporter = target => ({
  clientWidth: target != null ? target.clientWidth : null,
});

const [resizeListener, sizes] = useResizeAware(customReporter);

return (
  <div style={{ position: 'relative' }}>
    {resizeListener}
    Your content here. (div clientWidth is {sizes.clientWidth})
  </div>
);
```

The above example will report the `clientWidth` rather than the default `offsetWidth` and `offsetHeight`.

## React to size variations

For completeness, below you can find an example to show how to make your code react to size variations using React Hooks:

```jsx
const App = () => {
  const [resizeListener, sizes] = useResizeAware();
  
  React.useEffect(() => {
    console.log('Do something with the new size values');
  }, [sizes.width, sizes.height]);

  return (
    <div style={{ position: 'relative' }}>
      {resizeListener}
      Your content here.
    </div>
  );
}
```
