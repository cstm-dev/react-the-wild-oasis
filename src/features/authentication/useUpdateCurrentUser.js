import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "services/apiAuth.js";

function useUpdateCurrentUser() {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success("User has been updated.");

      queryClient.invalidateQueries({
        queryKey: ["auth"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { mutate, isLoading };
}

export default useUpdateCurrentUser;
