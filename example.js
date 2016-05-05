import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import ResizeAware from 'react-resize-aware'

export default class FooBar extends Component {
  render() {
    return (
      <ResizeWare ref='container'>
        Hello, World!
      </ResizeAware>
    )
  }

  componentDidMount() {
    findDOMNode(this.refs.container).addEventListener((evt) => {
      console.log('Component has been resized!')
    })
  }
}
