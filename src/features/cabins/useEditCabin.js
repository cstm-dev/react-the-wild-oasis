import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "services/apiCabins.js";

function useEditCabin() {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ cabin, id }) => {
      createEditCabin(cabin, id);
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

export default useEditCabin;
