/// <reference types="react" />

declare module 'react-resize-aware' {
  const useResizeAware: () => [JSX.Element, { width: number; height: number } | null]
  export default useResizeAware
}