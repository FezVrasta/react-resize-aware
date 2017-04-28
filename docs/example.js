function MyComponent({width, height}) {
  return React.createElement(
    'div',
    {className: 'example'},
    "Hover me! I don't rely on any DOM manipulation, transition event or anything, I use a real resize event!",
    React.createElement('br', null),
    `${width}x${height}`
  );
}

function App() {
  return React.createElement(
    ReactResizeAware,
    {
      style: {position: 'relative'},
      onResize(sizes) {
        console.log(sizes);
      },
    },
    React.createElement(MyComponent, null)
  );
}

ReactDOM.render(
  React.createElement(App, null),
  document.querySelector('#root')
);
