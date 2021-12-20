import { useState, useLayoutEffect, useEffect, useRef, FC, RefObject } from 'react'

type DefaultIntersectorProps = {
  forwardedRef: RefObject<any>
}

const DefaultIntersector = ({ forwardedRef, ...otherProps }: DefaultIntersectorProps) => (
  <div ref={forwardedRef} {...otherProps}></div>
)

type Props = {
  items: any[]
  batch: number
  rootMargin?: string
  Intersector?: any
  children: any
}

const LazyRender: FC<Props> = ({ items, batch, rootMargin, Intersector = DefaultIntersector, children }) => {
  const [renderLimit, setRenderLimit] = useState(Math.min(batch, items.length))
  const [renderedItems, setRenderedItems] = useState([])

  const ref = useRef()

  useLayoutEffect(() => {
    setRenderedItems(items.slice(0, renderLimit).map(children))
  }, [items, renderLimit, children])

  useEffect(() => {
    setRenderLimit(Math.min(renderLimit, items.length))
  }, [renderLimit, items.length])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([{ isIntersecting }]) => {
        if (isIntersecting && renderLimit < items.length) setRenderLimit(Math.min(renderLimit + batch, items.length))
      },
      { rootMargin }
    )

    if (ref.current) observer[renderLimit === items.length ? 'unobserve' : 'observe'](ref.current)

    return () => observer.disconnect()
  }, [items, batch, renderLimit, rootMargin])

  return (
    <>
      {renderedItems}
      <Intersector style={{ display: renderLimit === items.length ? 'none' : 'initial' }} forwardedRef={ref} />
    </>
  )
}

export default LazyRender
