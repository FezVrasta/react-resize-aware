// @flow
import * as React from 'react';

// This is just an utility to cleanly attach a `resize` event listener
// to a target HTMLObjectElement or HTMLIFrameElement
// The real Hook is `useResizeAware.js`
export default (ref: React.ElementRef<any>, onResize: () => void) => {
  const getTarget = () => ref.current && ref.current.contentDocument && ref.current.contentDocument.defaultView;
  function run() {
    // trigger onResize event on mount to provide initial sizes
    onResize();
    var target = getTarget();
    target && target.addEventListener('resize', onResize);
  }
  React.useEffect(() => {
    if (getTarget()) {
      run();
    }
    else if (ref.current && ref.current.addEventListener) {
      ref.current.addEventListener('load', run)
    }

    // clean event listener on unmount
    return () => {
      // Ensure the target exists and is in fact an event listener
      // this fixes an issue where contentDocument.defaultView is not a real window object
      // as can be the case when used with React portals
      const target = getTarget();
      const isListener =
        target && typeof target.removeEventListener === 'function';

      isListener && target.removeEventListener('resize', onResize);
    };
  }, []);
};
