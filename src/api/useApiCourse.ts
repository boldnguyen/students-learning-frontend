import { API_URL } from "@/app/global";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

const fetcher = (url:string) => fetch(url).then(r => r.json())

export function useApiCourse() {
    const{data, error, isLoading} = useSWR(`${API_URL}/dashboard/course`, fetcher, {
      revalidateOnFocus: false,
      onSuccess:  (data) => {
        data.sort((a:any, b:any) => a._id.localeCompare(b._id))
      }
    })

    return {
        courses: data,
        isLoading,
        isError: error
      }
    
}