import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "services/apiBookings.js";

function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const param = searchParams.get("last");
  const numDays = !param ? 7 : Number(param);
  const date = subDays(new Date(), numDays).toISOString();

  const { data, isLoading } = useQuery({
    queryFn: () => getBookingsAfterDate(date),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { data, isLoading };
}

export default useRecentBookings;
