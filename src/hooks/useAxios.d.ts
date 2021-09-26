import type { AxiosRequestConfig, AxiosError } from 'axios'

declare function useAxios(config: AxiosRequestConfig & { suspense?: boolean }): {
  loading: boolean
  status: number | undefined
  error: AxiosError | undefined
  data: any | undefined
  activate: (config?: AxiosRequestConfig) => Promise<void>
}

export default useAxios
