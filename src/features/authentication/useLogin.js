import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import login from "services/apiAuth.js";

function useLogin() {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: (err) => {
      console.error("ERROR", err);

      toast.error("Provided login credentials are incorrect.");
    },
  });

  return { mutate, isLoading };
}

export default useLogin;
