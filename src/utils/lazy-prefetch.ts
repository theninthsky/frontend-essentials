import { lazy, LazyExoticComponent, ComponentType } from 'react'

type DynamicImport = () => Promise<{ default: ComponentType<any> }>
type LazyComponent = LazyExoticComponent<ComponentType<any>>

const lazyPrefetch = (chunk: DynamicImport): LazyComponent => {
  window.addEventListener('load', () => setTimeout(chunk, 200), { once: true })

  return lazy(chunk)
}

export default lazyPrefetch
