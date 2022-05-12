import { useTransition } from 'react'
import { useNavigate } from 'react-router-dom'

const useDelayedNavigate = () => {
  const [, startTransition] = useTransition()
  const navigate = useNavigate()

  return (to: string) => startTransition(() => navigate(to))
}

export default useDelayedNavigate
