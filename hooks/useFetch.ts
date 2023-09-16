import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { env } from "~/env.mjs"

interface Props {
  path: string
  params?: string
  refetchOnMount?: boolean
  staleTime?: number
  searchText?: string
}

function useFetch<T>({ path, params, refetchOnMount, staleTime }: Props) {
  const result = useQuery<T[]>({
    queryKey: [path, params],
    queryFn: async () => {
      const res = await axios.get<{ data: T[] }>(
        `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/${path}${params}`,
        { withCredentials: true }
      )
      return res?.data?.data
    },
    refetchOnMount,
    staleTime,
  })
  return { ...result }
}

export default useFetch
