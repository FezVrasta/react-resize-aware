//
// react-resize-aware component
//
// Triggers a `resize` event everytime the component changes its sizes
// MIT License
// Copyright 2016, Federico Zivolo
//

import React, {Component, Children, cloneElement} from 'react';

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

  handleRef = el => {
    this.container = el;
  }
  handleResizeRef = el => {
    this.resizeElement = el;
  };
  render() {
    const {
      children,
      onResize,
      onlyEvent,
      component: Component,
      ...props
    } = this.props;
    const {width, height} = this.state;

    if (typeof Component === 'string') {
      props.ref = this.handleRef;
    } else {
      props.getRef = this.handleRef;
      props.width = width;
      props.height = height;
    }
    return (
      <Component {...props}>
        <object
          ref={this.handleResizeRef}
          type="text/html"
          style={style}
          onLoad={this.handleObjectLoad}
          aria-hidden
          tabIndex={-1}
        />
        {Children.map(children, child =>
          cloneElement(child, !onlyEvent ? {width, height} : null)
        )}
      </Component>
    );
  }
}

export function makeResizeAware(component) {
  return props => <ResizeAware {...props} component={component} />;
}
