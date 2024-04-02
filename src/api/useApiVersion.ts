import { API_URL } from "@/app/global";
import useSWR from "swr";

const fetcher = (url:string) => fetch(url).then(r => r.json())

export function useApiVersion() {
    const{data, error, isLoading} = useSWR(`${API_URL}/dashboard/get-version`, fetcher, {
      revalidateOnFocus: false,
      onSuccess:  (data) => {
        data.sort((a:any, b:any) => Number(b._id)-Number(a._id))
      }
    })
    console.log('dataaa',data);
    
    return {
        versions: data,
        isLoading,
        isError: error
      }
    
}