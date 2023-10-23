import { useQuery } from "@tanstack/react-query";
import { getCabins } from "services/apiCabins.js";

function useGetCabins() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { data, error, isLoading };
}

export default useGetCabins;
