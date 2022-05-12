import { FC } from 'react'

export type IfProps = {
  condition?: any
  children: any
}

const If: FC<IfProps> = ({ condition, children }) => (condition ? children : null)

export default If
