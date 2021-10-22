import { useState, useLayoutEffect, useEffect, useRef } from 'react'
import { number, string, array, func, oneOfType, shape, instanceOf } from 'prop-types'

const DefaultIntersector = ({ forwardedRef, ...otherProps }) => <div ref={forwardedRef} {...otherProps}></div>

DefaultIntersector.propTypes = {
  forwardedRef: oneOfType([func, shape({ current: instanceOf(Element) })])
}

const LazyRender = ({ items, batch, rootMargin, Intersector = DefaultIntersector, children }) => {
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

    observer[renderLimit === items.length ? 'unobserve' : 'observe'](ref.current)

    return () => observer.disconnect()
  }, [items, batch, renderLimit, rootMargin])

  return (
    <>
      {renderedItems}
      <Intersector style={{ display: renderLimit === items.length ? 'none' : 'initial' }} forwardedRef={ref} />
    </>
  )
}

LazyRender.propTypes = {
  items: array.isRequired,
  batch: number.isRequired,
  rootMargin: string,
  Intersector: func,
  children: func.isRequired
}

export default LazyRender
