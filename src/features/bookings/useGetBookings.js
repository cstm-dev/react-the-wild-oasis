import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "services/apiBookings.js";
import { PAGE_SIZE } from "utils/globalConstants.js";

function useGetBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filter
  const filterParam = searchParams.get("status");
  const filter =
    !filterParam || filterParam === "all"
      ? null
      : { field: "status", value: filterParam };

  // Sort
  const sortParam = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortParam.split("-");
  const sortBy = { field, direction };

  // Pagination
  const page = Number(!searchParams.get("page") ? 1 : searchParams.get("page"));

  const {
    data: { data: bookings, count } = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // Pre-fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { bookings, count, error, isLoading };
}

export default useGetBookings;
