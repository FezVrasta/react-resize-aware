# react-resize-aware

A simple React.js component you can use to make any piece of UI aware of its size.

Each time the component changes its size (it can be due to a window resize, a CSS change, a JS action, etc...)
a `resize` event will be fired on the component itself.

You can then listen to such event to perform any kind of operation.

This component doesn't rely on intervals, loops or any other weird stuff.  
It takes advantage of the `resize` event of the `<object>` HTML element.

It requires just React.js and ReactDOM.

Install it with

```
npm install react-resize-aware --save
```

# License

MIT License
Copyright 2016, Federico Zivolo
