'use strict';

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

function MyComponent(_ref) {
  var width = _ref.width,
    height = _ref.height,
    getRef = _ref.getRef,
    children = _ref.children,
    props = _objectWithoutProperties(_ref, [
      'width',
      'height',
      'getRef',
      'children',
    ]);

  return React.createElement(
    'div',
    _extends({className: 'example', ref: getRef}, props),
    "Hover me! I don't rely on any DOM manipulation, transition event or anything, I use a real resize event!",
    React.createElement('br', null),
    width,
    'x',
    height,
    children
  );
}

function App() {
  return React.createElement(ReactResizeAware, {
    component: MyComponent,
    useBoundingClientRect: true,
    style: {position: 'relative'},
    onResize: function onResize(sizes) {
      return console.log(sizes);
    },
  });
}

ReactDOM.render(
  React.createElement(App, null),
  document.querySelector('#root')
);
