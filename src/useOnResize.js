// @flow
import * as React from 'react';

// This is just an utility to cleanly attach a `resize` event listener
// to a target HTMLObjectElement or HTMLIFrameElement
// The real Hook is `useResizeAware.js`
export default (ref: React.ElementRef<any>, onResize: () => void) => {
  React.useEffect(() => {
    // trigger onResize event on mount to provide initial sizes
    onResize();

    ref.current && (ref.current.onresize = onResize);
  }, []);
};
