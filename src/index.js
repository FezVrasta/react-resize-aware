//
// react-resize-aware component
//
// Triggers a `resize` event everytime the component changes its sizes
// MIT License
// Copyright 2016, Federico Zivolo
//

import {createElement, Component, Children, cloneElement} from 'react';

const style = {
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
  static defaultProps = {component: 'div'};
  state = {};

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
    const {children, onResize, onlyEvent, component, ...props} = this.props;
    const {width, height} = this.state;

    const hasCustomComponent = typeof component !== 'string';

    return createElement(
      component,
      {
        [hasCustomComponent ? 'getRef' : 'ref']: el => (this.container = el),
        width: hasCustomComponent ? width : undefined,
        height: hasCustomComponent ? height : undefined,
        ...props,
      },
      createElement('object', {
        type: 'text/html',
        style,
        ref: el => (this.resizeElement = el),
        onLoad: this.handleObjectLoad,
        'aria-hidden': true,
        tabIndex: -1,
      }),
      Children.map(children, child =>
        cloneElement(child, !onlyEvent ? {width, height} : null)
      )
    );
  }
}

export function makeResizeAware(component) {
  return props => createElement(ResizeAware, {component, ...props});
}
