import { API_URL } from "@/app/global";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

const fetcher = (url:string) => fetch(url).then(r => r.json())

export function useApiEnroll() {
    const{data, error, isLoading} = useSWR(`${API_URL}/dashboard/get-enroll`, fetcher, {
      revalidateOnFocus: false,
      onSuccess:  (data) => {
        data.sort((a:any, b:any) => Number(b._id)-Number(a._id))
      }
    })

    return {
        enrolls: data,
        isLoading,
        isError: error
      }
    
}