import type { AxiosRequestConfig, AxiosError } from 'axios'

declare function useAxios(
  config: AxiosRequestConfig & { suspense?: boolean },
  callback?: (response: { status: number; data: any }) => void
): {
  loading: boolean
  status?: number
  error?: AxiosError
  data?: any
  activate: (config?: AxiosRequestConfig, callback?: (response: { status: number; data: any }) => void) => Promise<void>
}

export default useAxios
