import { FC } from 'react'

type Props = {
  condition?: any
  children: any
}

const If: FC<Props> = ({ condition, children }) => (condition ? children : null)

export default If
