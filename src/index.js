//
// react-resize-aware component
//
// Triggers a `resize` event everytime the component changes its sizes
// MIT License
// Copyright 2016, Federico Zivolo
//

import React, { Component } from 'react'

export default class ResizeAware extends Component {
  constructor() {
    super()
    this.state = { resizeTarget: undefined }
  }
  
  render() {
    let rootStyle = this.props.style || {}
    if (rootStyle.position === 'initial') {
      rootStyle.position = 'relative'
    }
    let objectStyle = {
      display: 'block',
      position: 'absolute',
      top: '0px',
      left: '0px',
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: '-1'
    }

    return (
      <div ref='container' {...this.props} style={rootStyle}>
        {this.props.children}
        <object
          type='text/html'
          style={objectStyle}
          ref='resizeElement'
          onLoad={ (e) => { this.objectLoad(e) } } />
      </div>
    )
  }

  componentDidMount() {
    // init the resizeElement
    this.refs.resizeElement.data = 'about:blank'
  }

  componentWillUnmount() {
    this.state.resizeTarget && this.state.resizeTarget.removeEventListener('resize', this.props.onResize)
  }

  // called when the object is loaded
  objectLoad(evt) {
    this.setState({
      resizeTarget: evt.target.contentDocument.defaultView
    }, () => {
      // the onResize prop is triggered on every 'resize' event
      this.state.resizeTarget && this.state.resizeTarget.addEventListener('resize', this.props.onResize)
    })
  }

}

ResizeAware.propTypes = {
  onResize: React.PropTypes.func.isRequired
}
