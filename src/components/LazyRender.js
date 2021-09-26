import { useState, useLayoutEffect, useEffect } from 'react'
import { number, string, array, func, shape, instanceOf, oneOfType } from 'prop-types'

const LazyRender = ({ items, batch, targetRef, rootMargin = '100%', children }) => {
  const [renderLimit, setRenderLimit] = useState(batch)
  const [renderedItems, setRenderedItems] = useState([])

  useLayoutEffect(() => {
    setRenderedItems(items.slice(0, renderLimit).map(children))
  }, [items, renderLimit])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([{ isIntersecting }]) => {
        if (isIntersecting && renderLimit < items.length) setRenderLimit(Math.min(renderLimit + batch, items.length))
      },
      { rootMargin }
    )

    observer.observe(targetRef.current)

    return () => observer.disconnect()
  }, [items, batch, renderLimit])

  return renderedItems
}

LazyRender.propTypes = {
  items: array.isRequired,
  batch: number.isRequired,
  targetRef: oneOfType([func, shape({ current: instanceOf(Element) })]),
  rootMargin: string,
  children: func.isRequired
}

export default LazyRender
