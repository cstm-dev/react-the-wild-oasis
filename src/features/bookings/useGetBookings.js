import { useQuery } from "@tanstack/react-query";
import { getBookings } from "services/apiBookings.js";

function useGetBookings() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return { data, error, isLoading };
}

export default useGetBookings;
