import type { AxiosRequestConfig, AxiosError } from 'axios'

type RequestConfig = AxiosRequestConfig & {
  manual?: boolean
  onSuccess?: (res: { status: number; data?: any }) => void
  onError?: (res: { status?: number; error: AxiosError | Error; data?: any }) => void
}

declare function useAxios(config: RequestConfig): {
  loading: boolean
  status?: number
  error?: AxiosError
  data?: any
  activate: (config?: RequestConfig) => Promise<void>
}

export default useAxios
