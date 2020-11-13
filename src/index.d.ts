/// <reference types="react" />

declare module 'react-resize-aware' {
  const useResizeAware: <T extends object = { width: number | null; height: number | null }>(customReporter?: (target: HTMLIFrameElement | null) => T) => [JSX.Element, T]
  export default useResizeAware
}