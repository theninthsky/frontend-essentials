type State = {
  [x: string]: any
}

type PersistStateOptions = {
  localStorage?: boolean
}

const state: State = {}

export const persistState = (key: string, value: any, { localStorage }: PersistStateOptions = {}) => {
  state[key] = value

  if (localStorage) window.localStorage.setItem(`${key}State`, JSON.stringify(value))
}

export const getPersistedState = (key: string) => JSON.parse(localStorage[key] || null) || state[key]
