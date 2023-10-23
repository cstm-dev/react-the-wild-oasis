import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createUpdateCabin } from "services/apiCabins.js";

function useCreateCabin() {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: (cabin) => createUpdateCabin(cabin),
    onSuccess: () => {
      toast.success("A new cabin has been added.");

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

export default useCreateCabin;
