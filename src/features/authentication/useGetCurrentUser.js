import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "services/apiAuth.js";

function useGetCurrentUser() {
  const { data, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: getCurrentUser,
  });

  return { data, isLoading, isAuthenticated: data?.role === "authenticated" };
}

export default useGetCurrentUser;
