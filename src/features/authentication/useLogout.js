import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logout } from "services/apiAuth.js";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      console.error("ERROR", err);

      toast.error("Provided login credentials are incorrect.");
    },
  });

  return { mutate, isLoading };
}

export default useLogout;
