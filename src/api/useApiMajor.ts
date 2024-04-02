import { API_URL } from "@/app/global";
import useSWR from "swr";

const fetcher = (url:string) => fetch(url).then(r => r.json())
const db = [
  {_id: 'CE', detail: 'Computer Engineering'},
  {_id: 'CS', detail: 'Computer Science'}, 
  {_id: 'DS', detail: 'Data Science'}, 
  {_id: 'NE', detail: 'Network Engineering'}
] 

export function useApiMajor() {
    // const{data, error, isLoading} = useSWR(`${API_URL}/dashboard/get-major`, fetcher, {
    //   revalidateOnFocus: false,
    //   onSuccess:  (data) => {
    //     data.sort((a:any, b:any) => a._id.localeCompare(b._id))
    //   }
    // })

    return {
        majors: db,
        // isLoading,
        // isError: error
      }
    
}