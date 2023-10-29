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

  const sortParam = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortParam.split("-");
  const sortBy = { field, direction };

  const { data, error, isLoading } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { data, error, isLoading };
}

export default useGetBookings;
