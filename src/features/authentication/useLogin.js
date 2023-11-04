import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login } from "services/apiAuth.js";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (data) => {
      // Manually set the logged in user to prevent another getCurrentUser() after initial login
      queryClient.setQueryData(["auth"], data.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.error("ERROR", err);

      toast.error("Provided login credentials are incorrect.");
    },
  });

  return { mutate, isLoading };
}

export default useLogin;
