// @flow
import * as React from "react";
import useOnResize from "./useOnResize";

export type ReactRef<T> = { current: ?T };

const style = {
  display: "block",
  opacity: 0,
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
  overflow: "hidden",
  pointerEvents: "none",
  zIndex: -1,
  maxHeight: "inherit",
  maxWidth: "inherit",
};

// This automatically attaches to itself the resize event listener
// and adds onResize as callback
export default ({
  onResize,
}: {
  onResize: (ReactRef<HTMLIFrameElement>) => void,
}): React.Node => {
  const ref = React.useRef();
  useOnResize(ref, () => onResize(ref));

  return (
    <iframe
      style={style}
      src="about:blank"
      ref={ref}
      aria-hidden={true}
      tabIndex={-1}
      frameBorder={0}
    />
  );
};
