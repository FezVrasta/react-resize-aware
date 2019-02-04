// @flow
import * as React from 'react';
import ResizeListener from './ResizeListener';

const defaultReporter = (target: ?HTMLElement) => ({
  width: target != null ? target.offsetWidth : null,
  height: target != null ? target.offsetHeight : null,
});

export default function useResizeAware(
  reporter: typeof defaultReporter = defaultReporter
) {
  const [sizes, setSizes] = React.useState({ width: null, height: null });
  const onResize = ref => setSizes(reporter(ref.current));

  const MemoResizeListener = React.useMemo(
    () => () => <ResizeListener onResize={onResize} />,
    [reporter]
  );

  return [MemoResizeListener, sizes];
}
