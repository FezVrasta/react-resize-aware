//
// react-resize-aware component
//
// Triggers a `resize` event everytime the component changes its sizes
// MIT License
// Copyright 2016, Federico Zivolo
//

import {createElement, Component, cloneElement} from 'react';

const objectStyle = {
  display: 'block',
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  overflow: 'hidden',
  pointerEvents: 'none',
  zIndex: -1,
};

export default class ResizeAware extends Component {
  state = {
    width: undefined,
    height: undefined,
  };

  // Init the resizeElement
  componentDidMount() {
    this.resizeElement.data = 'about:blank';
  }

  // Called when the object is loaded
  handleObjectLoad = evt => {
    this.setState(
      {
        resizeTarget: evt.target.contentDocument.defaultView,
      },
      () => {
        this.state.resizeTarget.addEventListener('resize', this.handleResize);
        this.handleResize();
      }
    );
  };

  componentWillUnmount() {
    this.state.resizeTarget &&
      this.state.resizeTarget.removeEventListener('resize', this.handleResize);
  }

  // Function called on component resize
  handleResize = () => {
    const sizes = {
      width: this.container.offsetWidth,
      height: this.container.offsetHeight,
    };
    this.setState(sizes);
    this.props.onResize && this.props.onResize(sizes);
  };

  render() {
    const {children, onResize, ...props} = this.props;
    const {width, height} = this.state;

    return createElement(
      'div',
      {
        ref: el => (this.container = el),
        ...props,
      },
      cloneElement(children, {
        width,
        height,
      }),
      createElement('object', {
        type: 'text/html',
        style: objectStyle,
        ref: el => (this.resizeElement = el),
        onLoad: this.handleObjectLoad,
      })
    );
  }
}
