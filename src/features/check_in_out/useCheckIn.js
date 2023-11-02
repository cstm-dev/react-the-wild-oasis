import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "services/apiBookings.js";

function useCheckIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-in",
        hasPaid: true,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in.`);

      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => toast.error("There was an error while checking in."),
  });

  return { mutate, isLoading };
}

export default useCheckIn;
