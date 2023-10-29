import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "services/apiBookings.js";

function useGetBookings() {
  const [searchParams] = useSearchParams();

  const filterParam = searchParams.get("status");
  const filter =
    !filterParam || filterParam === "all"
      ? null
      : { field: "status", value: filterParam };

  const { data, error, isLoading } = useQuery({
    queryKey: ["bookings", filter],
    queryFn: () => getBookings({ filter }),
  });

  return { data, error, isLoading };
}

export default useGetBookings;
