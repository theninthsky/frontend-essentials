import { any } from 'prop-types'

const If = ({ condition, children }) => (condition ? children : null)

If.propTypes = {
  condition: any,
  children: any.isRequired
}

export default If
