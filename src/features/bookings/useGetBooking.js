import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "services/apiBookings.js";

function useGetBooking() {
  const { bookingId } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { data, error, isLoading };
}

export default useGetBooking;
