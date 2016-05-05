//
// OnComponentResize component
//
// Triggers a `resize` event everytime the component changes its sizes
// React Component by Federico Zivolo
//

import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

// cross browser requestAnimationFrame
const requestFrame = (function(){
  let raf = (
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function(fn) { return window.setTimeout(fn, 20) }
  )
  return function(fn) {
    return raf(fn)
  }
})()

// cross browser cancelAnimationFrame
const cancelFrame = (function(){
  var cancel = (
    window.cancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.clearTimeout
  )
  return function(id) {
    return cancel(id)
  }
})()

function resizeListener(e) {
  let win = e.target || e.srcElement;
  if (win.__resizeRAF__) {
    cancelFrame(win.__resizeRAF__)
  }
  win.__resizeRAF__ = requestFrame(function() {
    let trigger = win.__resizeTrigger__
    trigger.__resizeListeners__.forEach(function(fn) {
      fn.call(trigger, e)
    })
  })
}

export default class OnComponentResize extends Component {
  render() {
    let rootStyle = this.props.style
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
      <div {...this.props} style={rootStyle}>
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
    this.state.resizeTarget.removeEventListener('resize', this.state.resizeFn)
  }

  // function called on component resize
  // a `resize` event will be triggered on the component
  onResize(evt) {
    var event = new Event('resize')
    console.log(findDOMNode(this))
    findDOMNode(this).dispatchEvent(event)
  }

  // called when the object is loaded
  objectLoad(evt) {
    this.setState({
      resizeTarget: evt.target.contentDocument.defaultView,
      resizeFn: this.onResize.bind(this)
    }, function() {
      this.state.resizeTarget.addEventListener('resize', this.state.resizeFn)
    })

  }

}
