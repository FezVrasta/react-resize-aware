// @flow
import * as React from "react";

export type ReactRef<T> = { current: ?T };

// This is just an utility to cleanly attach a `resize` event listener
// to a target HTMLObjectElement or HTMLIFrameElement
// The real Hook is `useResizeAware.js`
export default (
  ref: ReactRef<HTMLIFrameElement>,
  onResize: () => void
): void => {
  const getTarget = () =>
    ref.current &&
    ref.current.contentDocument &&
    ref.current.contentDocument.defaultView;
  function run() {
    // trigger onResize event on mount to provide initial sizes
    onResize();
    var target = getTarget();
    target && target.addEventListener("resize", onResize);
  }
  React.useEffect(() => {
    if (getTarget()) {
      run();
    } else if (ref.current && "addEventListener" in ref.current) {
      ref.current.addEventListener("load", run);
    }

    // clean event listener on unmount
    return () => {
      // Ensure the target exists and is in fact an event listener
      // this fixes an issue where contentDocument.defaultView is not a real window object
      // as can be the case when used with React portals
      const target = getTarget();
      if (target == null) return;

      const isListener =
        target && typeof target.removeEventListener === "function";

      isListener && target.removeEventListener("resize", onResize);
    };
  }, []);
};
