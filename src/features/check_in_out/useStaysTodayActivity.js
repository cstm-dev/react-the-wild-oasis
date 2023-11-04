import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "services/apiBookings.js";

function useStaysTodayActivity() {
  const { data, isLoading } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["todayActivity"],
  });

  return { data, isLoading };
}

export default useStaysTodayActivity;
