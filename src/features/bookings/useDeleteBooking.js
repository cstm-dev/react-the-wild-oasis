import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBooking } from "services/apiBookings.js";

function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => {
      toast.success("Booking successfully deleted.");

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, mutate };
}

export default useDeleteBooking;
