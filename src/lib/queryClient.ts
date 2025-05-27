import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 1000 * 60 * 5,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      retry: 0,
    },
  },
});
