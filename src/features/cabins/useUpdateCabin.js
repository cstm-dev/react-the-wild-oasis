import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createUpdateCabin } from "services/apiCabins.js";

function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ cabin, id }) => {
      createUpdateCabin(cabin, id);
    },
    onSuccess: () => {
      toast.success("Cabin has been edited.");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isLoading, mutate };
}

export default useUpdateCabin;
