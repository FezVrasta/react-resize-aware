// @flow
import * as React from "react";
import ResizeListener from "./ResizeListener";

type Reporter<T> = (target: ?HTMLIFrameElement) => T;

const defaultReporter = (target: ?HTMLIFrameElement) =>
  target != null
    ? {
        width: target.offsetWidth,
        height: target.offsetHeight,
      }
    : null;

declare export default function useResizeAware(): [
  React.Node,
  ?{ width: number, height: number }
];
declare export default function useResizeAware<T>(
  reporter: Reporter<T>
): [React.Node, T];

export default function useResizeAware(
  reporter?: Reporter<mixed> = defaultReporter
) {
  const [sizes, setSizes] = React.useState(reporter(null));
  const onResize = React.useCallback(
    (ref) => setSizes(reporter(ref.current)),
    [reporter]
  );
  const resizeListenerNode = React.useMemo(
    () => <ResizeListener onResize={onResize} />,
    [onResize]
  );

  return [resizeListenerNode, sizes];
}
