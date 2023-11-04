import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "services/apiBookings.js";

function useRecentStays() {
  const [searchParams] = useSearchParams();
  const param = searchParams.get("last");
  const numDays = !param ? 7 : Number(param);
  const date = subDays(new Date(), numDays).toISOString();

  const { data, isLoading } = useQuery({
    queryFn: () => getStaysAfterDate(date),
    queryKey: ["stays", `last-${numDays}`],
  });

  const confirmedStays = data?.filter(
    (e) => e.status === "checked-in" || e.status === "checked-out"
  );

  return { data, isLoading, confirmedStays };
}

export default useRecentStays;
