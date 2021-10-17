type ViewportMap = {
  [index: string]: string
}

type Viewports = {
  [index: string]: boolean
}

declare function useViewport(viewportMap: ViewportMap): Viewports

export default useViewport
