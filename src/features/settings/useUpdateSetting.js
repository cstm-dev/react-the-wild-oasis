import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateSetting } from "services/apiSettings.js";

function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: (setting) => {
      updateSetting(setting);
    },
    onSuccess: () => {
      toast.success("Setting has been edited.");

      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isLoading, mutate };
}

export default useUpdateSetting;
