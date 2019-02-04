// @flow
import * as React from 'react';
import useOnResize from './useOnResize';

const style = {
  display: 'block',
  opacity: 0,
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  overflow: 'hidden',
  pointerEvents: 'none',
  zIndex: -1,
};

// This automatically attaches to itself the resize event listener
// and adds onResize as callback
export default ({ onResize }) => {
  const ref = React.useRef();

  useOnResize(ref, () => (onResize ? onResize(ref) : void 0));

  return (
    <object
      type="text/html"
      style={style}
      ref={ref}
      aria-hidden={true}
      aria-label="resize-listener"
      tabIndex={-1}
    />
  );
};
