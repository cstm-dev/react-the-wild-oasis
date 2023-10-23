import { useQuery } from "@tanstack/react-query";
import { getSettings } from "services/apiSettings.js";

function useGetSettings() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { data, error, isLoading };
}

export default useGetSettings;
