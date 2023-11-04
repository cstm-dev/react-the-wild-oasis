import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup } from "services/apiAuth.js";

function useSignup() {
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signup({ fullName, email, password }),
    onSuccess: () => {
      toast.success(
        "User successfully created. Please confirm your provided email address."
      );
    },
  });

  return { mutate, isLoading };
}

export default useSignup;
